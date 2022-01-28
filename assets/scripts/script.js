// Best Practices----Research Quiz---
// https://www.sitepoint.com/simple-javascript-quiz/

// Questions
var myQuestions = [
  {
    question: "Commonly used data types DO NOT include:_____.",

    answers: {
      1: "strings",
      2: "booleans",
      3: "alerts",
      4: "numbers",
    },
    correctAnswer: 3,
  },
  {
    question:
      "The condition in an IF else statement is enclosed within:_______.",
    answers: {
      1: "quotes",
      2: "curly brackets",
      3: "parenthesis",
      4: "square brackets",
    },
    correctAnswer: 3,
  },
  {
    question: "Arrays in Javascript can be used to store:_________.",
    answers: {
      1: "numbers and strings",
      2: "other arrays",
      3: "booleans",
      4: "all of the above",
    },
    correctAnswer: 4,
  },
  {
    question:
      "String values must be enclosed within:_________ when being assigned to variables.",
    answers: {
      1: "quotes",
      2: "camel case",
      3: "comma",
      4: "question marks",
    },
    correctAnswer: 1,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is :_________?",
    answers: {
      1: "javascript",
      2: "terminal/bash",
      3: "for loops",
      4: "console.log",
    },
    correctAnswer: 4,
  },
];

var startDiv = document.querySelector("#start");
var quizContainer = document.querySelector("#quiz");
var resultsContainer = document.querySelector("#results");
var finalScore = document.querySelector("#finalScore");
var scoreSummary = document.querySelector("#summary");
var submitButton;
var submitInitials = document.querySelector("#submitInitialBtn");
var initialsInput = document.querySelector("#initialInput");
var startButton = document.querySelector("#start-quiz-button");
var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#timer");
var clearScoresbtn = document.querySelector("#clearHighScoreBtn");
var goBackBtn = document.querySelector("#goBackBtn");
var highscoreContainer = document.querySelector("#listOfHighScores");
var highscoreSection = document.querySelector("#highScoreSection");
var scoresListEl = document.querySelector(".score-list");
var scoresCleared = document.querySelector("#score-cleard");

var viewHighscore = document.querySelector("#viewHighScore");
var slides;
var currentSlide = 0;
var numCorrect = 0;
var calcScore;
var scoreIdCounter = 1;
var scores = [];
var counter;
var timeValue;

// Start the Quiz
function startQuiz() {}

// New Quiz Generate
function newQuiz() {}

// Stores Highscores
function storeHighscore() {}

// Show Highscores 
function showHighscores() {}


viewHighscore.addEventListener("click", showHighscores);
submitInitials.addEventListener("click", storeHighscore);
startButton.addEventListener("click", startQuiz);
goBackBtn.addEventListener("click", newQuiz);
