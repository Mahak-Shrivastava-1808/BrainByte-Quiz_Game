//Question Bank

var questionBank = [
    {
        question: 'What is the purpose of dropout in neural networks?',
        option: ['Speed up training', 'Prevent vanishing gradient', 'Regularization', 'Improve accuracy directly'],
        answer: 'Regularization'
    },
    {
        question: 'Which of the following uses attention mechanisms?',
        option: ['LSTM', 'Transformer', 'Autoencoder', 'KNN'],
        answer: 'Transformer'
    },
    {
        question: 'Which algorithm is used in anomaly detection?',
        option: ['DBSCAN', 'Logistic Regression', 'KNN', 'Naive Bayes'],
        answer: 'DBSCAN'
    },
    {
        question: 'Which is not a feature of LSTM networks?',
        option: ['Memory Cell', 'Forget Gate', 'Pooling Layer', 'Output Gate'],
        answer: 'Pooling Layer'
    },
    {
        question: 'Which loss function is best for binary classification?',
        option: ['MSE', 'Categorical Crossentropy', 'Binary Crossentropy', 'Hinge Loss'],
        answer: 'Binary Crossentropy'
    },
    {
        question: 'What is the exploding gradient problem?',
        option: ['Loss becoming zero', 'Too high gradients', 'Slow learning', 'Too many parameters'],
        answer: 'Too high gradients'
    },
    {
        question: 'What is gradient clipping used for?',
        option: ['Speed up training', 'Reduce parameters', 'Fix exploding gradients', 'Improve accuracy'],
        answer: 'Fix exploding gradients'
    },
    {
        question: 'Which technique is used to convert images to feature vectors?',
        option: ['Bag of Words', 'CNN', 'RNN', 'Naive Bayes'],
        answer: 'CNN'
    },
    {
        question: 'Which of the following is used in GANs?',
        option: ['Encoder', 'Discriminator', 'Classifier', 'SVM'],
        answer: 'Discriminator'
    },
    {
        question: 'Which layer helps in reducing overfitting in CNNs?',
        option: ['Fully Connected', 'Dropout', 'Convolutional', 'Pooling'],
        answer: 'Dropout'
    },
    {
        question: 'Which is an unsupervised deep learning model?',
        option: ['Autoencoder', 'LSTM', 'CNN', 'SVM'],
        answer: 'Autoencoder'
    },
    {
        question: 'What does a high bias mean?',
        option: ['Model is too complex', 'Model underfits', 'Model overfits', 'Model generalizes well'],
        answer: 'Model underfits'
    },
    {
        question: 'Which model is used for sequence-to-sequence tasks?',
        option: ['CNN', 'GAN', 'Transformer', 'KNN'],
        answer: 'Transformer'
    },
    {
        question: 'What is the purpose of a softmax layer?',
        option: ['To normalize inputs', 'To compute loss', 'To convert logits into probabilities', 'To increase accuracy'],
        answer: 'To convert logits into probabilities'
    },
    {
        question: 'Which of the following is an activation function?',
        option: ['MSE', 'ReLU', 'RMSProp', 'Dropout'],
        answer: 'ReLU'
    },
    {
        question: 'Which one is NOT a type of gradient descent?',
        option: ['Batch', 'Stochastic', 'Mini-batch', 'Random'],
        answer: 'Random'
    },
    {
        question: 'Which optimizer combines momentum and RMSProp?',
        option: ['SGD', 'Adam', 'Adagrad', 'Nadam'],
        answer: 'Adam'
    },
    {
        question: 'Which network is ideal for text generation?',
        option: ['CNN', 'LSTM', 'GAN', 'SVM'],
        answer: 'LSTM'
    },
    {
        question: 'Which of these is a recurrent architecture?',
        option: ['RNN', 'CNN', 'KNN', 'SVM'],
        answer: 'RNN'
    },
    {
        question: 'What does BERT stand for?',
        option: ['Bidirectional Encoder Representations from Transformers', 'Binary Encoder for Real Text', 'Bi-Energy Recurrent Transformer', 'Basic Entity Representation Text'],
        answer: 'Bidirectional Encoder Representations from Transformers'
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
    window.location.href = "AI,ML-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
