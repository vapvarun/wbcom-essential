/**
 * Product Catalog — Frontend AJAX filtering.
 *
 * Renders filter controls and product grid.
 * Fetches products from /wbcom/v1/products REST endpoint.
 *
 * Supports multiple instances per page, each scoped to its own container.
 *
 * Note: All user-generated content is escaped via escapeHtml/escapeAttr
 * before being inserted. Product data comes from authenticated REST API
 * (same origin, admin-controlled content). innerHTML is used for
 * performance when rendering large product grids from trusted server data.
 */
( function () {
	'use strict';

	function initCatalog( container ) {
		var state, debounceTimer;

		var defaultCat =
			parseInt( container.dataset.defaultCategory, 10 ) || 0;

		// Read block settings from data attributes.
		state = {
			columns: parseInt( container.dataset.columns, 10 ) || 3,
			perPage: parseInt( container.dataset.perPage, 10 ) || 12,
			showSearch: container.dataset.showSearch === 'true',
			showCategory: container.dataset.showCategory === 'true',
			showPrice: container.dataset.showPrice === 'true',
			showSort: container.dataset.showSort === 'true',
			defaultSort: container.dataset.defaultSort || 'title',
			defaultCategory: defaultCat,
			// Current filter values.
			category: defaultCat,
			search: '',
			priceRange: 'all',
			orderby: container.dataset.defaultSort || 'title',
			order: 'ASC',
			page: 1,
			totalPages: 1,
			total: 0,
			categories: [],
			products: [],
			loading: true,
		};

		// Parse default sort into orderby + order.
		parseSortValue( state.defaultSort );

		// Build the UI shell.
		render();

		// Fetch categories and products in parallel.
		if ( state.showCategory ) {
			fetchCategories();
		}
		fetchProducts();

		function parseSortValue( val ) {
			switch ( val ) {
				case 'date':
					state.orderby = 'date';
					state.order = 'DESC';
					break;
				case 'price_asc':
					state.orderby = 'price';
					state.order = 'ASC';
					break;
				case 'price_desc':
					state.orderby = 'price';
					state.order = 'DESC';
					break;
				case 'popular':
					state.orderby = 'popular';
					state.order = 'DESC';
					break;
				default:
					state.orderby = 'title';
					state.order = 'ASC';
			}
		}

		/**
		 * Build the full catalog UI using DOM methods.
		 * Product data is from the same-origin REST API (admin-controlled content).
		 * All text values are escaped before insertion.
		 */
		function render() {
			// Clear container safely.
			while ( container.firstChild ) {
				container.removeChild( container.firstChild );
			}

			// Toolbar.
			var toolbar = el( 'div', 'wbcom-catalog__toolbar' );

			if ( state.showSearch ) {
				var searchWrap = el( 'div', 'wbcom-catalog__search' );
				var searchInput = document.createElement( 'input' );
				searchInput.type = 'text';
				searchInput.className = 'wbcom-catalog__search-input';
				searchInput.placeholder = 'Search products...';
				searchInput.value = state.search;
				searchWrap.appendChild( searchInput );
				toolbar.appendChild( searchWrap );
			}

			var filters = el( 'div', 'wbcom-catalog__filters' );

			if ( state.showCategory ) {
				var catSelect = document.createElement( 'select' );
				catSelect.className =
					'wbcom-catalog__select wbcom-catalog__category-select';
				addOption(
					catSelect,
					'0',
					'All Categories',
					state.category === 0
				);
				state.categories.forEach( function ( cat ) {
					addOption(
						catSelect,
						String( cat.id ),
						cat.name + ' (' + cat.count + ')',
						state.category === cat.id
					);
				} );
				filters.appendChild( catSelect );
			}

			if ( state.showPrice ) {
				var priceSelect = document.createElement( 'select' );
				priceSelect.className =
					'wbcom-catalog__select wbcom-catalog__price-select';
				var priceOpts = [
					[ 'all', 'Any Price' ],
					[ 'free', 'Free' ],
					[ 'under25', 'Under $25' ],
					[ '25to99', '$25 \u2013 $99' ],
					[ '100plus', '$100+' ],
				];
				priceOpts.forEach( function ( opt ) {
					addOption(
						priceSelect,
						opt[ 0 ],
						opt[ 1 ],
						state.priceRange === opt[ 0 ]
					);
				} );
				filters.appendChild( priceSelect );
			}

			if ( state.showSort ) {
				var sortSelect = document.createElement( 'select' );
				sortSelect.className =
					'wbcom-catalog__select wbcom-catalog__sort-select';
				var currentSort = getCurrentSortValue();
				var sortOpts = [
					[ 'title', 'Title (A-Z)' ],
					[ 'date', 'Newest First' ],
					[ 'price_asc', 'Price: Low \u2192 High' ],
					[ 'price_desc', 'Price: High \u2192 Low' ],
					[ 'popular', 'Most Popular' ],
				];
				sortOpts.forEach( function ( opt ) {
					addOption(
						sortSelect,
						opt[ 0 ],
						opt[ 1 ],
						currentSort === opt[ 0 ]
					);
				} );
				filters.appendChild( sortSelect );
			}

			toolbar.appendChild( filters );
			container.appendChild( toolbar );

			// Results count.
			if ( ! state.loading ) {
				var countDiv = el( 'div', 'wbcom-catalog__results-count' );
				countDiv.textContent =
					'Showing ' +
					state.products.length +
					' of ' +
					state.total +
					' products';
				container.appendChild( countDiv );
			}

			// Product grid.
			var grid = el(
				'div',
				'wbcom-catalog__grid wbcom-catalog__grid--' + state.columns
			);

			if ( state.loading ) {
				for ( var i = 0; i < state.perPage; i++ ) {
					var skel = el(
						'div',
						'wbcom-catalog__card wbcom-catalog__card--skeleton'
					);
					skel.appendChild(
						el( 'div', 'wbcom-catalog__card-image' )
					);
					skel.appendChild(
						el( 'div', 'wbcom-catalog__card-title' )
					);
					skel.appendChild(
						el( 'div', 'wbcom-catalog__card-excerpt' )
					);
					skel.appendChild(
						el( 'div', 'wbcom-catalog__card-price' )
					);
					grid.appendChild( skel );
				}
			} else if ( state.products.length === 0 ) {
				var empty = el( 'div', 'wbcom-catalog__empty' );
				empty.textContent =
					'No products found matching your filters.';
				grid.appendChild( empty );
			} else {
				state.products.forEach( function ( product ) {
					grid.appendChild( buildCard( product ) );
				} );
			}

			container.appendChild( grid );

			// Load more button.
			if ( ! state.loading && state.page < state.totalPages ) {
				var lmWrap = el( 'div', 'wbcom-catalog__loadmore-wrap' );
				var lmBtn = document.createElement( 'button' );
				lmBtn.type = 'button';
				lmBtn.className = 'wbcom-catalog__loadmore-btn';
				lmBtn.textContent = 'Load More Products';
				lmWrap.appendChild( lmBtn );
				container.appendChild( lmWrap );
			}

			// Bind events.
			bindEvents();
		}

		/**
		 * Build a single product card using DOM methods.
		 * Price HTML comes from the server (edd_currency_filter output)
		 * and is admin-controlled content, safe to render.
		 */
		function buildCard( product ) {
			var card = el( 'div', 'wbcom-catalog__card' );

			// Image link.
			var imgLink = document.createElement( 'a' );
			imgLink.href = product.url;
			imgLink.className = 'wbcom-catalog__card-image';
			if ( product.image ) {
				var img = document.createElement( 'img' );
				img.src = product.image;
				img.alt = product.title;
				img.loading = 'lazy';
				imgLink.appendChild( img );
			} else {
				imgLink.appendChild(
					el( 'div', 'wbcom-catalog__card-noimage' )
				);
			}
			card.appendChild( imgLink );

			// Body.
			var body = el( 'div', 'wbcom-catalog__card-body' );

			var titleH3 = document.createElement( 'h3' );
			titleH3.className = 'wbcom-catalog__card-title';
			var titleLink = document.createElement( 'a' );
			titleLink.href = product.url;
			titleLink.textContent = product.title;
			titleH3.appendChild( titleLink );
			body.appendChild( titleH3 );

			var excerpt = document.createElement( 'p' );
			excerpt.className = 'wbcom-catalog__card-excerpt';
			excerpt.textContent = product.excerpt;
			body.appendChild( excerpt );

			// Price.
			var priceDiv = el(
				'div',
				product.is_free
					? 'wbcom-catalog__card-price wbcom-catalog__card-price--free'
					: 'wbcom-catalog__card-price'
			);
			priceDiv.textContent = product.price;
			body.appendChild( priceDiv );

			// CTA button.
			var btn = document.createElement( 'a' );
			btn.href = product.url;
			btn.className = product.is_free
				? 'wbcom-catalog__card-btn wbcom-catalog__card-btn--free'
				: 'wbcom-catalog__card-btn';
			btn.textContent = product.is_free
				? 'Download Free'
				: 'View Product';
			body.appendChild( btn );

			card.appendChild( body );
			return card;
		}

		function bindEvents() {
			var searchInput = container.querySelector(
				'.wbcom-catalog__search-input'
			);
			if ( searchInput ) {
				searchInput.addEventListener( 'input', function () {
					state.search = this.value;
					state.page = 1;
					state.products = [];
					debounceRefresh();
				} );
			}

			var catSelect = container.querySelector(
				'.wbcom-catalog__category-select'
			);
			if ( catSelect ) {
				catSelect.addEventListener( 'change', function () {
					state.category = parseInt( this.value, 10 );
					state.page = 1;
					state.products = [];
					refresh();
				} );
			}

			var priceSelect = container.querySelector(
				'.wbcom-catalog__price-select'
			);
			if ( priceSelect ) {
				priceSelect.addEventListener( 'change', function () {
					state.priceRange = this.value;
					state.page = 1;
					state.products = [];
					refresh();
				} );
			}

			var sortSelect = container.querySelector(
				'.wbcom-catalog__sort-select'
			);
			if ( sortSelect ) {
				sortSelect.addEventListener( 'change', function () {
					parseSortValue( this.value );
					state.page = 1;
					state.products = [];
					refresh();
				} );
			}

			var loadMoreBtn = container.querySelector(
				'.wbcom-catalog__loadmore-btn'
			);
			if ( loadMoreBtn ) {
				loadMoreBtn.addEventListener( 'click', function () {
					state.page++;
					this.textContent = 'Loading...';
					this.disabled = true;
					fetchProducts( true );
				} );
			}
		}

		function debounceRefresh() {
			clearTimeout( debounceTimer );
			debounceTimer = setTimeout( refresh, 400 );
		}

		function refresh() {
			state.loading = true;
			render();
			fetchProducts();
		}

		function fetchCategories() {
			var url = getRestUrl( '/wbcom/v1/product-categories' );
			fetch( url )
				.then( function ( res ) {
					return res.json();
				} )
				.then( function ( data ) {
					state.categories = Array.isArray( data ) ? data : [];
					if ( ! state.loading ) {
						render();
					}
				} )
				.catch( function () {
					state.categories = [];
				} );
		}

		function fetchProducts( append ) {
			var url = getRestUrl( '/wbcom/v1/products' );
			var params = [
				'per_page=' + state.perPage,
				'page=' + state.page,
				'orderby=' + state.orderby,
				'order=' + state.order,
			];
			if ( state.category ) {
				params.push( 'category=' + state.category );
			}
			if ( state.search ) {
				params.push(
					'search=' + encodeURIComponent( state.search )
				);
			}
			if ( state.priceRange !== 'all' ) {
				params.push( 'price_range=' + state.priceRange );
			}
			url += '?' + params.join( '&' );

			fetch( url )
				.then( function ( res ) {
					return res.json();
				} )
				.then( function ( data ) {
					var items = ( data && data.products ) || [];
					if ( append ) {
						state.products = state.products.concat( items );
					} else {
						state.products = items;
					}
					state.total = ( data && data.total ) || 0;
					state.totalPages = ( data && data.total_pages ) || 1;
					state.loading = false;
					render();
				} )
				.catch( function () {
					state.loading = false;
					state.products = [];
					render();
				} );
		}

		function getCurrentSortValue() {
			if ( state.orderby === 'date' ) {
				return 'date';
			}
			if ( state.orderby === 'price' && state.order === 'ASC' ) {
				return 'price_asc';
			}
			if ( state.orderby === 'price' && state.order === 'DESC' ) {
				return 'price_desc';
			}
			if ( state.orderby === 'popular' ) {
				return 'popular';
			}
			return 'title';
		}
	}

	// Shared helpers.
	function getRestUrl( path ) {
		if (
			typeof window.wpApiSettings !== 'undefined' &&
			window.wpApiSettings.root
		) {
			return window.wpApiSettings.root.replace( /\/$/, '' ) + path;
		}
		var link = document.querySelector(
			'link[rel="https://api.w.org/"]'
		);
		if ( link ) {
			return link.href.replace( /\/$/, '' ) + path;
		}
		return '/wp-json' + path;
	}

	function el( tag, className ) {
		var node = document.createElement( tag );
		if ( className ) {
			node.className = className;
		}
		return node;
	}

	function addOption( select, value, text, selected ) {
		var opt = document.createElement( 'option' );
		opt.value = value;
		opt.textContent = text;
		if ( selected ) {
			opt.selected = true;
		}
		select.appendChild( opt );
	}

	function init() {
		var catalogs = document.querySelectorAll(
			'.wp-block-wbcom-essential-product-catalog'
		);
		catalogs.forEach( function ( node ) {
			initCatalog( node );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
