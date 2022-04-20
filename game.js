
var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

level=0;
started=0;
$(document).keydown(function(){
  if(started!=1){
    nextsequence();
    started=1
  }

});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});



function nextsequence(){
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;

    $("#level-title").text("Level "+level);

}

function playSound(name){
  var myaudio=new Audio("sounds/"+name+".mp3");
  myaudio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel]==gamePattern[currentlevel]){
    if(currentlevel==gamePattern.length-1){
      setTimeout(function(){
        nextsequence();
        userClickedPattern=[];
      },1000);
    }
  }
  else{
    var myaudiofile=new Audio("sounds/wrong.mp3");
    myaudiofile.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
  }
}

function startover(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
  started=0;

}
