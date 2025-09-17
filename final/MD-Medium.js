// Question Bank
var questionBank = [
    {
        question: 'Which Android component is used for background tasks?',
        option: ['Activity', 'BroadcastReceiver', 'Service', 'ContentProvider'],
        answer: 'Service'
    },
    {
        question: 'What does ANR stand for?',
        option: ['Android Not Ready', 'App Never Responding', 'Application Not Responding', 'Another Native Runtime'],
        answer: 'Application Not Responding'
    },
    {
        question: 'What is LiveData used for?',
        option: ['Static UI updates', 'UI animations', 'Data-binding with lifecycle', 'Accessing sensors'],
        answer: 'Data-binding with lifecycle'
    },
    {
        question: 'Which class is used to store app preferences?',
        option: ['SQLiteOpenHelper', 'PreferenceManager', 'SharedPreferences', 'AppSettings'],
        answer: 'SharedPreferences'
    },
    {
        question: 'Which of the following is a lifecycle method of Fragment?',
        option: ['onInit()', 'onLoad()', 'onCreateView()', 'onDraw()'],
        answer: 'onCreateView()'
    },
    {
        question: 'Which architecture pattern is recommended in Android?',
        option: ['MVC', 'MVVM', 'MVP', 'SPA'],
        answer: 'MVVM'
    },
    {
        question: 'Which annotation is used to bind views in Jetpack?',
        option: ['@BindView', '@Inject', '@Layout', '@ViewModel'],
        answer: '@BindView'
    },
    {
        question: 'Which is NOT part of Android Jetpack?',
        option: ['LiveData', 'ViewModel', 'Retrofit', 'Navigation'],
        answer: 'Retrofit'
    },
    {
        question: 'Which library is commonly used for image loading?',
        option: ['Glide', 'Retrofit', 'Room', 'Dagger'],
        answer: 'Glide'
    },
    {
        question: 'Which Android version introduced Jetpack Compose?',
        option: ['Android 10', 'Android 11', 'Android 12', 'Android 13'],
        answer: 'Android 11'
    },
    {
        question: 'What is ViewModel used for?',
        option: ['UI only', 'Store UI-related data', 'Database access', 'Networking'],
        answer: 'Store UI-related data'
    },
    {
        question: 'Which of these is a popular dependency injection framework?',
        option: ['Room', 'Glide', 'Dagger', 'LiveData'],
        answer: 'Dagger'
    },
    {
        question: 'What does Room provide?',
        option: ['UI elements', 'Data storage', 'Networking', 'Database abstraction'],
        answer: 'Database abstraction'
    },
    {
        question: 'Which library is used for HTTP network calls?',
        option: ['Glide', 'Retrofit', 'LiveData', 'Navigation'],
        answer: 'Retrofit'
    },
    {
        question: 'What is the main thread in Android also called?',
        option: ['Service thread', 'UI thread', 'Intent thread', 'Worker thread'],
        answer: 'UI thread'
    }
];

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
    window.location.href = "MD-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
