var React = require('react');
var MainConsole = require('./mainConsole.js');
var BgBtnContainer = require('./bgContainer.js');
var arr = [0];
var humanArr=[0];
var count = 0;
var correct = 1;
var humanClick = 0;
var correctChoice = true;
var initialState = {
                    play: true,
                    normal: false,
                    restart: false,
                    strict: false,
                    moveCount: 0,
                    bgButtonOne: 'bgButton one',
                    bgButtonTwo: 'bgButton two',
                    bgButtonThree: 'bgButton three',
                    bgButtonFour: 'bgButton four'

                  };
var SimonContainer = React.createClass({
  getInitialState: function(){
    return initialState;
  },
  onStart: function(){
    //start game
    this.setState({start: true})
  },
  onRestart: function(){
    //reset state
    this.setState(this.getInitialState());
    arr = [0];
    humanArr=[0];
    count = 0;
    correct = 1;
    correctChoice = true;
    humanClick = 0;
  },
  getRandomId: function(){
    return Math.floor(Math.random() * (4 - 1)) + 1;
  },
  resetBtnColor: function(){
      this.setState({
        bgButtonOne: 'bgButton one',
        bgButtonTwo: 'bgButton two',
        bgButtonThree: 'bgButton three',
        bgButtonFour: 'bgButton four'
      })
  },
  playSound: function(num){
    if(num === 1 && correctChoice){
      this.refs.noiseOne.play();
      this.setState({bgButtonOne: 'bgButton one-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);
    }
    else if(num === 2 && correctChoice){
      this.refs.noiseTwo.play();
      this.setState({bgButtonTwo: 'bgButton two-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);

    }
    else if(num === 3 && correctChoice){
      this.refs.noiseThree.play();
      this.setState({bgButtonThree: 'bgButton three-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);

    }
    else if(num === 4 && correctChoice){
      this.refs.noiseFour.play();
      this.setState({bgButtonFour: 'bgButton four-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);
    }

  },
  firstMove: function(){
    var num = this.getRandomId();
    this.playSound(num);
    arr.push(num);
    console.log(arr);
    setTimeout(function(){
      this.resetBtnColor();
    }.bind(this), 500);

  },
   doSetTimeout:function(i) {
      setTimeout(function() {
        this.playSound(arr[i]);
      }.bind(this), i * 1000);
},

  loopMoves: function(){
    correct = 1;
    humanClick = 0;
    var i = 1;
      for (i = 1; i < arr.length; i++){
        this.doSetTimeout(i);
      }
      console.log(i)
      console.log(arr.length);
      if(i === arr.length){
        //add to array of moves
        setTimeout(function(){
          this.firstMove();
        }.bind(this), i * 1000);
      }

  },
  checkChoices: function(humanClick, num){
    var arrLength = arr.length;
    if(arr[humanClick] === num){
      correct++;
    }
    console.log('correct is '+correct);
    console.log('arr length is'+arrLength);
    if(correct === arrLength){
      console.log('next loop');
       this.loopMoves();
    }

  },
  onBtnType: function(event){
    humanClick++;
    console.log(humanClick);
    var id = event.target.id;
    id = parseInt(id);
    this.playSound(id);
    this.checkChoices(humanClick, id);
  },
  onGameType: function(event){
    var id = event.target.id;
    if(!this.state.start){
      return;
    }
    if(id ==='normal'){
      this.setState({normal: true, start: false, play: false});
      this.firstMove();
    }
    else if(id === 'strict'){
      this.setState({strict: true, start: false, play: false});
      this.firstMove();
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
                <BgBtnContainer onClick = {this.onBtnType}
                                bgButtonOne = {this.state.bgButtonOne}
                                bgButtonTwo = {this.state.bgButtonTwo}
                                bgButtonThree = {this.state.bgButtonThree}
                                bgButtonFour = {this.state.bgButtonFour}/>
                <MainConsole numMoves = {this.state.moveCount}
                             onClick = {this.onGameType}
                             onStart = {this.onStart}
                             onRestart = {this.onRestart}/>
              </div>
            </div>
          </div>

    )
  }
})
module.exports = SimonContainer;
