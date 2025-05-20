
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

   
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    
    var soundEffect = new Audio("sounds/" + randomChosenColor + ".mp3");
    soundEffect.play();
}


$(document).keypress(function (event) {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    
    var soundEffect = new Audio("sounds/" + userChosenColour + ".mp3");
    soundEffect.play();

    
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);

   
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        var wrongEffect = new Audio("sounds/wrong.mp3");
        wrongEffect.play();

        $("body").addClass("red");
        setTimeout(function () {
            $("body").removeClass('red');
        }, 1000);

        $("h1").text("Lost. Press any key to start again.");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
