// Question Bank
var questionBank = [
    {
        question: 'Which Jetpack component handles navigation between fragments?',
        option: ['LiveData', 'Navigation', 'RecyclerView', 'Intent'],
        answer: 'Navigation'
    },
    {
        question: 'Which annotation in Dagger defines a scope?',
        option: ['@Inject', '@Provides', '@Module', '@Singleton'],
        answer: '@Singleton'
    },
    {
        question: 'What is the purpose of WorkManager in Android?',
        option: ['Manage UI states', 'Schedule background tasks', 'Handle images', 'Start activities'],
        answer: 'Schedule background tasks'
    },
    {
        question: 'Which Gradle file manages app dependencies?',
        option: ['settings.gradle', 'gradle-wrapper.properties', 'build.gradle (Module)', 'AndroidManifest.xml'],
        answer: 'build.gradle (Module)'
    },
    {
        question: 'What does ProGuard do?',
        option: ['Compress images', 'Secure passwords', 'Obfuscate code', 'Generate APK'],
        answer: 'Obfuscate code'
    },
    {
        question: 'What is Data Binding used for in Android?',
        option: ['Manage network', 'Design layout', 'Bind UI and data', 'Navigate between screens'],
        answer: 'Bind UI and data'
    },
    {
        question: 'Which thread should network operations run on?',
        option: ['UI thread', 'Main thread', 'Background thread', 'Handler thread'],
        answer: 'Background thread'
    },
    {
        question: 'What is the purpose of the Hilt library?',
        option: ['Networking', 'Image loading', 'Dependency injection', 'UI design'],
        answer: 'Dependency injection'
    },
    {
        question: 'What is the use of ViewBinding in Android?',
        option: ['Bind view to ViewModel', 'Avoid findViewById', 'Inflate layouts', 'Optimize performance'],
        answer: 'Avoid findViewById'
    },
    {
        question: 'Which function is used to define composables in Jetpack Compose?',
        option: ['@Composable', '@Layout', '@Jetpack', '@UI'],
        answer: '@Composable'
    },
    {
        question: 'Which lifecycle method is called when fragment becomes visible?',
        option: ['onStart()', 'onCreateView()', 'onAttach()', 'onResume()'],
        answer: 'onStart()'
    },
    {
        question: 'Which design pattern is followed by Jetpack Compose?',
        option: ['MVC', 'MVVM', 'Declarative UI', 'MVP'],
        answer: 'Declarative UI'
    },
    {
        question: 'Which architecture component is responsible for managing UI-related data?',
        option: ['Repository', 'Service', 'ViewModel', 'Controller'],
        answer: 'ViewModel'
    },
    {
        question: 'What is the role of Repository in MVVM?',
        option: ['Store preferences', 'Manage UI', 'Handle business logic & data', 'Create layouts'],
        answer: 'Handle business logic & data'
    },
    {
        question: 'Which tool can be used for memory leak detection?',
        option: ['Logcat', 'Lint', 'LeakCanary', 'ADB'],
        answer: 'LeakCanary'
    },
    {
        question: 'Which file declares all used permissions?',
        option: ['build.gradle', 'AndroidManifest.xml', 'proguard-rules.pro', 'MainActivity.java'],
        answer: 'AndroidManifest.xml'
    },
    {
        question: 'What is the purpose of Coroutine in Kotlin?',
        option: ['Blocking tasks', 'Handle UI', 'Asynchronous programming', 'Create layouts'],
        answer: 'Asynchronous programming'
    },
    {
        question: 'Which function launches a coroutine in ViewModel?',
        option: ['launch()', 'async()', 'viewModelScope.launch()', 'runBlocking()'],
        answer: 'viewModelScope.launch()'
    },
    {
        question: 'Which operator is used to combine flows in Kotlin?',
        option: ['map', 'zip', 'merge', 'combine'],
        answer: 'combine'
    },
    {
        question: 'Which of these is a cold stream in Kotlin Flow?',
        option: ['LiveData', 'StateFlow', 'SharedFlow', 'Flow'],
        answer: 'Flow'
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
