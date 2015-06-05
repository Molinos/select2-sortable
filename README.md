select2-sortable
================

A little plugin that will make [select2](https://github.com/ivaynberg/select2) multiple select become sortable out of the box.

Usage:

	// init select2 sortable
	$(select2multiselect).select2Sortable();
	
	// destroy select2 sortable
	$(select2multiselect).select2Sortable('destroy');
	
	// manually trigger the sorting
	$(select2multiselect).select2SortableOrder();
	
	// custom options
	$(select2multiselect).select2Sortable({
		bindOrder: 'formSubmit' // or `sortableStop`,
		sortableOptions: {
			// please refer to jQuery UI sortable API (http://api.jqueryui.com/sortable/)
		}
	});
	
	//initialize with previously sorted options
	//By passing the previously sorted value taken from select2, in the form
	//of an array of the previously selected options' values, the select2
	//options will be ordered with the selected options sorted as they were
	//before.

	//Example:
	previouslySortedOptions = ["3", "1", "2"];

	//Initialize with ARRAY of previously sorted options.
	$(select2multiselect).select2Sortable(previouslySortedOptions);
	
	//with other config options, specify "data:previouslySortedOptions" as previously selected info
	$(select2multiselect).select2Sortable({
		bindOrder: 'formSubmit' // or `sortableStop`,
		sortableOptions: {
			// please refer to jQuery UI sortable API (http://api.jqueryui.com/sortable/)
		},
		select2Options:{ //give select2 config options as well.
			// please refer to select2 documentation (https://select2.github.io/)
		},
		data:previouslySortedOptions
	});

	//perform sorting after initialization
	$(select2multiselect).select2SortableOrder(previouslySortedOptions );


Contributors:

- [Matteo Poile](https://github.com/matteopoile)
- [Kinsey Van Ost] (https://github.com/kinseyost)
