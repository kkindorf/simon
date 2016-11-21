var React = require('react');
var MainConsole = require('./mainConsole.js');
var BgBtnContainer = require('./bgContainer.js');
var arr = [0];
var count = 0;
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
    count = 0;
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
    if(num === 1){
      this.refs.noiseOne.play();
      this.setState({bgButtonOne: 'bgButton one-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);
    }
    else if(num === 2){
      this.refs.noiseTwo.play();
      this.setState({bgButtonTwo: 'bgButton two-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);

    }
    else if(num === 3){
      this.refs.noiseThree.play();
      this.setState({bgButtonThree: 'bgButton three-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 500);

    }
    else if(num === 4){
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
    setTimeout(function(){
      this.resetBtnColor();
    }.bind(this), 500);
    arr.push(num);
  },
   doSetTimeout:function(i) {
  setTimeout(function() {
    console.log(arr[i]);
    this.playSound(arr[i]);
  }.bind(this), i * 1000);
},

  loopMoves: function(){
    var i;
    //figure out how to play the first one this starts at second right now
      for (i = 1; i < arr.length; i++){
        this.doSetTimeout(i);
      }
      if(i === arr.length){
        //add to array of moves
        setTimeout(function(){
          this.firstMove();
        }.bind(this), i * 1000);
      }


  },
  onBtnType: function(event){
    count++;
    console.log(arr);
    var id = event.target.id;
    id = parseInt(id);
    this.playSound(id);
    if(count > 0){
      this.loopMoves();
    }

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
