// console.log('hello from monster.js')


// let teddy = document.querySelector('.monzaemon-walk');
// // var monster = document.querySelector('#monster');

// // teddy.addEventListener('click', function(evt) {
// //   console.log('clicked')
// //   this.classList.toggle('monzaemon-walk')
// //   this.classList.toggle('monzaemon-happy');
// // })

// var bg;
// var night;
// var sprite_sheet_image;
// var sprite_sheet;
// var walk_animation;

// function preload() {
//   // specify width and height of each frame and number of frames
//   sprite_sheet = loadSpriteSheet('/assets/images/digimon-sprites.png', 100, 100, 3);
//   // walk_animation = loadAnimation(sprite_sheet);

// var player_frames = loadJSON('/assets/sprites.json');
// player_sprite_sheet = loadSpriteSheet('/assets/images/digimon-sprites.png', player_frames);
// walk_animation = loadAnimation(player_sprite_sheet);

// }

// // function setup() {
// //   var canvas = createCanvas(400, 400);
// //   canvas.parent('middle')
// //   stroke(255, 0, 255);     // Set line drawing color to white
// //   frameRate(3);
// //   // createSprite(200, 100, 50, 50);
// //   bg = loadImage("/assets/images/grass.jpg")
// //   night = loadImage("/assets/images/night.jpg")
// // }
// // var y = 100;

// // function draw() {
// //   clear();


// //    y = y - 1;
// //   if (y < 0) {
// //     y = height;
// //   }
// //   // background(night);
// //   background(bg);
// //   drawSprites();
// //   line(0, y, width, y);
// //   animation(walk_animation, 220, 300);
// // }



// class Monster {
//   constructor(name, nickname) {
//     this.name = '';
//     this.nickname = '';
//     this.birthday = '';
//     this.stats = {};
//   }
// }

// // $("document").on("pageload", function() {
// //   console.log('loading your digimon');

// //   let digimon = new Monster;
// // })

// const digimon = new Monster;

// window.addEventListener("load", function load (evt) {
//   // $.get('/api/user', function(res) {
//   //   console.log('res', res)
//   // console.log('loading your digimon');
//   // digimon.species = res[0].vpets[0].species;
//   // digimon.nickname = res[0].vpets[0].nickname;
//   // digimon.birthday = res[0].vpets[0].birthday;
//   // digimon.stats.hunger = res[0].vpets[0].stats.hunger;
//   // digimon.stats.strength = res[0].vpets[0].stats.strength;
//   // digimon.stats.weight = res[0].vpets[0].stats.weight;
//   // digimon.stats.age = res[0].vpets[0].stats.age;
//   // digimon.stats.energy = res[0].vpets[0].stats.energy;
//   // digimon.stats.caremistake = res[0].vpets[0].stats.caremistake;
//   // // digimon.stats.poop = res[0].vpets[0].stats.poop;
//   // renderFood();
//   // renderStrength();
//   // })



//   window.removeEventListener("load", load)
// })

// // let defaultMonster = (element) => {
// //   element.style.height = "16px";
// //   element.style.width = "16px";
// //   element.style.imageRendering = "pixelated";
// //   element.style.zoom = "5";
// // }


// //element refers to div name to target
// //aniName refers to @keyFrame name to match css
// // let flip = () => {
// //   return setInterval(function () {

// //     monster.classList.toggle('flipped')
// //     // teddy.classList.toggle('flipped')
// //   }, 3000)
// // }

// // var flipId = flip();


// // let checkAge = () => {
// //   setInterval(function () {

// //   })
// // }

// // var noId = ''

// // let sayNo = () => {
// //   // myStopFunction();
// //   noId = no();
// //   let counter = 0;
// //   function no (){
// //     return setInterval(function() {
// //       monster.classList.toggle('flipped')
// //       counter += 1;
// //       console.log(counter)
// //       if (counter > 3) {
// //         return console.log('times up')
// //       }
// //     }, 500)
// //   }

// //   myStopFunction();

// // }

// // let eventTimer = () => {
// //   setInterval(function foodTimer() {
// //     console.log('time to eat!')
// //     digimon.stats.hunger--
// //     renderFood();
// //     $.put('/action?action=feedsubtract', {times: 1}, function(result){
// //      console.log(result);
// //   })
// //   }, 15000)

// //   setInterval(function pooTimer() {
// //     console.log('💩')
// //     digimon.stats.strength--
// //     renderStrength();
// //     digimon.stats.poop++
// //     renderPoop();
// //     $.put('/action?action=strengthsubtract', {times: 1}, function(result){
// //        console.log(result);
// //   })
// //   }, 10000)
// // }

// // let babyWalk = (element) => {

// //   defaultMonster(element);
// //   element.style.background = "url(/assets/images/digimon-sprites.png) 0px 0px";
// //   element.style.animation = `babyWalk 3s steps(3) infinite`
// // }


// // let babySleep = (element) => {
// //   myStopFunction('flip');
// //   element.style.background = "url(/assets/images/digimon-sprites.png) 0px -60px";
// //   element.style.animation = `babySleep 3s steps(2) infinite`
// // }

// // //bugged after I took the function scope out
// // let babyNo = (element) => {
// //   myStopFunction();
// //   element.style.background = "url(/assets/images/digimon-sprites.png) 0px -100px";
// //   element.style.animation = `babyNo 2`
// //   // sayNo();
// //   // babyWalk(monster);
// // }


// // function myStopFunction() {
// //   clearInterval(flipId);
// //   clearInterval(noId);
// // }
// //calling baby walk to start game
// // babyWalk(monster);
// // eventTimer();


