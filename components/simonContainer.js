var React = require('react');
var MainConsole = require('./mainConsole.js');
var BgBtnContainer = require('./bgContainer.js');
var initialState = {
                    normal: false,
                    restart: false,
                    strict: false,
                    start: false,
                    moveCount: '',
                  };
var SimonContainer = React.createClass({
  getInitialState: function(){
    return initialState;
  },
  getRandomId: function(){
    return Math.floor(Math.random() * (4 - 1)) + 1;
  },
  playSound: function(num){
    if(num === 1){
      this.refs.noiseOne.play();
    }
    else if(num === 2){
      this.refs.noiseTwo.play();
    }
    else if(num === 3){
      this.refs.noiseThree.play();
    }
    else if(num === 4){
      this.refs.noiseFour.play();
    }

  },
  compMove: function(){
    //figure out how to change background color next
    var arr = [];
    var num = this.getRandomId();
    this.playSound(num);
    arr.push(num);
    //return arr for checking if human choice is correct
  },
  onBtnType: function(event){
    var id = event.target.id;
    id = parseInt(id);
    if(this.state.start === false){
      return;
    }
    this.playSound(id);
  },
  onStart: function(){
    //start game
    this.setState({start: true})
  },
  onRestart: function(){
    //reset state
    this.setState(this.getInitialState());
  },
  onWorkType: function(event){
    var id = event.target.id;
    if(!this.state.start){
      return;
    }
    if(id ==='normal'){
      this.setState({normal: true, start: false});
      this.compMove();
      //run game function using normal flag
    }
    else if(id === 'strict'){
      this.setState({strict: true, start: false});
        this.compMove();
      //run game function using strict flag
    }
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
                <MainConsole onClick = {this.onWorkType}
                             onStart = {this.onStart}
                             onRestart = {this.onRestart}/>
              </div>
            </div>
          </div>

    )
  }
})
module.exports = SimonContainer;
