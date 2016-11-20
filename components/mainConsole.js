var React = require('react');
var MainConsole = React.createClass({
  render: function(){
    return(
      <div className='console-container'>
        <input type='text' id='move-count' value={this.props.numMoves} readOnly/>
        <div className="console-buttons">
          <h2 id="normal" onClick={this.props.onClick}>Normal Mode</h2>
          <h2 id="restart" onClick={this.props.onClick}>Restart</h2>
          <h2 id="strict" onClick={this.props.onClick}>Strict Mode</h2>
        </div>
      </div>
    )
  }
})
module.exports = MainConsole;
