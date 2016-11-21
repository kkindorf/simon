var React = require('react');
var BgBtnContainer = React.createClass({
  render: function(){
    return (
      <div className='bgButton-container'>
        <div className="firstTwoButtons">
          <div id='1' className={this.props.bgButtonOne} onClick={this.props.onClick}></div>
          <div id='2' className={this.props.bgButtonTwo} onClick={this.props.onClick}></div>
        </div>
        <div className="secondButtons">
          <div id='3' className={this.props.bgButtonThree} onClick={this.props.onClick}></div>
          <div id='4' className={this.props.bgButtonFour} onClick={this.props.onClick}></div>
        </div>
      </div>
    )
  }
})
module.exports = BgBtnContainer;
