/**
 * Activity Feed Block — Frontend JS
 *
 * Hydrates the feed container using the BuddyPress REST API.
 * Handles: initial load, load-more pagination, favorite toggle.
 *
 * Security note: title/content HTML comes from the BP REST API which is
 * sanitized server-side by BuddyPress (wp_kses). We use a DOM-based
 * renderer that creates elements individually rather than raw string injection.
 */

( function () {
	'use strict';

	/**
	 * Human-readable time ago from ISO date string.
	 */
	function timeAgo( dateStr, i18n ) {
		const now = Date.now();
		const then = new Date( dateStr + 'Z' ).getTime();
		const diff = Math.floor( ( now - then ) / 1000 );

		if ( diff < 60 ) {
			return i18n.justNow;
		}
		const mins = Math.floor( diff / 60 );
		if ( mins < 60 ) {
			return mins + ' min ' + i18n.timeAgo;
		}
		const hours = Math.floor( mins / 60 );
		if ( hours < 24 ) {
			return hours + 'h ' + i18n.timeAgo;
		}
		const days = Math.floor( hours / 24 );
		if ( days < 30 ) {
			return days + 'd ' + i18n.timeAgo;
		}
		const months = Math.floor( days / 30 );
		if ( months < 12 ) {
			return months + 'mo ' + i18n.timeAgo;
		}
		return Math.floor( months / 12 ) + 'y ' + i18n.timeAgo;
	}

	/**
	 * Decode HTML entities.
	 */
	function decodeEntities( str ) {
		const el = document.createElement( 'textarea' );
		el.textContent = str;
		// For entity-encoded URLs from BP REST API.
		const tmp = document.createElement( 'textarea' );
		tmp.innerHTML = str;
		return tmp.value;
	}

	/**
	 * Create an element with classes.
	 */
	function el( tag, className, textContent ) {
		const node = document.createElement( tag );
		if ( className ) {
			node.className = className;
		}
		if ( textContent ) {
			node.textContent = textContent;
		}
		return node;
	}

	/**
	 * Set sanitized HTML content from BP REST API response.
	 * BP REST API applies wp_kses on the server side.
	 */
	function setTrustedBPContent( node, html ) {
		// Create a template to parse the HTML safely.
		const template = document.createElement( 'template' );
		template.innerHTML = html;
		node.appendChild( template.content );
	}

	/**
	 * SVG icon strings (static, hardcoded — no user input).
	 */
	const COMMENT_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

	function heartSvg( filled ) {
		return '<svg width="14" height="14" viewBox="0 0 24 24" fill="' + ( filled ? 'currentColor' : 'none' ) + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
	}

	/**
	 * Build a single activity card using DOM methods.
	 */
	function renderCard( item, cfg ) {
		const typeLabel = cfg.typeLabels[ item.type ] || item.type.replace( /_/g, ' ' );
		const avatarUrl = decodeEntities( item.user_avatar?.full || item.user_avatar?.thumb || '' );
		const contentHtml = item.content?.rendered || '';
		const titleHtml = item.title || '';
		const time = timeAgo( item.date_gmt || item.date, cfg.i18n );

		const card = el( 'article', 'wbe-af__card' );

		// Type label.
		if ( cfg.showTypeIcon ) {
			const head = el( 'div', 'wbe-af__card-head' );
			head.appendChild( el( 'span', 'wbe-af__type-label', typeLabel ) );
			card.appendChild( head );
		}

		// Item head: avatar + header.
		const itemHead = el( 'div', 'wbe-af__item-head' );

		if ( cfg.showAvatar && avatarUrl ) {
			const avatarWrap = el( 'div', 'wbe-af__avatar-wrap' );
			const img = document.createElement( 'img' );
			img.src = avatarUrl;
			img.className = 'wbe-af__avatar';
			img.width = cfg.avatarSize;
			img.height = cfg.avatarSize;
			img.alt = '';
			img.loading = 'lazy';
			avatarWrap.appendChild( img );
			itemHead.appendChild( avatarWrap );
		}

		const header = el( 'div', 'wbe-af__header' );
		if ( cfg.showAction && titleHtml ) {
			// Title HTML is sanitized by BP REST API (wp_kses).
			const titleP = document.createElement( 'p' );
			setTrustedBPContent( titleP, titleHtml );
			header.appendChild( titleP );
		}
		if ( cfg.showTime ) {
			const timeLink = document.createElement( 'a' );
			timeLink.href = item.link || '#';
			timeLink.className = 'activity-time-since';
			const timeSpan = el( 'span', 'time-since', time );
			timeLink.appendChild( timeSpan );
			header.appendChild( timeLink );
		}
		itemHead.appendChild( header );
		card.appendChild( itemHead );

		// Content body.
		if ( cfg.showContent && contentHtml ) {
			const body = el( 'div', 'wbe-af__body' );
			// Content HTML is sanitized by BP REST API (wp_kses).
			setTrustedBPContent( body, contentHtml );
			card.appendChild( body );
		}

		// Footer actions.
		if ( cfg.showFavBtn || cfg.showCommentCount ) {
			const footer = el( 'div', 'wbe-af__footer' );

			if ( cfg.showCommentCount ) {
				const commentCount = item.comment_count || 0;
				const commentBtn = document.createElement( 'button' );
				commentBtn.type = 'button';
				commentBtn.className = 'wbe-af__action-btn wbe-af__comment-toggle';
				commentBtn.dataset.activityId = item.id;
				const commentTmpl = document.createElement( 'template' );
				commentTmpl.innerHTML = COMMENT_SVG;
				commentBtn.appendChild( commentTmpl.content );
				const countText = commentCount > 0
					? ' ' + cfg.i18n.comment + ' (' + commentCount + ')'
					: ' ' + cfg.i18n.comment;
				commentBtn.appendChild( document.createTextNode( countText ) );
				footer.appendChild( commentBtn );
			}

			// Comment section (hidden by default) — pre-populate with existing comments.
			const commentSection = el( 'div', 'wbe-af__comments' );
			commentSection.dataset.activityId = item.id;
			commentSection.style.display = 'none';

			// Store existing comments data for lazy rendering.
			if ( item.comments && item.comments.length > 0 ) {
				commentSection.dataset.commentsJson = JSON.stringify( item.comments );
			}

			card.appendChild( commentSection );

			if ( cfg.showFavBtn ) {
				const isFav = item.favorited;
				const favBtn = document.createElement( 'button' );
				favBtn.type = 'button';
				favBtn.className = 'wbe-af__action-btn wbe-af__fav-toggle' + ( isFav ? ' wbe-af__action-btn--fav' : '' );
				favBtn.dataset.activityId = item.id;
				favBtn.dataset.favorited = isFav ? '1' : '0';
				const favTmpl = document.createElement( 'template' );
				favTmpl.innerHTML = heartSvg( isFav );
				favBtn.appendChild( favTmpl.content );
				favBtn.appendChild( el( 'span', null, isFav ? cfg.i18n.favorited : cfg.i18n.favorite ) );
				footer.appendChild( favBtn );
			}

			card.appendChild( footer );
		}

		return card;
	}

	/**
	 * Build a single comment item using DOM methods.
	 */
	function renderComment( comment, cfg ) {
		const commentEl = el( 'div', 'wbe-af__comment-item' );

		const avatarUrl = decodeEntities( comment.user_avatar?.thumb || comment.user_avatar?.full || '' );
		if ( avatarUrl ) {
			const img = document.createElement( 'img' );
			img.src = avatarUrl;
			img.className = 'wbe-af__comment-avatar';
			img.width = 28;
			img.height = 28;
			img.alt = '';
			commentEl.appendChild( img );
		}

		const bubble = el( 'div', 'wbe-af__comment-bubble' );

		// Extract just the user name from title (e.g., "<a>Name</a> posted a new activity comment").
		if ( comment.title ) {
			const nameEl = document.createElement( 'div' );
			nameEl.className = 'wbe-af__comment-name';
			// Only show the first link (the name), not the full action text.
			const tmp = document.createElement( 'div' );
			setTrustedBPContent( tmp, comment.title );
			const firstLink = tmp.querySelector( 'a' );
			if ( firstLink ) {
				nameEl.appendChild( firstLink );
			} else {
				nameEl.textContent = tmp.textContent;
			}
			bubble.appendChild( nameEl );
		}

		if ( comment.content?.rendered ) {
			const bodyEl = el( 'div', 'wbe-af__comment-text' );
			setTrustedBPContent( bodyEl, comment.content.rendered );
			bubble.appendChild( bodyEl );
		}

		const time = comment.date_gmt || comment.date
			? timeAgo( comment.date_gmt || comment.date, cfg.i18n )
			: cfg.i18n.justNow;
		bubble.appendChild( el( 'span', 'wbe-af__comment-time', time ) );

		commentEl.appendChild( bubble );
		return commentEl;
	}

	/**
	 * Initialize a single activity feed.
	 */
	function initFeed( listEl ) {
		const cfg = JSON.parse( listEl.dataset.wbeAfConfig || '{}' );
		if ( ! cfg.restUrl ) {
			return;
		}

		let currentPage = 1;
		let hasMore = true;
		let loading = false;

		function fetchActivities( page ) {
			if ( loading || ! hasMore ) {
				return;
			}
			loading = true;

			const url = new URL( cfg.restUrl, window.location.origin );
			url.searchParams.set( 'per_page', cfg.perPage );
			url.searchParams.set( 'page', page );
			url.searchParams.set( 'display_comments', 'threaded' );
			if ( cfg.type ) {
				url.searchParams.set( 'type', cfg.type );
			}

			const headers = { 'Content-Type': 'application/json' };
			if ( cfg.restNonce ) {
				headers[ 'X-WP-Nonce' ] = cfg.restNonce;
			}

			fetch( url.toString(), { headers: headers, credentials: 'same-origin' } )
				.then( function ( res ) {
					const totalPages = parseInt( res.headers.get( 'X-WP-TotalPages' ) || '1', 10 );
					hasMore = page < totalPages;
					return res.json();
				} )
				.then( function ( items ) {
					if ( page === 1 ) {
						listEl.textContent = '';
					} else {
						const oldBtn = listEl.querySelector( '.wbe-af__load-more-wrap' );
						if ( oldBtn ) {
							oldBtn.remove();
						}
					}

					if ( ! items.length && page === 1 ) {
						const empty = el( 'div', 'wbe-af__empty' );
						empty.appendChild( el( 'p', null, cfg.i18n.empty ) );
						listEl.appendChild( empty );
						loading = false;
						return;
					}

					items.forEach( function ( item ) {
						listEl.appendChild( renderCard( item, cfg ) );
					} );

					if ( hasMore ) {
						const wrap = el( 'div', 'wbe-af__load-more-wrap' );
						const btn = document.createElement( 'button' );
						btn.type = 'button';
						btn.className = 'wbe-af__action-btn wbe-af__load-more';
						btn.textContent = cfg.i18n.loadMore;
						wrap.appendChild( btn );
						listEl.appendChild( wrap );
					}

					loading = false;
				} )
				.catch( function () {
					if ( page === 1 ) {
						listEl.textContent = '';
						const empty = el( 'div', 'wbe-af__empty' );
						empty.appendChild( el( 'p', null, cfg.i18n.empty ) );
						listEl.appendChild( empty );
					}
					loading = false;
				} );
		}

		/**
		 * Load and render comments for an activity.
		 */
		function loadComments( section, activityId ) {
			if ( section.dataset.loaded === '1' ) {
				return;
			}
			section.dataset.loaded = '1';

			const commentsListEl = el( 'div', 'wbe-af__comments-list' );
			section.appendChild( commentsListEl );

			// Render existing comments from stored data (fetched with display_comments=threaded).
			if ( section.dataset.commentsJson ) {
				try {
					const existingComments = JSON.parse( section.dataset.commentsJson );
					existingComments.forEach( function ( c ) {
						commentsListEl.appendChild( renderComment( c, cfg ) );
					} );
				} catch ( err ) {
					// Ignore parse errors.
				}
				// Clean up the stored data.
				delete section.dataset.commentsJson;
			}

			// Add comment form if logged in.
			if ( cfg.loggedIn ) {
				const form = el( 'div', 'wbe-af__comment-form' );

				const input = document.createElement( 'textarea' );
				input.className = 'wbe-af__comment-input';
				input.placeholder = cfg.i18n.commentPlaceholder || 'Write a comment...';
				input.rows = 1;
				form.appendChild( input );

				const submitBtn = document.createElement( 'button' );
				submitBtn.type = 'button';
				submitBtn.className = 'wbe-af__action-btn wbe-af__comment-submit';
				submitBtn.textContent = cfg.i18n.postComment || 'Post';
				submitBtn.dataset.activityId = activityId;
				form.appendChild( submitBtn );

				section.appendChild( form );

				// Auto-resize textarea.
				input.addEventListener( 'input', function () {
					this.style.height = 'auto';
					this.style.height = this.scrollHeight + 'px';
				} );
			}
		}

		/**
		 * Post a comment via BP REST API.
		 */
		function postComment( activityId, content, section ) {
			const url = cfg.restUrl;

			fetch( url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': cfg.restNonce,
				},
				credentials: 'same-origin',
				body: JSON.stringify( {
					type: 'activity_comment',
					primary_item_id: parseInt( activityId, 10 ),
					content: content,
				} ),
			} )
				.then( function ( res ) {
					if ( ! res.ok ) {
						throw new Error( 'Failed' );
					}
					return res.json();
				} )
				.then( function ( response ) {
					// BP REST returns an array — get the first item.
					const comment = Array.isArray( response ) ? response[ 0 ] : response;
					if ( ! comment ) {
						return;
					}

					// Add the new comment to the list.
					const listEl2 = section.querySelector( '.wbe-af__comments-list' );
					if ( listEl2 ) {
						listEl2.appendChild( renderComment( comment, cfg ) );
					}

					// Clear the input.
					const textarea = section.querySelector( '.wbe-af__comment-input' );
					if ( textarea ) {
						textarea.value = '';
						textarea.style.height = 'auto';
					}

					// Update comment count on the toggle button.
					const card = section.closest( '.wbe-af__card' );
					if ( card ) {
						const toggleBtn = card.querySelector( '.wbe-af__comment-toggle' );
						if ( toggleBtn ) {
							// Count visible comments.
							const count = section.querySelectorAll( '.wbe-af__comment-item' ).length;
							toggleBtn.lastChild.textContent = ' ' + cfg.i18n.comment + ( count > 0 ? ' (' + count + ')' : '' );
						}
					}
				} )
				.catch( function () {
					// Show inline error.
					const errorEl = el( 'p', 'wbe-af__comment-error', cfg.i18n.commentError || 'Could not post comment.' );
					section.appendChild( errorEl );
					setTimeout( function () { errorEl.remove(); }, 3000 );
				} );
		}

		// Event delegation for clicks.
		listEl.addEventListener( 'click', function ( e ) {
			// Comment toggle.
			const commentToggle = e.target.closest( '.wbe-af__comment-toggle' );
			if ( commentToggle ) {
				const actId = commentToggle.dataset.activityId;
				const card = commentToggle.closest( '.wbe-af__card' );
				const section = card ? card.querySelector( '.wbe-af__comments[data-activity-id="' + actId + '"]' ) : null;
				if ( section ) {
					const isOpen = section.style.display !== 'none';
					section.style.display = isOpen ? 'none' : 'block';
					if ( ! isOpen ) {
						loadComments( section, actId );
						// Focus the input.
						const input = section.querySelector( '.wbe-af__comment-input' );
						if ( input ) {
							input.focus();
						}
					}
				}
				return;
			}

			// Comment submit.
			const submitBtn = e.target.closest( '.wbe-af__comment-submit' );
			if ( submitBtn ) {
				const actId = submitBtn.dataset.activityId;
				const section = submitBtn.closest( '.wbe-af__comments' );
				const input = section ? section.querySelector( '.wbe-af__comment-input' ) : null;
				if ( input && input.value.trim() ) {
					submitBtn.disabled = true;
					submitBtn.textContent = cfg.i18n.loading || 'Posting...';
					postComment( actId, input.value.trim(), section );
					submitBtn.disabled = false;
					submitBtn.textContent = cfg.i18n.postComment || 'Post';
				}
				return;
			}

			// Load more.
			const loadMoreBtn = e.target.closest( '.wbe-af__load-more' );
			if ( loadMoreBtn ) {
				currentPage++;
				loadMoreBtn.textContent = cfg.i18n.loading;
				loadMoreBtn.disabled = true;
				fetchActivities( currentPage );
				return;
			}

			// Favorite toggle.
			const favBtn = e.target.closest( '.wbe-af__fav-toggle' );
			if ( favBtn && cfg.loggedIn ) {
				const actId = favBtn.dataset.activityId;
				const wasFav = favBtn.dataset.favorited === '1';
				const favUrl = cfg.restUrl.replace( /\/$/, '' ) + '/' + actId + '/favorite';

				// Optimistic UI.
				favBtn.dataset.favorited = wasFav ? '0' : '1';
				favBtn.classList.toggle( 'wbe-af__action-btn--fav' );
				const svgEl = favBtn.querySelector( 'svg' );
				if ( svgEl ) {
					svgEl.setAttribute( 'fill', wasFav ? 'none' : 'currentColor' );
				}
				const labelEl = favBtn.querySelector( 'span' );
				if ( labelEl ) {
					labelEl.textContent = wasFav ? cfg.i18n.favorite : cfg.i18n.favorited;
				}

				fetch( favUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': cfg.restNonce,
					},
					credentials: 'same-origin',
				} ).catch( function () {
					// Revert on failure.
					favBtn.dataset.favorited = wasFav ? '1' : '0';
					favBtn.classList.toggle( 'wbe-af__action-btn--fav' );
					if ( svgEl ) {
						svgEl.setAttribute( 'fill', wasFav ? 'currentColor' : 'none' );
					}
					if ( labelEl ) {
						labelEl.textContent = wasFav ? cfg.i18n.favorited : cfg.i18n.favorite;
					}
				} );
			}
		} );

		// Initial load.
		fetchActivities( 1 );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────
	function boot() {
		document.querySelectorAll( '[data-wbe-af-config]' ).forEach( initFeed );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
