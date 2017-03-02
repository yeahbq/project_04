//most of code will go here
(function() {
  "use strict";

  angular
    .module('myApp')
    .controller('TamaController', TamaController);

  TamaController.$inject = ['$http'];

  function TamaController($http){
    var vm = this;
    vm.addFood = addFood;
    vm.addStrength = addStrength;

    function addFood(){
      $http
      .put('/action?action=feed', {times: 1})
      .then(function(res) {
       console.log('put request to feed digimon')
      }, function(err) {
        console.log(err);
      });
    }

    function addStrength(){
      $http
      .put('/action?action=strength', {times: 1})
      .then(function(res) {
       console.log('put request to feed digimon')
      }, function(err) {
        console.log(err);
      });
    }
  }
})();


