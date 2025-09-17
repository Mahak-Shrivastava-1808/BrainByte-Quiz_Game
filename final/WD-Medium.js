//Question Bank

var questionBank = [
    {
        question: 'Which HTTP method is used to update existing data?',
        option: ['GET', 'POST', 'PUT', 'DELETE'],
        answer: 'PUT'
    },
    {
        question: 'Which tag is used to embed JavaScript in HTML?',
        option: ['&lt;script&gt;', '&lt;js&gt;', '&lt;javascript&gt;', '&lt;code&gt;'],
        answer: '&lt;script&gt;'
    },
    {
        question: 'What is the default method of a form in HTML?',
        option: ['GET', 'POST', 'PUT', 'DELETE'],
        answer: 'GET'
    },
    {
        question: 'Which property is used to change the font size in CSS?',
        option: ['text-size', 'font-size', 'font-style', 'text-style'],
        answer: 'font-size'
    },
    {
        question: 'What does the "this" keyword refer to in JavaScript?',
        option: ['Current object', 'Global object', 'Previous object', 'None'],
        answer: 'Current object'
    },
    {
        question: 'What is the correct way to write an IF statement in JavaScript?',
        option: ['if i = 5 then', 'if i == 5', 'if (i == 5)', 'if i = 5'],
        answer: 'if (i == 5)'
    },
    {
        question: 'Which CSS unit is relative to the parent element?',
        option: ['px', 'em', '%', 'rem'],
        answer: 'em'
    },
    {
        question: 'Which object is used to perform AJAX requests in vanilla JS?',
        option: ['XMLHttpRequest', 'AJAXObject', 'AjaxRequest', 'HttpObject'],
        answer: 'XMLHttpRequest'
    },
    {
        question: 'What does the "defer" attribute do in a <script> tag?',
        option: [
            'Loads script after page load',
            'Delays execution until DOM is ready',
            'Executes immediately',
            'Prevents caching'
        ],
        answer: 'Delays execution until DOM is ready'
    },
    {
        question: 'Which HTML tag is used to play a video file?',
        option: ['&lt;media&gt;', '&lt;video&gt;', '&lt;movie&gt;', '&lt;play&gt;'],
        answer: '&lt;video&gt;'
    },
    {
        question: 'How do you select all elements with class "box" in CSS?',
        option: ['#box', '.box', 'box', '*box'],
        answer: '.box'
    },
    {
        question: 'Which CSS property controls the stacking order of elements?',
        option: ['position', 'z-index', 'display', 'stack'],
        answer: 'z-index'
    },
    {
        question: 'Which HTML tag is used for a progress bar?',
        option: ['&lt;bar&gt;', '&lt;progress&gt;', '&lt;range&gt;', '&lt;status&gt;'],
        answer: '&lt;progress&gt;'
    },
    {
        question: 'Which method removes the last element from an array in JS?',
        option: ['pop()', 'shift()', 'splice()', 'remove()'],
        answer: 'pop()'
    },
    {
        question: 'What is the output of 2 + "2" in JavaScript?',
        option: ['4', '22', '"4"', 'NaN'],
        answer: '22'
    },
]

// DOM Elements
var question = document.getElementById('question');
var quizContainer = document.getElementById('quiz-container');
var scoreboard = document.getElementById('scoreboard');
var option0 = document.getElementById('option0');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var next = document.querySelector('.next');
var points = document.getElementById('score');
var span = document.querySelectorAll('span');
var timeCount = document.querySelector(".timer .time_sec");
var timeText = document.querySelector(".timer .time_left");

var i = 0;
var score = 0;
var counter;
var time = 10;
var options = [option0, option1, option2, option3];
var answered = false;

// Display Question
function displayQuestion() {
    resetOptions();
    question.innerHTML = 'Q.' + (i + 1) + ' ' + questionBank[i].question;
    option0.innerHTML = questionBank[i].option[0];
    option1.innerHTML = questionBank[i].option[1];
    option2.innerHTML = questionBank[i].option[2];
    option3.innerHTML = questionBank[i].option[3];
    document.getElementById("stat").innerHTML = "Question " + (i + 1) + " of " + questionBank.length;
    answered = false;
    startTimer(10);
}

// Reset Options for new question
function resetOptions() {
    options.forEach(opt => {
        opt.parentElement.style.background = 'lightblue';
        opt.style.background = 'transparent';
        opt.style.color = 'black';
        opt.style.pointerEvents = 'auto';
    });
}

// Answer clicked
function calcScore(e) {
    if (answered) return; // prevent multiple clicks
    answered = true;
    clearInterval(counter);

    let selected = e.innerHTML;
    let correct = questionBank[i].answer;

    // Disable clicking after one attempt
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selected === correct) {
        e.style.background = 'limegreen';
        score++;
    } else {
        e.style.background = 'tomato';
        // Show correct answer
        options.forEach(opt => {
            if (opt.innerHTML === correct) {
                opt.style.background = 'limegreen';
            }
        });
    }
}

// Start Timer
function startTimer(t) {
    clearInterval(counter);
    time = t;
    timeCount.textContent = t < 10 ? '0' + t : t;
    timeText.textContent = 'Time left :';

    counter = setInterval(() => {
        time--;
        timeCount.textContent = time < 10 ? '0' + time : time;

        if (time <= 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off :";
            autoShowAnswer();
        }
    }, 1000);
}

// Time ends - auto show correct answer
function autoShowAnswer() {
    answered = true;
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.innerHTML === questionBank[i].answer) {
            opt.style.background = 'limegreen';
        }
    });
}

// Show next question
function nextQuestion() {
    if (i < questionBank.length - 1) {
        i++;
        displayQuestion();
    } else {
        quizContainer.style.display = 'none';
        scoreboard.style.display = 'block';
        points.innerHTML = score + '/' + questionBank.length;
    }
}

// Check Answers button
function checkAnswer() {
    clearInterval(counter);
    var answerBank = document.getElementById('answerBank');
    var answers = document.getElementById('answers');
    answerBank.style.display = 'block';
    scoreboard.style.display = 'none';

    answers.innerHTML = "";
    questionBank.forEach(q => {
        var list = document.createElement('li');
        list.innerHTML = q.answer;
        answers.appendChild(list);
    });
}

// Back to quiz (reload)
function backToQuiz() {
    window.location.href = "WD-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
