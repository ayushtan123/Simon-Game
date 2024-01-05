// Constants
var buttonColours = ["red", "blue", "green", "yellow"];

// Game state variables
var started = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

// Event listener for starting the game
$("body").keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Event listener for button clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    console.log("c");
    checkAnswer(userClickedPattern.length - 1);
});

// Function to generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("a");
        if (userClickedPattern.length === gamePattern.length) {
            console.log("b");
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        else{console.log("d");}
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Function to reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
