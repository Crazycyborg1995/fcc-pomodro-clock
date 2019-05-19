import React, { Component } from 'react';
import Break from './components/Break';
import Session from './components/Session';
import Clock from './components/Clock';
import './App.css';

class App extends Component {
  state = {
    brLength : '5',
    ssLength : '25',
    time : {
      minutes : '25',
      seconds : '00',
      label : 'session' 
    },
    play : false,
    
  }

  ssDecrement = () => {
    if(!this.state.play){
      const session = this.state.ssLength;
      if(!(session <= 1)){
        this.setState({
          ssLength : session - 1,
          time: {
            minutes : session - 1,
            seconds: '00',
            label : 'session'
          }
        })
      }
    }
  }
  brDecrement = () => {
    if(!this.state.play){
      const session = this.state.brLength;
    if(!(session <= 1)){
      this.setState({
        brLength : session - 1
      })
     }
     if(this.state.time.label === 'break'){
      this.setState({
        time: {
          minutes : session - 1,
          seconds: '00',
          label : 'break'
        }
      })
     }
    }
  }
  ssIncrement = () => {
    if(!this.state.play){
      const session = this.state.ssLength;
    if(session < 60){
      this.setState({
        ssLength: session + 1,
        time: {
          minutes : session + 1,
          seconds: '00',
          label : 'session'
        }
      })
    }  
  }
}
  brIncrement = () => {
    if(!this.state.play){
      const session = this.state.brLength;
      if(session < 60){
        this.setState({
          brLength: session + 1
        })
      }
      if(this.state.time.label === 'break'){
        this.setState({
          time: {
            minutes : session + 1,
            seconds: '00',
            label : 'break'
          }
        })
      }
    }
  }

  startCountdown = () => {

      this.setState({
        play : true
      },function() {
        if(this.state.time.label === 'session') {
          this.loadSessionCountdown();
        }
        else {
          this.loadBreakCountdown();
        }
      })
    }
    pauseCountdown = () => {
      this.setState({
        play: false
      })
    }
  
      
    

    
    // if(this.state.time.label === 'session') {
    //   this.loadSessionCountdown();
    // }
    // else {
    //   this.loadBreakCountdown();
    // }
  
  // sessionCountdown = () => {
  //     this.setState({
  //       time : {
  //         minutes : this.state.ssLength,
  //         seconds : '00'
  //       }
  //     })   
  //     this.loadSessionCountdown();
  //     console.log("returned");
  // }

  loadSessionCountdown = () => {
    if(this.state.play){
      let minutes = this.state.time.minutes;
      let seconds = this.state.time.seconds;
      let countdownTime = ((minutes * 60000) + (seconds * 1000));
      if(countdownTime !== 0){
        countdownTime = countdownTime - 1000;
        let countdownTimeInMin = countdownTime / 60000;
        let countdownTimeInSec =  (countdownTime / 1000) % 60;
        console.log(countdownTime,countdownTimeInSec)
        this.setState({
            time: {
              minutes : `${countdownTimeInMin.toString().split('.')[0]}`,
              seconds : `${countdownTimeInSec}`,
              label: 'session'
            }
          })   
         
        setTimeout(this.loadSessionCountdown,1000)
      }
    else if(countdownTime === 0){  
      this.setState({
        time : {
          minutes: '00',
          seconds : '00',
          label : 'session'
        }
      })
    document.getElementById("beep").play();
    setTimeout(this.breakCountdown,5000);
      }
    }
  }
  breakCountdown = () => {
    this.setState({
      time : {
        minutes : this.state.brLength,
        seconds : '00'
      }
    })   
    this.loadBreakCountdown();
}

loadBreakCountdown = () => {
  if(this.state.play){
    let minutes = this.state.time.minutes;
    let seconds = this.state.time.seconds
    let countdownTime = ((minutes * 60000) + (seconds * 1000));
    if(countdownTime !== 0){
    countdownTime = countdownTime - 1000;
    let countdownTimeInMin = countdownTime / 60000;
    let countdownTimeInSec =  (countdownTime / 1000) % 60;
      this.setState({
        time: {
          minutes : `${countdownTimeInMin.toString().split('.')[0]}`,
          seconds : `${countdownTimeInSec}`,
          label : 'break'
        }
      })   
      setTimeout(this.loadBreakCountdown,1000)
    }
    else if(countdownTime === 0){
    this.setState({
        time : {
          minutes: '00',
          seconds : '00',
          label : 'break'
        }
      })
    document.getElementById("beep").play();
    setTimeout(this.sessionCountdown,5000);
    }
  }
}

  resetCountdown = () => {
    this.setState({
      ssLength : 25,
      brLength : 5,
      time : {
        minutes : '25',
        seconds : '00',
        label : 'session'
      },
      play: false
    })
    let sound = document.getElementById("beep");
    sound.pause();
    sound.currenTime = 0;
  }
 
  render() {
    return (
      <div className="App">
        <div className="header">
          <img src={require('./images/pom-logo.png')} alt=""/>
        </div>
        <div className="title">
          <h1>Pomgrenate<br/>Clock</h1>
        </div>        
        <Break brIncrement={this.brIncrement} brDecrement={this.brDecrement} brLength={this.state.brLength}/>
        <Session  ssIncrement={this.ssIncrement} ssDecrement={this.ssDecrement} ssLength={this.state.ssLength}/>
        <Clock startCountdown={this.startCountdown} pauseCountdown={this.pauseCountdown} resetCountdown={this.resetCountdown} time={this.state.time}/>
      </div>
    );
  }
}

export default App;
