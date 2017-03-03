//most of code will go here
(function() {
  "use strict";

  angular
    .module('myApp')
    .controller('UserController', UserController);

  UserController.$inject = ['$http', '$interval', '$window'];

  function UserController($http, $interval, $window){
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
    vm.asleep = false;

    function newMonster (){
      $http
      .post('/user/new', vm.info)
      .then(function(res) {
       console.log('new monster created, response: ', res)
       // document.body.innerHTML = res.data;
       $window.location='/user';
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

    var hungry = true;
    function addFood(){
      if(!hungry) {
        monster.textContent = "😣"
        console.log("NOT HUNGRY STOP IT!")
      }
      else{
        if (vm.info.vpets.species === "monzaemon") {
          monster.style.background = "url(/assets/images/digimon-sprites.png) -260px -120px"
          monster.style.animation = 'monzaemonHappy 1s steps(2) 3'
        }
        else if (vm.info.vpets.species === "koromon") {
          monster.style.background = "url(/assets/images/digimon-sprites.png) -20px -240px"
          monster.style.animation = 'juniorEat 1s steps(2) 3'
        } else {
          monster.style.background = "url(/assets/images/digimon-sprites.png) 0px -240px"
          monster.style.animation = 'babyEat 1s steps(2) 3'
        }
        $('#play-food').text('🍖')
      }

      $http
      .put('/action?action=feed', {times: 1})
      .then(function(res) {
        console.log('feeding and response', res)
        if(res.status === 201) hungry = false;
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

    var pumped = true;
    function addStrength(){
      if(!pumped) {
        monster.textContent = "😣"
        console.log('he is too weak to workout')
      } else{
        if (vm.info.vpets.species === "monzaemon") {
          monster.style.background = "url(/assets/images/digimon-sprites.png) -260px -120px"
          monster.style.animation = 'monzaemonHappy 1s steps(2) 3'
        }
        else if (vm.info.vpets.species === "koromon") {
          monster.style.background = "url(/assets/images/digimon-sprites.png) -20px -120px"
          monster.style.animation = 'juniorHappy 1s steps(2) 3'
        } else{
          monster.style.background = "url(/assets/images/digimon-sprites.png) 0px -120px";
          monster.style.animation = `babyHappy 1s steps(2) 3`
        }
        $('#play-strength').text('🥊')
      }

      $http
      .put('/action?action=strength', {times: 1})
      .then(function(res) {
       console.log('gain powah and res', res)
       if(res.status === 201) pumped = false;
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
      vm.asleep = !vm.asleep;
      var play = document.querySelector('#playSpace');
      play.classList.toggle('night');

      if (vm.asleep){
        console.log('time for bed zZz')
        if(vm.info.vpets.species === "monzaemon"){
          monster.style.background ="url(/assets/images/digimon-sprites.png) -260px -60px"
          monster.style.animation = "monzaemonSleep 3s steps(2) infinite"
        }
        else if (vm.info.vpets.species === "koromon"){
          monster.style.background ="url(/assets/images/digimon-sprites.png) -20px -60px"
          monster.style.animation = "koromonSleep 3s steps(2) infinite"
        }
        else {
          monster.style.background ="url(/assets/images/digimon-sprites.png) 0px -60px"
          monster.style.animation = "babySleep 3s steps(2) infinite"
        }
      }
      else getStats();
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

      if (vm.info.vpets.species === "monzaemon") resetDefault(monzaemonWalk() );
      else if (vm.info.vpets.species === "koromon") resetDefault(juniorWalk() );
      else resetDefault(babyWalk() );
      if (vm.info.vpets.stats.hunger > 4) hungry = false;
      if (vm.info.vpets.stats.strength > 4) pumped = false;
      }, function(err) {
        console.log(err);
      })
    }

//=======DEFAULT ANIMATIONS========

      function resetDefault(callback) {
        setTimeout(function(){
          console.log('back to zero')
          callback;
          $('#play-food').text('')
          $('#play-strength').text('')
          monster.textContent = ""
        }, 3000);
      }

//RUNS ON LOAD
  var monster = document.querySelector('#monster');
  function defaultMonster(){
    monster.style.height = "16px";
    monster.style.width = "16px";
    monster.style.imageRendering = "pixelated";
    monster.style.zoom = "5";
  }
  function babyWalk (){
    defaultMonster();
    monster.style.background = "url(/assets/images/digimon-sprites.png) 0px 0px";
    monster.style.animation = `babyWalk 3s steps(3) infinite`
  }

  function juniorWalk (){
  defaultMonster();
  monster.style.background = "url(/assets/images/digimon-sprites.png) -20px 0px";
  monster.style.animation = `juniorWalk 3s steps(3) infinite`
}

 function monzaemonWalk (){
  defaultMonster();
  monster.style.background = "url(/assets/images/digimon-sprites.png) -260px 0px";
  monster.style.animation = `monzaemonWalk 3s steps(3) infinite`
}


  // babyWalk(monster);

  getStats();
  $interval(reduceStrength, 120000);
  $interval(reduceFood, 60000);

    function stopInterval(promise) {
      console.log('stopping time', promise)
      return $interval.cancel(promise);
    }
//END OF CONTROLLER
  }
})();


