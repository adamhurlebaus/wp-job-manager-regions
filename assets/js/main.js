(function($) {
	'use strict';

	var jobRegions = {
		cache: {
			$document: $(document),
			$window: $(window),
		},

		init: function() {
			this.bindEvents();
		},

		bindEvents: function() {
			var self = this;

			this.cache.$document.on( 'ready', function() {
				self.$forms = $( '.search_jobs, .job_search_form' );

				self.addSubmission();
				self.addRegions();
				self.updateResults();
				self.resetResults();
			});
		},

		addSubmission: function() {
			$( '#job_region' ).chosen();
		},

		addRegions: function() {
			this.$forms.each(function(i, el) {
				var $regions = $(el).find( 'select.search_region' );

				if ( ! $regions.length ) {
					return;
				}
				
				var location = $(el).find( '.search_location' );
				location.html( '' );
				location.removeClass( 'search_location' ).addClass( 'search_region' );

				$regions.detach().appendTo(location);
				$regions.chosen();
			});
		},

		updateResults: function() {
			this.$forms.each(function(i, el) {
				var region = $(this).find( '.search_region' );

				region.on( 'change', function() {
					var target = $(this).closest( 'div.job_listings' );

					target.trigger( 'update_results', [ 1, false ] );
				});
			});
		},

		resetResults: function() {
			var self = this;

			$( '.job_listings' ).on( 'reset', function() {
				self.cache.$regions.val(0).trigger( 'change' );
			});
		}
	};

	jobRegions.init();

})(jQuery);

