(function() {
  var FrameCtrl = function(AuthenticationStorage) {
    var frame = this;
    frame.authStorage = AuthenticationStorage;
  };

  FrameCtrl.$inject = ["AuthenticationStorage"];


  angular.module('page.frame', [])
    .controller("FrameCtrl", FrameCtrl);
})();