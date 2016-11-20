var React = require('react');
var BgBtnContainer = React.createClass({
  render: function(){
    return (
      <div className='bgButton-container'>
        <div className="firstTwoButtons">
          <div id='1' className="bgButton one" onClick={this.props.onClick}></div>
          <div id='2' className="bgButton two" onClick={this.props.onClick}></div>
        </div>
        <div className="secondButtons">
          <div id='3' className="bgButton three" onClick={this.props.onClick}></div>
          <div id='4' className="bgButton four" onClick={this.props.onClick}></div>
        </div>
      </div>
    )
  }
})
module.exports = BgBtnContainer;
