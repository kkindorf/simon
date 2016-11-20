var React = require('react');
var MainConsole = require('./mainConsole.js');
var BgBtnContainer = require('./bgContainer.js');
var SimonContainer = React.createClass({
  onBtnType: function(event){
    var id = event.target.id;
    if(id==='1'){
      this.refs.noiseOne.play();
    }
    else if(id === '2'){
      this.refs.noiseTwo.play();
    }
    else if(id === '3'){
      this.refs.noiseThree.play();
    }
    else if(id === '4'){
      this.refs.noiseFour.play();
    }
  },
  onWorkType: function(event){
    console.log(event.target.id);
  },
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
              <audio ref="noiseOne" src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" type="audio/mp3"></audio>
              <audio ref="noiseTwo" src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3" type="audio/mp3"></audio>
              <audio ref="noiseThree" src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" type="audio/mp3"></audio>
              <audio ref="noiseFour" src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" type="audio/mp3"></audio>
              <div className="game-container">
                <BgBtnContainer onClick = {this.onBtnType}/>
                <MainConsole onClick = {this.onWorkType}/>
              </div>
            </div>
          </div>

    )
  }
})
module.exports = SimonContainer;
