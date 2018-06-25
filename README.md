# simon
My version of Simon built when I was first learning React

This is one of FreeCodeCamp's front end development certificate projects. I was learning React when I started working on this so there are quite
a few things I would eventually like to update but I haven't had the time to work on them.

How it works: 

It's important to note that there are two modes to the game. Strict and Normal. Playing in Strict mode only allows for a user to have one pass at getting the button presses right before the game restarts. This makes for a much more challenging experience for the user. If a user gets the sequence of button selections correct for 20 rounds, then they win the game. I may have won once a couple of years ago. 

The app becomes progressively more difficult the farther into the rounds you get because it increases the speed of button presses. 

There are three components to the application. The four colored buttons, the console of that contains the number of rounds, restart, start and the mode switching capabilities and the logic container that holds all of the functions for the game logic.

How the basic game logic works:

The function that starts everything off is the firstMove function:

    firstMove: function() {
      noHumanClick = true;
      var num = this.getRandomId();
      this.playSound(num);
      arr.push(num);
      console.log(arr);
      setTimeout(function() {
          this.resetBtnColor();
          noHumanClick = false;
      }.bind(this), 450);
  }
  
  Essentially, the browser uses the `getRandomId()` function that grabs a number, 1 - 4, and that triggers a playSound() function which the game uses to play one of the four buttons audio files. Number's 1 - 4 play the button sounds, the number zero triggers the error buzzer. I'm using a noHumanClick global variable that tells the computer whether or not a humanClick is allowed.
 
 The firstMove() function is triggered inside the onStart() function.
   onStart: function() {
      step = 0;
      this.setState({start: true, moveCount: step});
      if(this.state.start && this.state.strict === false) {
          step = 0;
          this.setState({
              normal: true,
              start: false,
              moveCount: step
          });
          this.firstMove();
      }
      else if(this.state.strict && this.state.start){
        step = 0;
        this.setState({
            strict: true,
            start: false,
            moveCount: step
        });
        this.firstMove();
      }
  }
  
 Which is fired when a user clicks the start button.
 
 After the firstMove() function is fired, the nuHumanClick variable is set to false, which allows the user to select one of the buttons to mimick the computer's move.
 
 This action by the user calls a onBtnType() function that runs the the checkChoices function.
    checkChoices: function(humanClick, num) {
      var arrLength = arr.length;
      if (arr[humanClick] === num) {
          correct++;
      } else if (arr[humanClick] !== num && this.state.normal) {
          num = 0;
          this.playSound(num);
          noHumanClick = true;
          setTimeout(function() {
              this.loopMovesNoAdd();
          }.bind(this), 2000);
      } else if (this.state.strict && arr[humanClick] !== num) {
          num = 0;
          noHumanClick = true;
          this.playSound(num);
          step = 0;
          pauseTime = 900;
          this.setState({
              moveCount: step
          })
          setTimeout(function() {
              this.resetFirstMove();
          }.bind(this), 2000);
      }
      if (correct === arrLength) {
          step++;
          this.setState({moveCount: step});
          if (step === 5) {
              pauseTime = 800;
          } else if (step === 9) {
              pauseTime = 720;
          } else if (step === 13) {
              pauseTime = 650;
          } else if (step === 21) {
              step = "WIN";
              arr = [0];
              humanArr = [0];
              correct = 1;
              humanClick = 0;
              noHumanClick = true;
              this.setState({moveCount: step});
              setTimeout(function(){
                this.onRestart();
              }.bind(this), 3000);
          }
          this.loopMoves();
      }
  }
  
   onBtnType: function(event) {
      if (noHumanClick === true) {
          return;
      }
      humanClick++;
      var id = event.target.id;
      id = parseInt(id);
      this.playSound(id);
      this.checkChoices(humanClick, id);
  }
  
  the checkChoices function is where most of the game's logic lives. this function runs every time a user clicks on button. If the selection(s) are correct, then the function runs the loopMoves() function which goes through each computer selection and plays the sound of each button. There are a sequence of rounds that, when reached, the speed of the game increases, resulting in a more difficult challenge the deeper one gets into the game. The game restart's once the user reaches 20 rounds of completion.
  
  
 
