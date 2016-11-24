var React = require('react');
var MainConsole = React.createClass({
  render: function(){
    return(
      <div className='console-container'>
        <h2>Simon</h2>
        <input ref='input' type='text' id='move-count' className = "input-lg" value={this.props.numMoves} readOnly/>
        <div className="console-buttons">
          <div id="strict" onClick={this.props.onClick}></div>
          <div id="restart" onClick={this.props.onRestart}></div>
          <div id="start" onClick={this.props.onStart}></div>
        </div>
      </div>
    )
  }
})
module.exports = MainConsole;
