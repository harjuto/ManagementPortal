(function () {
	var ValueFilter = function () {
		return function (input) {
			input = input || '';
			if (input == "false" || input == "0") {
				input = '';
			}

			return input;
		};
	};
	
	angular.module('common')
		.filter('valueFilter', ValueFilter);
})();