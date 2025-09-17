//Question Bank

var questionBank = [
    {
        question: 'What does the "use strict" directive do in JavaScript?',
        option: [
            'Enables modern mode',
            'Restricts unsafe actions',
            'Disables old syntax',
            'All of the above'
        ],
        answer: 'Restricts unsafe actions'
    },
    {
        question: 'Which of the following is NOT a valid HTML5 input type?',
        option: ['email', 'datetime-local', 'password', 'numberic'],
        answer: 'numberic'
    },
    {
        question: 'In CSS Grid, what does "fr" stand for?',
        option: ['fraction', 'frame', 'free', 'fixed ratio'],
        answer: 'fraction'
    },
    {
        question: 'Which JavaScript method is used to prevent event bubbling?',
        option: ['stopPropagation()', 'preventDefault()', 'stopBubble()', 'cancelBubble()'],
        answer: 'stopPropagation()'
    },
    {
        question: 'What is the output of typeof NaN in JavaScript?',
        option: ['number', 'NaN', 'undefined', 'object'],
        answer: 'number'
    },
    {
        question: 'Which attribute is used in HTML5 to make a field mandatory?',
        option: ['required', 'mandatory', 'validate', 'compulsory'],
        answer: 'required'
    },
    {
        question: 'What is the purpose of the "aria" attributes in HTML?',
        option: [
            'Accessibility',
            'Form validation',
            'Styling',
            'Animations'
        ],
        answer: 'Accessibility'
    },
    {
        question: 'How do you define a JavaScript class?',
        option: ['class MyClass {}', 'function MyClass()', 'let MyClass = class {}', 'Both A and C'],
        answer: 'Both A and C'
    },
    {
        question: 'Which CSS function is used to apply transformations?',
        option: ['transform()', 'translate()', 'skew()', 'rotate()'],
        answer: 'transform()'
    },
    {
        question: 'Which HTTP status code means "Unauthorized"?',
        option: ['401', '403', '404', '500'],
        answer: '401'
    },
    {
        question: 'What does the Fetch API return?',
        option: ['Promise', 'Object', 'Array', 'Function'],
        answer: 'Promise'
    },
    {
        question: 'Which HTML element is used for scalable vector graphics?',
        option: ['&lt;svg&gt;', '&lt;canvas&gt;', '&lt;vector&gt;', '&lt;shape&gt;'],
        answer: '&lt;svg&gt;'
    },
    {
        question: 'What is the result of "0 === false" in JavaScript?',
        option: ['true', 'false', 'undefined', 'error'],
        answer: 'false'
    },
    {
        question: 'Which JavaScript method merges two or more arrays?',
        option: ['merge()', 'concat()', 'push()', 'splice()'],
        answer: 'concat()'
    },
    {
        question: 'Which CSS property creates a flex container?',
        option: ['display: flex;', 'flex: true;', 'container: flex;', 'layout: flex;'],
        answer: 'display: flex;'
    },
    {
        question: 'What is event delegation in JavaScript?',
        option: [
            'Delegating events to server',
            'Attaching event to parent element',
            'Blocking events',
            'Handling all events together'
        ],
        answer: 'Attaching event to parent element'
    },
    {
        question: 'Which API is used to build Progressive Web Apps?',
        option: ['Service Workers', 'GraphQL', 'Socket.IO', 'WebRTC'],
        answer: 'Service Workers'
    },
    {
        question: 'Which HTTP method is idempotent?',
        option: ['GET', 'POST', 'PATCH', 'CONNECT'],
        answer: 'GET'
    },
    {
        question: 'What does async/await simplify in JavaScript?',
        option: ['DOM manipulation', 'Asynchronous code', 'CSS animations', 'Error handling'],
        answer: 'Asynchronous code'
    },
    {
        question: 'Which object stores client-side data in key-value pairs with no expiration?',
        option: ['localStorage', 'sessionStorage', 'cookie', 'cache'],
        answer: 'localStorage'
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
