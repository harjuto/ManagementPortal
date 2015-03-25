var homeDirectives = angular.module('home.directives', []);

homeDirectives.directive('googlePlaces', function() {
  return {
    restrict: 'E',
    replace: true,
    // transclude:true,
    scope: {
      location: '='
    },
    template: '<input id="location" name="location" type="text" class="form-control">',
    link: function($scope, elm, attrs) {
      $scope.$watch('location.refresh', function() {
        if ($scope.location.refresh) {
          var autocomplete = new google.maps.places.Autocomplete($("#location")[0], {});
          google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            $scope.location.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
            $scope.$apply();
          });
        }

      });

    }
  };
});
