//Question Bank

var questionBank = [
    {
        question: 'Which data structure uses FIFO?',
        option: ['Stack', 'Queue', 'Array', 'Tree'],
        answer: 'Queue'
    },
    {
        question: 'Which keyword is used to define a constant in C?',
        option: ['let', 'const', 'define', '#define'],
        answer: '#define'
    },
    {
        question: 'Which sorting algorithm is the fastest on average?',
        option: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Selection Sort'],
        answer: 'Quick Sort'
    },
    {
        question: 'What is the purpose of the return statement?',
        option: ['To stop the program', 'To jump to main()', 'To exit from a function and optionally return a value', 'To call another function'],
        answer: 'To exit from a function and optionally return a value'
    },
    {
        question: 'Which of the following is a non-primitive data type?',
        option: ['int', 'float', 'array', 'char'],
        answer: 'array'
    },
    {
        question: 'Which memory is volatile?',
        option: ['Hard disk', 'SSD', 'RAM', 'ROM'],
        answer: 'RAM'
    },
    {
        question: 'What does the stack data structure follow?',
        option: ['FIFO', 'LIFO', 'FILO', 'LILO'],
        answer: 'LIFO'
    },
    {
        question: 'Which of the following is used to dynamically allocate memory?',
        option: ['malloc', 'int', 'return', 'alloc'],
        answer: 'malloc'
    },
    {
        question: 'What is the main difference between array and linked list?',
        option: ['Memory size', 'Data type', 'Storage mechanism', 'Execution time'],
        answer: 'Storage mechanism'
    },
    {
        question: 'Which of the following is an example of recursion?',
        option: ['Loop', 'Function calling itself', 'Goto', 'Iteration'],
        answer: 'Function calling itself'
    },
    {
        question: 'What is the size of an int on a 32-bit system?',
        option: ['2 bytes', '4 bytes', '8 bytes', '1 byte'],
        answer: '4 bytes'
    },
    {
        question: 'Which of the following is a valid identifier?',
        option: ['int', '2data', 'data_2', 'data-2'],
        answer: 'data_2'
    },
    {
        question: 'Which of the following is NOT an access modifier in OOP?',
        option: ['public', 'private', 'protected', 'external'],
        answer: 'external'
    },
    {
        question: 'Which logical operator returns true if both conditions are false?',
        option: ['AND', 'OR', 'NOT', 'NOR'],
        answer: 'NOR'
    },
    {
        question: 'Which function is used to allocate memory in C++?',
        option: ['malloc()', 'calloc()', 'new', 'alloc()'],
        answer: 'new'
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
    window.location.href = "CP&CSF-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
