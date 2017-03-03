//most of code will go here
(function() {
  "use strict";

  angular
    .module('myApp')
    .controller('UserController', UserController);

  UserController.$inject = ['$http', '$interval', '$window'];

  function UserController($http, $interval, $window){
    var vm = this;
    vm.info = {}
    vm.updateNickname = updateNickname;
    vm.newMonster = newMonster;
    vm.addStrength = addStrength;
    vm.addFood = addFood;
    vm.getStats = getStats;
    vm.useToilet = useToilet;
    vm.lights = lights;
    vm.deleteMonster = deleteMonster;
    vm.asleep = false;
    vm.hungry = true;
    vm.pumped = true;

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

    function deleteMonster(){
      $http
      .delete('/user', vm.info)
      .then(function(res) {
      var html = `<div class="mainframe">
      <img id="sprites" src="assets/images/mainframe.png" alt="mainframe"> <br><br>
      Your monster has returned back to the mainframe<br>
      <a href="/user">Find another pest</a> <br><br>
      </div>
      `
      $("#playSpace").html(html)
      console.log('RESULT FROM DERETE', res)
      })
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

//======RENDER FUNCTIONS OF IMAGES ON SCREEN

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

//=======$HTTP REQUEST FUNCTIONS

    function addFood(){
      if(!vm.hungry) {
        monster.textContent = "😣"
        console.log("NOT HUNGRY STOP IT!")
      }
      else{
        if (vm.info.vpets.species === "monzaemon") {
          monster.style.background = "url(/assets/images/digimon-sprites.png) -260px -120px"
          monster.style.animation = 'monzaemonEat 1s steps(2) 3'
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
        if(res.status === 201) vm.hungry = false;
        getStats();
      }, function(err) {
        console.log(err);
      });
    }

    function addStrength(){
      if(!vm.pumped) {
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
       if(res.status === 201) vm.pumped = false;
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
       if(!res.data[0]) return console.log('no vpet info')

        vm.info.vpets = res.data[0].vpets[0]
      // console.log('stats loaded into vm.info!', vm.info)
      renderFood();
      renderStrength();
      renderPoop();

      if (vm.info.vpets.species === "monzaemon") resetDefault(monzaemonWalk() );
      else if (vm.info.vpets.species === "koromon") resetDefault(juniorWalk() );
      else resetDefault(babyWalk() );
      if (vm.info.vpets.stats.hunger > 4) vm.hungry = false;
      if (vm.info.vpets.stats.strength > 4) vm.pumped = false;
      }, function(err) {
        console.log(err);
      })
    }

//=======DEFAULT ANIMATIONS========

      function resetDefault(callback) {
        setTimeout(function(){
          console.log('resetting animations and food')
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

  getStats();
  $interval(reduceStrength, 45000);
  $interval(reduceFood, 60000);

//END OF CONTROLLER
  }
})();


