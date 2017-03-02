//most of code will go here
(function() {
  "use strict";

  angular
    .module('myApp')
    .controller('UserController', UserController);

  UserController.$inject = ['$http', '$interval'];

  function UserController($http, $interval){
    var vm = this;
    vm.nameo = "agumon"
    vm.info = {}
    vm.updateNickname = updateNickname;
    vm.newMonster = newMonster;
    vm.addStrength = addStrength;
    vm.addFood = addFood;
    vm.getStats = getStats;
    vm.editAppear = editAppear;
    vm.stopInterval = stopInterval;
    vm.useToilet = useToilet;
    vm.lights = lights;

    function callAtInterval() {

      console.log("Interval occurred");
    }

    function newMonster (){
      $http
      .post('/user/new', vm.info)
      .then(function(res) {
       console.log('new monster created, response: ', res)
       // document.body.innerHTML = res.data;
      }, function(err) {
        console.log(err);
      });
    }

    function editAppear () {
      console.log('running edit appear')
      var html = `
      <section ng-controller="UserController as user">
        <form ng-submit='user.updateNickname()'>
          <input type="text" placeholder="edit monster name" ng-model='user.info.vpets.nickname'>
        <button type="submit">submit name</button></form>
      </section>`
      $('#editable').html(html)
    }

    function updateNickname(){
      $http
      .put('/user/', vm.info)
      .then(function(res) {
       console.log('updating monster nickname, response: ', res)
       var txt = "updated monster name to " + vm.info.vpets.nickname;
       $('#nickname-msg').text(txt)
       $('#greet-monster').text('Say hello to ' + vm.info.vpets.nickname)
      }, function(err) {
        console.log(err);
      });
    }

    function reduceFood(){
      $http
      .put('/action?action=feedsubtract', {times: 1})
      .then(function(res) {
        console.log('time to eat!!!')
        getStats();
      }, function(err) {
        console.log(err);
      });
    }

    function addFood(){
      $http
      .put('/action?action=feed', {times: 1})
      .then(function(res) {
        console.log('put request to feed digimon')
        getStats();
      }, function(err) {
        console.log(err);
      });
    }

    function renderFood () {
      var txt = ''
      for(let i = 0; i < vm.info.vpets.stats.hunger; i++){
        txt += '❤️️'
      }
      $('#stats-food').text(txt)
    }

    function renderStrength () {
      var txt = ''
      for(let i = 0; i < vm.info.vpets.stats.strength; i++){
        txt += '💪'
      }
      $('#stats-protein').text(txt)
    }

    function renderPoop () {
      var txt = ''
      for(let i = 0; i < vm.info.vpets.stats.poop; i++){
        txt += '💩'
      }
      $('#poop').text(txt)
    }

    function addStrength(){
      $http
      .put('/action?action=strength', {times: 1})
      .then(function(res) {
       console.log('put request to add strength digimon')
       getStats();
      }, function(err) {
        console.log(err);
      });
    }

    function reduceStrength(){
      $http
      .put('/action?action=strengthsubtract', {times: 1})
      .then(function(res) {
        console.log('strength reduced weakling!!!')
        getStats();
      }, function(err) {
        console.log(err);
      });
    }

    function useToilet(){
      $http
      .put('/action?action=toilet', {times: 1})
      .then(function(res) {
        console.log('toilet time')
        getStats();
      }, function(err) {
        console.log(err);
      });
    }

    function lights(evt){
      var play = document.querySelector('#playSpace');
      play.classList.toggle('night');
    }

    function getStats() {
      //get stats then save them to vm.info
      $http
      .get('/api/user')
      .then(function(res) {
       console.log('grabbing stats', res)
       vm.info.vpets = res.data[0].vpets[0]
      console.log('stats loaded into vm.info!', vm.info)
      renderFood();
      renderStrength();
      renderPoop();
      }, function(err) {
        console.log(err);
      })
    }
    getStats();
    $interval(reduceStrength, 10000);

    function stopInterval(promise) {
      console.log('stopping time', promise)
      return $interval.cancel(promise);
    }

  }
})();


