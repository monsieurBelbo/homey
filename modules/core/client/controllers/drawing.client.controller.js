'use strict';

angular.module('core').controller('DrawingController', ['$scope',
  function ($scope) {
    var vm = this;
    vm.onMapOverlayCompleted = function(e){
      console.log(e);        //TODO(gb): Remove trace!!!
      console.log(e.type);
    };
  }
]);
