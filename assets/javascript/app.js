//Declaring the quiz variables
var question1 = 
{
    question: "Captain America once faced off against this DC comics superhero:",
    answer: "Batman",
    choices: ["Wonder Woman", "Batman", "Superman", "Aquaman"],
    correctAnswer: 1,
    correctImg: "assets/images/question1.jpg"
};

var question2 = 
{
    question: "What planet is Superman from?",
    answer: "Krypton",
    choices: ["Krypton", "Portworld", "Koncrete", "Ranx"],
    correctAnswer: 0,
    correctImg: "assets/images/question2.jpg"
};

var question3 = 
{
    question: "What was Dr. Strange’s profession before he became Sorcerer Supreme?",
    answer: "Neurosurgeon",
    choices: ["Professor", "Scientist", "Dentist", "Neurosurgeon"],
    correctAnswer: 3,
    correctImg: "assets/images/question3.jpg"
};

var question4 = 
{
    question: "Who does Bruce Banner become?",
    answer: "Hulk",
    choices: ["Iron-Man", "Hulk", "Spider-Man", "Captain America"],
    correctAnswer: 1,
    correctImg: "assets/images/question4.jpg"
};

var question5 = 
{
    question: "What kind of criminal is Catwoman?",
    answer: "Thief",
    choices: ["Blackmailer", "Thief", "Assassin", "Terrorist"],
    correctAnswer: 1,
    correctImg: "assets/images/question5.jpg"
};

var question6 = 
{
    question: "In the DC/Marvel crossover where DC characters fight against Marvel characters, who is Batman matched up against?",
    answer: "Captain America",
    choices: ["Hulk", "Spider-Man", "Wolverine", "Captain America"],
    correctAnswer: 3,
    correctImg: "assets/images/question6.jpg"
};

var question7 = 
{
    question: "In the graphic novel 'Hush' who does Batman fall in love with",
    answer: "Catwoman",
    choices: ["Poison Ivy", "Huntress", "Catwoman", "Lois Lane"],
    correctAnswer: 2,
    correctImg: "assets/images/question7.jpg"
};

var question8 = 
{
    question: "Who fell in love with The Joker?",
    answer: "Harley Quinn",
    choices: ["Catwoman", "Harley Quinn", "Poison Ivy", "Circe"],
    correctAnswer: 1,
    correctImg: "assets/images/question8.jpg"
};

var question9 = 
{
    question: "Where is Aquaman from?",
    answer: "Atlantis",
    choices: ["Atlantis", "Asgaard", "Mount Olympus", "Minos"],
    correctAnswer: 0,
    correctImg: "assets/images/question9.jpg"
};

var question10 = 
{
    question: "Who actually kills Superman?",
    answer: "Doomsday",
    choices: ["Atrocitus", "Darkseid", "Parallax", "Doomsday"],
    correctAnswer: 3,
    correctImg: "assets/images/question10.jpg"
};


//Array of questions
var QuestionsArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

var indexQuestion = 0;


//Game scores
var gameScores = 
{
answeredCorrect: 0,
answeredWrong: 0,
missed: 0
};

function resetVariables() 
{
console.log("resetVariables function reached");
gameScores.answeredCorrect = 0;
gameScores.answeredWrong = 0;
gameScores.missed = 0;
indexQuestion = 0;

$("#scoreboard").html("");
$("#reset").hide();
}

//move to next question function

function nextQuestion()
{
indexQuestion++;

if (indexQuestion < QuestionsArray.length)
{
    displayQuestion();
    $('#quizContent').hide();
    $('#timerDisplay').show();
    $('.btn').show();
    timer.stop();
    timer.reset();
    timer.start();
}

//Display scoreboard when game ends
else
{
    $('#quizContent').hide();
    $('#question').hide();
    $("#scoreboard").html("<div>"+ "Game Over! <br> Your Score" +"</div>"+
    "<div>"+ "Correct Guesses: " + gameScores.answeredCorrect +"</div>" + 
    "<div>"+ "Wrong Guesses: " + gameScores.answeredWrong +"</div>" +
    "<div>"+ "Missed Questions: " + gameScores.missed +"</div>" 
    );

    // audio = new Audio("assets/TaDa.mp3");
    //     audio.play();

    timer.stop();
    $('#timerDisplay').html('00:00');

    $("#reset").show();

    $('.resetme').click(function()
    {
        $('#quizContent').hide();
        resetVariables();
        displayQuestion();
        $('#question').show();
        $('.btn').show();
        $('#timerDisplay').show();
        timer.stop();
        timer.reset();
        timer.start();

    });
    
}


}
//Timer Countdown 

var timer = 
{
time:10,

reset: function()
{
    timer.time = 10;
    
    //change the "display" div to "00:05"
    $('#timerDisplay').html('Timer: ' + '00:10');

},

start: function()
{
    //Use setInterval to start the count here
    counter = setInterval(timer.count, 1000);
},

stop: function()
{
    //Use clearInterval to stop the count here
    clearInterval(counter);
},

 count: function()
{   //increment time by 1, remember we can't use "this" here
    timer.time--;
     //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
    var converted = timer.timeConverter(timer.time);
     //Use the variable you just created to show the converted time in the "display" div
    $('#timerDisplay').html('Timer: ' + converted);

    if (timer.time == 0)
    {
        //Display correct answer if timer runs out and question is missed
        $('#quizContent').show(); //show the correct gif div
        $('#timerDisplay').hide();
        $('.btn').hide();
        $('#quizContent').html("<h2><p>Time's up! <br> The correct answer was: <br>" + QuestionsArray[indexQuestion].answer + "</p></h2>");
        gameScores.missed++;

        setTimeout(nextQuestion, 2000);
    }

},

 timeConverter: function(t)
{ //This function is done. You do not need to touch it. It takes the current time in seconds and converts it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t/60);
    var seconds = t - (minutes * 60);
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    if (minutes === 0){
        minutes = "00";
    } else if (minutes < 10){
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
}

};

//Display Question

function displayQuestion()
{
    $("#question").html("<h3>" + QuestionsArray[indexQuestion].question + "</h3>");
    $("#button0").text(QuestionsArray[indexQuestion].choices[0]);
    $("#button1").text(QuestionsArray[indexQuestion].choices[1]);
    $("#button2").text(QuestionsArray[indexQuestion].choices[2]);
    $("#button3").text(QuestionsArray[indexQuestion].choices[3]);

}
//Start game on button press


$(document).ready(function()


{	//hide all until start button is pressed
$('#timerDisplay').hide();
$('.btn').hide();
$("#reset").hide();

$('#startme').on("click", function() 

    {
        displayQuestion();
        timer.reset();
        timer.start();
        //show timer and buttons
        $('#timerDisplay').show();
        $('.btn').show();
        $("#reset").hide();
        $("#startme").hide();
    });



//User input check answer
$('.btn').click(function() 
{


if (indexQuestion < QuestionsArray.length)
{
    var userButtonValue = ($(this).attr("data-value"));
    console.log(userButtonValue);
    //Check for win
    if (userButtonValue == QuestionsArray[indexQuestion].correctAnswer)
    {
        
        $('#quizContent').html("<h2><p>Correct!</p></h2><img src='" + QuestionsArray[indexQuestion].correctImg + "' height = 150 width = 150 alt='correct'>");
        gameScores.answeredCorrect ++;//increment score
        console.log("correct answer " + gameScores.answeredCorrect);
        
        //reset timer
        timer.stop();
        timer.reset();						
    

    }
    //Else loss
    else
    {
    
        $('#quizContent').html("<h2><p>Wrong! <br> The correct answer was: <br>" + QuestionsArray[indexQuestion].answer + "</p></h2>");
        gameScores.answeredWrong ++;
        console.log("wrong answer " + gameScores.answeredWrong);

        //reset timer
        timer.stop();
        timer.reset();	


    }

    $('#quizContent').show(); //show the correct img div
    $('#timerDisplay').hide();
    $('.btn').hide();

    setTimeout(nextQuestion, 3000);
    
}
});


// end document.ready function
});