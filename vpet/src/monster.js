import React, {Component} from 'react';

let monster = document.querySelector('#monster');
let loopWalk = () => {
  setInterval(()=>{
    monster.classList.toggle('flipped')
  }, 3000)
}
let defaultMonster = (element) => {
  element.style.height = "16px";
  element.style.width = "16px";
  element.style.imageRendering = "pixelated";
  element.style.zoom = "5";
}
let babyWalk = (element) => {
  loopWalk();
  defaultMonster(element);
  element.style.background = "url(../sprites.png) 0px 0px";
  element.style.animation = `babyWalk 3s steps(3) infinite`
}


class Monster extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }
  render() {
    return(
      <div>
        <h1>Virtual Pest</h1>
        <input type="text"/>
        <button>Submit</button>
        <div id="monster"></div>
        <div className="monzaemon-walk"></div>
      </div>
      )
  }
}

export default Monster;
