/* Blog index settings: section configurator (Wbcom Essential > Settings). */
jQuery(function($) {
	var layoutDefaults = ( window.wbcomBlogIndexSettings || {} ).layoutDefaults || {};
	var $layout     = $('#wbcom_essential_blog_index_layout');
	var $options    = $('#wbcom-layout-options');
	var $sections   = $('#wbcom-sections-config');
	var $list       = $('#wbcom-sections-list');
	var sectionCount = $list.children('.wbcom-section-row').length;

	function toggleUI() {
		var val = $layout.val();
		var isComposite = (val === 'magazine' || val === 'newspaper');

		$options.find('.wbcom-layout-option').hide();
		if (val === 'magazine') {
			$options.find('.wbcom-option-magazine').show();
		} else if (val === 'newspaper') {
			$options.find('.wbcom-option-newspaper').show();
		} else if (val === 'grid' || val === 'list') {
			$options.find('.wbcom-option-simple').show();
		}

		if (isComposite) {
			$sections.show();
			if ($list.children('.wbcom-section-row').length === 0 && layoutDefaults[val]) {
				loadDefaults(val);
			}
		} else {
			$sections.hide();
		}
	}

	function loadDefaults(layout) {
		$list.empty();
		sectionCount = 0;
		if (!layoutDefaults[layout]) return;
		layoutDefaults[layout].forEach(function(sec) {
			addSection(sec);
		});
	}

	function addSection(data) {
		data = data || {};
		var tmpl = $('#tmpl-wbcom-section-row').html();
		tmpl = tmpl.replace(/\{\{INDEX\}\}/g, sectionCount);
		var $row = $(tmpl);
		if (data.title) $row.find('.wbcom-section-row__title').val(data.title);
		if (data.category) $row.find('select[name*="[category]"]').val(data.category);
		if (data.display_type) $row.find('select[name*="[display_type]"]').val(data.display_type);
		if (data.posts_count) $row.find('input[name*="[posts_count]"]').val(data.posts_count);
		$row.find('.wbcom-section-row__number').text(sectionCount + 1);
		$list.append($row);
		sectionCount++;
		renumber();
	}

	function renumber() {
		$list.children('.wbcom-section-row').each(function(i) {
			$(this).find('.wbcom-section-row__number').text(i + 1);
			$(this).attr('data-index', i);
			$(this).find('[name]').each(function() {
				var name = $(this).attr('name');
				$(this).attr('name', name.replace(/\[\d+\]/, '[' + i + ']'));
			});
		});
	}

	$layout.on('change', toggleUI);
	toggleUI();

	$('#wbcom-add-section').on('click', function() {
		addSection();
	});

	$list.on('click', '.wbcom-section-row__remove', function() {
		$(this).closest('.wbcom-section-row').remove();
		renumber();
	});

	$list.sortable({
		handle: '.wbcom-section-row__handle',
		placeholder: 'wbcom-section-row--placeholder',
		update: renumber
	});
});
