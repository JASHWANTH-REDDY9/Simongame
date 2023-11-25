let gamePattern=[];
let userClickedPattern=[]; 
let level=0;
let started=true;
let buttonColors=["red","yellow","green","blue"];

$(document).keypress( function() {
    if(started){
        nextSequence();
        started=false;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        sound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
}}

function nextSequence(){
    userClickedPattern=[];
    let num=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[num];
    gamePattern.push(randomChosenColor);
    console.log("GP"+gamePattern);
    level++;
    $("#level-title").text("Level "+level);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    sound(randomChosenColor);
    console.log("UC"+userClickedPattern);
}

function sound(color){
    let audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(".btn").click(function(){
    let usercolor = this.id;
    userClickedPattern.push(usercolor);
    console.log("UC"+userClickedPattern);
    animatePress(usercolor);
    sound(usercolor);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver(){
    level=0;
    gamePattern=[];
    started=true;
}