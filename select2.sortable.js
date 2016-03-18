/**
 * jQuery Select2 Sortable
 * - enable select2 to be sortable via normal select element
 * 
 * author      : Vafour, Modified by Kinsey Van Ost
 * inspired by : jQuery Chosen Sortable (https://github.com/mrhenry/jquery-chosen-sortable)
 * License     : GPL
 */

(function($){
	$.fn.extend({
	select2SortableOrder: function(){
			var args  = Array.prototype.slice.call(arguments, 0);
			var $this = this.filter('[multiple]');
			$this.each(function(){
				var $select  = $(this); 

				// skip elements not select2-ed
				if(typeof($select.data('select2')) !== 'object'){
					return false;
				}

				var $select2 = $select.siblings('.select2-container'),
				    unselected = [],
				    sorted;

				var argList = undefined;
				if(typeof(args[0]) != 'undefined' && args[0].length > 0 && $.isArray(args[0])){
					argList = args[0];
					sorted = [];
					/*$select.val(argList);*/
					$select.find('option').each(function(){
						var isSelected = false;
						for(var i = 0; i < argList.length; i++){
							var id = argList[i];
							
							if(id == this.value){
								sorted[i] = $select.find('option[value="' + id + '"]')[0];
								isSelected = true;
								continue;
							}

						}
						if(!isSelected){
							!this.selected && unselected.push(this);
						}
					}); 
				}
				else{
					$select.find('option').each(function(){
						!this.selected && unselected.push(this);
					}); 
					sorted = $($select2.find('.select2-selection__choice li[class!="select2-search-field"]').map( function() {
						if (!this) {
							return undefined;
						}
						var id = $(this).data('select2Data').id;
						return $select.find('option[value="' + id + '"]')[0];
					}));
				}

				sorted.push.apply(sorted, unselected);
				$select.children().remove();
				$select.append(sorted);
				if(typeof(argList) != 'undefined')
					$select.select2('val', argList).trigger('change');
			});

			return $this;
		},
		select2Sortable: function(){
			//when constructing this sortable, we should ensure that the values are in the order that they were saved in.
			var args         = Array.prototype.slice.call(arguments, 0);
			    $this        = this.filter('[multiple]'),
			    validMethods = ['destroy'];

			if(args.length === 0 || typeof(args[0]) === 'object')
			{
				var defaultOptions = {
					bindOrder       : 'formSubmit', // or sortableStop
					sortableOptions : {
						placeholder : 'ui-state-highlight',
						items       : 'li:not(.select2-search-field)',
						tolerance   : 'pointer',
						//data 	    : []
					},
				};
				var options = $.extend(defaultOptions, args[0]);

				// Init select2 only if not already initialized to prevent select2 configuration loss
				if(typeof($this.data('select2')) !== 'object'){
					$this.select2(options.select2Options);
				}

				if(typeof(options.data) != undefined && $.isArray(options.data) && options.data.length > 0){
					var sortedOptions = options.data;
					$this.select2SortableOrder(sortedOptions);
				}

				$this.each(function(){
					var $select  = $(this),
					    $select2choices = $select.siblings('.select2-container').first('.select2-selection__choice');

					// Init jQuery UI Sortable
					$select2choices.sortable(options.sortableOptions);

					switch(options.bindOrder){
						case 'sortableStop':
							// apply options ordering in sortstop event
							$select2choices.on("sortstop.select2sortable", function( event, ui ) {
								$select.select2SortableOrder();
							});
							$select.on('change', function(e){
								$(this).select2SortableOrder();
							});
							break;
						default:
							// apply options ordering in form submit
							$select.closest('form').unbind('submit.select2sortable').on('submit.select2sortable', function(){
								$select.select2SortableOrder();
							});
					}

				});
			}
			else if($.isArray(args[0]) && args[0].length > 0){
				var sortedOptions = args[0];
				$this.select2SortableOrder(sortedOptions);
				$this.select2Sortable();
			}
			
			else if(typeof(args[0] === 'string'))
			{
				if($.inArray(args[0], validMethods) == -1)
				{
					throw "Unknown method: " + args[0];
				}
				if(args[0] === 'destroy')
				{
					$this.select2SortableDestroy();
				}
			}

			return $this;
		},
		select2SortableDestroy: function(){
			var $this = this.filter('[multiple]');
			$this.each(function(){
				var $select         = $(this),
				    $select2choices = $select.parent().find('.select2-selection__choice');

				// unbind form submit event
				$select.closest('form').unbind('submit.select2sortable');

				// unbind sortstop event
				$select2choices.unbind("sortstop.select2sortable");

				// destroy select2Sortable
				$select2choices.sortable('destroy');
			});
			return $this;
		}
	});
}(jQuery));
