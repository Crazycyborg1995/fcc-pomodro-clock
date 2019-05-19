import React, { Component } from 'react'

export class Break extends Component {
  render() {
    return (
      <div className="break">
        <h1 id="break-label">Break<br/>Length</h1>
        <div className="break-footer"> 
          <span id="break-decrement" onClick={this.props.brDecrement}></span>
          <span id="break-length">{this.props.brLength}</span>
          <span id="break-increment" onClick={this.props.brIncrement}></span>
        </div>
      </div>
    )
  }
}

export default Break
