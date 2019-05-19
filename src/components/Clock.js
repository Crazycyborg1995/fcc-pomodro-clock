import React, { Component } from 'react'

export class Clock extends Component {
  handleClick = (e) => {
    if(e.target.classList.value === 'fas fa-play'){ 
      e.target.setAttribute("class","fas fa-pause");
      this.props.startCountdown();
    }
    else{
      e.target.setAttribute("class","fas fa-play");
      this.props.pauseCountdown();
    }
  }
  render() {
  
    return (
      <div className="clock">
        <div className="timer">
         <h1 id="timer-label">{this.props.time.label}</h1>
         <p id="time-left">{this.props.time.minutes}:{this.props.time.seconds}</p>
         <audio id="beep" src="https://goo.gl/65cBl1"></audio>
        </div>
        <div className="btn-container">
          <i id="start_stop" onClick={this.handleClick} className="fas fa-play"></i>
          <i id="reset" onClick={this.props.resetCountdown} className="fas fa-sync"></i>           
        </div>
      </div>
    )
  }
}

export default Clock
