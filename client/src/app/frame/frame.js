(function() {
  var FrameCtrl = function(AuthenticationFactory) {
    var frame = this;
    frame.authFactory = AuthenticationFactory;
  };

  FrameCtrl.$inject = ["AuthenticationFactory"];


  angular.module('page.frame', [])
    .controller("FrameCtrl", FrameCtrl);
})();