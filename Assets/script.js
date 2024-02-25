let timeInterval;
let currentIndex = 0;
let numCorrect = 0;
let startingTime = 2;
let timer = startingTime * 60;
let questions = [
    {
        text: "What does the FEHU rune represent?",
        choices: ['Strength, Energy, Courage, Vitality, Health, Motivation', 'Communication, Wisdom, Knowledge, Signals, Messages, Writing, Speaking, Singing, Listening, Expression, Intuition', 'Boundaries, Limitations, Defense, Protection, Challenge, Balance', 'Abundance, Prosperity, Wealth, New Beginnings'],
        correct: 'Abundance, Prosperity, Wealth, New Beginnings'
    },
    {
        text: "What does the URUZ rune represent?",
        choices: ['Communication, Wisdom, Knowledge, Signals, Messages, Writing, Speaking, Singing, Listening, Expression, Intuition', 'Abundance, Prosperity, Wealth, New Beginnings', 'Boundaries, Limitations, Defense, Protection, Challenge, Balance', 'Strength, Energy, Courage, Vitality, Health, Motivation'],
        correct: 'Strength, Energy, Courage, Vitality, Health, Motivation'
    },
    {
        text: "What does the THURISAZ rune represent?",
        choices: ['Communication, Wisdom, Knowledge, Signals, Messages, Writing, Speaking, Singing, Listening, Expression, Intuition', 'Abundance, Prosperity, Wealth, New Beginnings', 'Boundaries, Limitations, Defense, Protection, Challenge, Balance', 'Strength, Energy, Courage, Vitality, Health, Motivation'],
        correct: 'Boundaries, Limitations, Defense, Protection, Challenge, Balance'
    },
    {
        text: "What does the ANSUZ rune represent?",
        choices: ['Communication, Wisdom, Knowledge, Signals, Messages, Writing, Speaking, Singing, Listening, Expression, Intuition', 'Boundaries, Limitations, Defense, Protection, Challenge, Balance', 'Strength, Energy, Courage, Vitality, Health, Motivation', 'Abundance, Prosperity, Wealth, New Beginnings'],
        correct: 'Communication, Wisdom, Knowledge, Signals, Messages, Writing, Speaking, Singing, Listening, Expression, Intuition'
    }
];

function display() {
    // h2 with text
    document.getElementById('question').textContent = questions[currentIndex].text
    // replace all button text
    document.getElementById('btn1').textContent = questions[currentIndex].choices[0]
    document.getElementById('btn2').textContent = questions[currentIndex].choices[1]
    document.getElementById('btn3').textContent = questions[currentIndex].choices[2]
    document.getElementById('btn4').textContent = questions[currentIndex].choices[3]
};

const countdownEl = document.getElementById('countdown');

function updateCountdown () {
    const minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    seconds = seconds < 10 ? '0' + seconds: seconds;
    countdownEl.innerHTML = `Time Remaining ${minutes}:${seconds}`;
    timer--;
    if (timer <= 0) {
        clearInterval(timeInterval);
        document.getElementById('end-card').classList.remove('hide');
        document.getElementById('question-card').classList.add('hide');
        document.getElementById('score').innerHTML = `Correct Answers: ${numCorrect}/3`;
    };
}

function next() {
    // add 1 to currentindex
    currentIndex++
    if (currentIndex < 4) {
        display()
    } else {
        document.getElementById('end-card').classList.remove('hide');
        document.getElementById('question-card').classList.add('hide');
        document.getElementById('score').innerHTML = `Correct Answers: ${numCorrect}/4`;
    };
};

function start() {
    // unhide second card
    document.getElementById('question-card').classList.remove('hide');
    // hide first card
    document.getElementById('start-card').classList.add('hide');
    display();
};

function retake() {
    document.getElementById('end-card').classList.add('hide');
    document.getElementById('start-card').classList.remove('hide');
    currentIndex = 0;
    numCorrect = 0;
    clearInterval(timeInterval);
    timer = startingTime * 60;
};

function startcounter() {
    timeInterval = setInterval(updateCountdown, 1000)
}

document.getElementById("start").addEventListener('click', function () {
    startcounter();
    start();
});

var btns = document.querySelectorAll(".btn");
btns.forEach( btn => btn.addEventListener('click', function () {
    var selected = this.textContent;
    var answer = questions[currentIndex].correct;
    if (selected === answer) {
        numCorrect++;
    } else {
        timer -= 10;
        if (timer <= 0) {
            timer = 0;
        };
    }
    next();
}));

document.getElementById("end").addEventListener('click', retake);
