var React = require('react');
var MainConsole = React.createClass({
  render: function(){
    return(
      <div className='console-container'>
        <h2>Simon</h2>
        <input ref='input' type='text' id='move-count' value={this.props.numMoves} readOnly/>
        <div className="console-buttons">
          <div className="strict-container">
            <div id="strict-light" className={this.props.strictOff}></div>
            <div id="strict" onClick={this.props.onClick}>Strict</div>
          </div>
          <div id="restart" onClick={this.props.onRestart}>Restart</div>
          <div id="start" onClick={this.props.onStart}>Start</div>
        </div>
      </div>
    )
  }
})
module.exports = MainConsole;
