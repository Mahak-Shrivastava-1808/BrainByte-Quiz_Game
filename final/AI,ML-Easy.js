//Question Bank

var questionBank = [
    {
        question: 'What does AI stand for?',
        option: ['Artificial Insight', 'Automated Intelligence', 'Artificial Intelligence', 'Advanced Interface'],
        answer: 'Artificial Intelligence'
    },
    {
        question: 'Which of the following is a subset of AI?',
        option: ['Big Data', 'Cloud Computing', 'Machine Learning', 'Cyber Security'],
        answer: 'Machine Learning'
    },
    {
        question: 'Which programming language is commonly used in ML?',
        option: ['HTML', 'Python', 'CSS', 'SQL'],
        answer: 'Python'
    },
    {
        question: 'What is supervised learning?',
        option: ['Learning without data', 'Learning from labeled data', 'Learning in real-time', 'Learning by exploration'],
        answer: 'Learning from labeled data'
    },
    {
        question: 'Which algorithm is used for classification?',
        option: ['K-Means', 'Linear Regression', 'Decision Tree', 'Apriori'],
        answer: 'Decision Tree'
    },
    {
        question: 'Which of these is a type of neural network?',
        option: ['CNN', 'HDD', 'RAM', 'BIOS'],
        answer: 'CNN'
    },
    {
        question: 'What does ML stand for?',
        option: ['Machine Level', 'Machine Learning', 'Meta Language', 'Model Learning'],
        answer: 'Machine Learning'
    },
    {
        question: 'Which library is used for ML in Python?',
        option: ['NumPy', 'React', 'TensorFlow', 'Bootstrap'],
        answer: 'TensorFlow'
    },
    {
        question: 'What is an example of supervised learning?',
        option: ['K-Means Clustering', 'Linear Regression', 'Apriori', 'DBSCAN'],
        answer: 'Linear Regression'
    },
    {
        question: 'Which algorithm is used in spam email detection?',
        option: ['Random Forest', 'SVM', 'Naive Bayes', 'Linear Regression'],
        answer: 'Naive Bayes'
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

// isse user Level Selection Page pe chala jayega(reload)
function backToQuiz() {
    window.location.href = "AI,ML-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
