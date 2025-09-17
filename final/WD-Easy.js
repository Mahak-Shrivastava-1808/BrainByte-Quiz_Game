//Question Bank

var questionBank = [
    {
        question: 'What does HTML stand for?',
        option: [
            'Hyper Trainer Marking Language',
            'Hyper Text Markup Language',
            'Hyper Text Marketing Language',
            'Hyperlink and Text Markup Language'
        ],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: 'Which HTML tag is used to display a picture?',
        option: ['&lt;image&gt;', '&lt;img&gt;', '&lt;pic&gt;', '&lt;src&gt;'],
        answer: '&lt;img&gt;'
    },
    {
        question: 'What does CSS stand for?',
        option: [
            'Cascading Style Sheets',
            'Colorful Style Sheets',
            'Computer Style Sheets',
            'Creative Style Sheets'
        ],
        answer: 'Cascading Style Sheets'
    },
    {
        question: 'Which HTML tag is used for a line break?',
        option: ['&lt;break&gt;', '&lt;br&gt;', '&lt;lb&gt;', '&lt;ln&gt;'],
        answer: '&lt;br&gt;'
    },
    {
        question: 'Which attribute is used to provide a tooltip in HTML?',
        option: ['tooltip', 'alt', 'title', 'hover'],
        answer: 'title'
    },
    {
        question: 'How do you apply an external CSS file?',
        option: [
            '&lt;css src="style.css"&gt;',
            '&lt;style src="style.css"&gt;',
            '&lt;link rel="stylesheet" href="style.css"&gt;',
            '&lt;style href="style.css"&gt;'
        ],
        answer: '&lt;link rel="stylesheet" href="style.css"&gt;'
    },
    {
        question: 'Which tag is used to define a list item?',
        option: ['&lt;li&gt;', '&lt;ul&gt;', '&lt;list&gt;', '&lt;item&gt;'],
        answer: '&lt;li&gt;'
    },
    {
        question: 'Which input type is used for entering a password?',
        option: ['text', 'password', 'secure', 'hidden'],
        answer: 'password'
    },
    {
        question: 'How do you make text bold in HTML?',
        option: ['&lt;strong&gt;', '&lt;b&gt;', '&lt;bold&gt;', 'Both A and B'],
        answer: 'Both A and B'
    },
    {
        question: 'What is the correct syntax to include JavaScript?',
        option: [
            '&lt;script src="script.js"&gt;',
            '&lt;js src="script.js"&gt;',
            '&lt;link src="script.js"&gt;',
            '&lt;code src="script.js"&gt;'
        ],
        answer: '&lt;script src="script.js"&gt;'
    }
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
