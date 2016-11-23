var React = require('react');
var MainConsole = require('./mainConsole.js');
var BgBtnContainer = require('./bgContainer.js');
var arr = [0];
var humanArr= [0];
var correct = 1;
var humanClick = 0;
var initialState = {
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
    this.setState({start: true})
  },
  onRestart: function(){
    this.setState(this.getInitialState());
    arr = [0];
    humanArr=[0];
    correct = 1;
    humanClick = 0;
  },
  restartLoops: function(){
    arr = [0];
    humanArr=[0];
    correct = 1;
    humanClick = 0;
    this.firstMove();
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
      if(num === 0){
        this.refs.error.play();
      }
    if(num === 1){
      this.refs.noiseOne.play();
      this.setState({bgButtonOne: 'bgButton one-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 400);
    }
    else if(num === 2){
      this.refs.noiseTwo.play();
      this.setState({bgButtonTwo: 'bgButton two-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 400);

    }
    else if(num === 3){
      this.refs.noiseThree.play();
      this.setState({bgButtonThree: 'bgButton three-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 400);

    }
    else if(num === 4){
      this.refs.noiseFour.play();
      this.setState({bgButtonFour: 'bgButton four-active'});
      setTimeout(function(){
        this.resetBtnColor();
      }.bind(this), 400);
    }

  },
  firstMove: function(){
    var num = this.getRandomId();
    this.playSound(num);
    arr.push(num);
    console.log(arr);
    setTimeout(function(){
      this.resetBtnColor();
    }.bind(this), 400);
  },
  resetFirstMove: function(){
    arr = [0];
    humanArr = [0];
    correct = 1;
    humanClick = 0;
    this.firstMove();
  },
   doSetTimeout:function(i) {
      setTimeout(function() {
        this.playSound(arr[i]);
      }.bind(this), i * 1000);
},
loopMovesNoAdd: function(){
  correct = 1;
  humanClick = 0;
  var i = 1;
    for (i = 1; i < arr.length; i++){
      this.doSetTimeout(i);
    }
},
  loopMoves: function(){
    correct = 1;
    humanClick = 0;
    var i = 1;
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
  checkChoices: function(humanClick, num){
    var arrLength = arr.length;
    if(arr[humanClick] === num){
      correct++;
    }
    else if(arr[humanClick] !== num && this.state.normal){
      console.log('error');
      setTimeout(function(){
        this.loopMovesNoAdd();
      }.bind(this), 3000);
    }
    else if(arr[humanClick] !== num && this.state.strict){
      console.log('error');
      setTimeout(function(){
        this.resetFirstMove();
      }.bind(this), 3000);
    }
    else if(correct === arrLength){
      console.log('next loop');
       this.loopMoves();
    }

  },
  onBtnType: function(event){
    humanClick++;
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
      this.setState({normal: true, start: false});
      this.firstMove();
    }
    else if(id === 'strict'){
      this.setState({strict: true, start: false});
      this.firstMove();
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
