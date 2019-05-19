import React, { Component } from 'react'

export class Session extends Component {
  render() {
    return (
      <div className="session">
         <h1 id="session-label">Session<br/>Length</h1>
         <div className="session-footer">
          <span id="session-decrement" onClick={this.props.ssDecrement}></span>
          <span id="session-length">{this.props.ssLength}</span>
          <span id="session-increment" onClick={this.props.ssIncrement}></span>
        </div>
      </div>
    )
  }
}

export default Session
