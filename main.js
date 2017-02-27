console.log('hello')

let teddy = document.querySelector('.monzaemon-walk');
let monster = document.querySelector('#monster');

teddy.addEventListener('click', function(evt) {
  console.log('clicked')
  this.classList.toggle('monzaemon-walk')
  this.classList.toggle('monzaemon-happy');
})

let defaultMonster = (element) => {
  element.style.height = "16px";
  element.style.width = "16px";
  element.style.imageRendering = "pixelated";
  element.style.zoom = "5";
}

//element refers to div name to target
//aniName refers to @keyFrame name to match css
let babyWalk = (element) => {
  loopWalk();
  defaultMonster(element);
  element.style.background = "url(../sprites.png) 0px 0px";
  element.style.animation = `babyWalk 3s steps(3) infinite`
}

let loopWalk = () => {
  setInterval(()=>{
    monster.classList.toggle('flipped')
  }, 3000)
}

let babySleep = (element) => {
  clearInterval();
  element.style.background = "url(../sprites.png) 0px -60px";
  element.style.animation = `babySleep 3s steps(2) infinite`
}

let babyNo = (element) => {
  clearInterval(loopWalk);
  let counter = 0;
  element.style.background = "url(../sprites.png) 0px -100px";
  element.style.animation = `babyNo`
  let flipped = setInterval(()=>{
    monster.classList.toggle('flipped')
    counter += 1;
    console.log(counter)
    if (counter > 3) {
      clearInterval(flipped);
      babyWalk(monster);
      return loopWalk;
    }
  }, 1500)
}

//calling baby walk to start game
babyWalk(monster);
