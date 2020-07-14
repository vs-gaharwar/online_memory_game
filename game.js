var started = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];


function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  level++;
  $("#level-title").text("Level " + level);
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

  //console.log("game:" + gamePattern);
}


//user gamePattern

// $(document).click(function(){
//
//   if(started === false)
//   {
//     //console.log("started: " + level);
//     var valid = true;
//     for(i=0; i<buttonColors.length; i++)
//     {
//       if($(this).attr("id") === buttonColors[i])
//       {
//         valid = false;
//       }
//     }
//
//     if(valid === true)
//     {
//       console.log($(this).attr("id"));
//       userClickedPattern = [];
//       nextSequence();
//       started = true;
//       //console.log("level: " + level);
//     }
//   }
// });

// document.addEventListener("keydown", function(event){
//
//   handleKey(event.key);
//   buttonAnimation(event.key);
//
// });

$(".start-btn").click(function(){
  animatePress("startColor");
  var txt = $(".start-btn").text();
  if(txt === "Start" || txt === "Restart")
  {
  //   console.log("started: " + level);
    userClickedPattern = [];
    setTimeout(function(){ nextSequence(); }, 1000);
    started = true;
    $(".start-btn").text("Reset");
    //setTimeout(function(){ $(".start-btn").hide(); }, 300);
    //$(this).remove();
    //console.log("level: " + level);
  }
  else if(txt === "Reset")
  {
    startOver();
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over") }, 200);
    userClickedPattern = [];
    $(".start-btn").text("Start");
    $("#level-title").text("Let's begin!");
  }
});

$(".btn").click(function(){
    //console.log($(this).attr("id"));
    userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    if(level === userClickedPattern.length)  checkAnswer(level);

    //console.log(userClickedPattern);
});

function playSound(currentColour)
{
  var audio = new Audio("sounds/" + currentColour + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){ $("#" + currentColour).removeClass("pressed") }, 100);
}

// $(document).keypress(function(){
//
//   if(started === false)
//   {
//     //console.log("started: " + level);
//     userClickedPattern = [];
//     nextSequence();
//     started = true;
//     //console.log("level: " + level);
//   }
//
// });

function checkAnswer(level, last)
{
  //console.log("user: " + userClickedPattern + ", game: " + gamePattern);

  var status = "success";
  for(i=0; i<level; i++)
  {
    if(userClickedPattern[i] != gamePattern[i])
    {
      status = "fail";
    }
  }

  if(status === "fail")
  {
      //console.log("fail");
      playSound("wrong");
      //$("#level-title").text("Game Over, Press Any Key or Click Anywhere Except the Buttons to Restart");
      $("#level-title").text("Game Over!");
      //$("#level-title").append('<div type="button" id="startColor" class="start-btn"><span id="start-btn">Restart</span></button></div>')
      $("body").addClass("game-over");
      setTimeout(function(){ $("body").removeClass("game-over") }, 200);
      //setTimeout(function(){ $(".start-btn").show(); }, 300);
      startOver();
      $(".start-btn").text("Restart");
      //console.log("fail: " + level);
  }
  else if(status === "success")
  {
     //console.log("success");

     setTimeout(nextSequence, 1000);
     userClickedPattern = [];
  }
}

function startOver()
{
  gamePattern = [];
  started = false;
  level = 0;
}
