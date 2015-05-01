(function() {
  var FrameCtrl = function() {
    var frame = this;
  };

  FrameCtrl.$inject = [];


  angular.module('page.frame', [])
    .controller("FrameCtrl", FrameCtrl);
})();
