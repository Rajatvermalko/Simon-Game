
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
let anotherCopyOfChoice=[];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  else alert("Wrong Choice");
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  anotherCopyOfChoice=userClickedPattern;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  nextSequence(level);
});
function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === anotherCopyOfChoice[currentLevel]) {
      if (anotherCopyOfChoice.length === gamePattern.length){
        setTimeout(function () {
            userClickedPattern=[];
          nextSequence(level);
        }, 100);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);  
      startOver();
}
}

function nextSequence() {
level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  for(i=0;i<level;i++){
       $("#"+gamePattern)[i].addClass("pressed");
        setTimeout(function () {
            $("#"+gamePattern[i]).removeClass("pressed");
        }, 100);
    }
  playSound(gamePattern[i]);
  checkAnswer(level);
  }

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 300);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
