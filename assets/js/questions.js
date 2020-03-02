//Questions and and Answer sets
var questions = [
    //Question 1
{   question:' What is JavaScript?',
    answers: [
    {   text: 'a programming language', correct: true},
    {   text: 'a gaming console', correct: false},
    {   text: 'a function in Java', correct: false},
    {   text: 'None of the choices', correct: false}
]},
    //Question 2
{   question:' What is HTML?',
    answers: [
    {   text: 'HyperText Markup Language', correct: true},
    {   text: 'Human Technology Merging Lovers', correct: false},
    {   text: 'Hot Topic Must Leave', correct: false},
    {   text: 'None of the choices', correct: false}
]},
    //Question 3
{   question:' What is CSS?',
    answers: [
    {   text: 'Car Super Store', correct: false},
    {   text: 'Crazy Step-Sister', correct: false},
    {   text: 'Cartoon Show Score', correct: false},
    {   text: 'None of the choices', correct: true}
]},
    //Question 4
{   question:' What values does boolean return?',
    answers: [
    {   text: 'Your location', correct: false},
    {   text: 'true or false', correct: true},
    {   text: 'Your boo', correct: false},
    {   text: 'Your boo is lean', correct: false}
]},
    //Question 5
{   question:' What is BootStrap?',
    answers: [
    {   text: 'Strap for your boots', correct: false},
    {   text: 'A gangster rapper', correct: false},
    {   text: 'Boots that are trapped', correct: false},
    {   text: 'A framework for CSS', correct: true}
]},

];

//DOM for Timer
var timerText = document.getElementById("timer-text");
var btnStart = document.getElementById("start-btn");


//set the length of the timer
var count = 100;
var intervalID;

//start timer after the start-btn is clicked
btnStart.addEventListener("click", function() {
    //decrement 1 second off the timer every 1 second
    intervalID = setInterval(function() {
        count -= 1;
        //return the seconds left to user
        timerText.textContent = count + ' seconds left!';
    
    

    //stop decrement when count equals to 0
    if (count === 0){
        clearInterval(intervalID);
        timerText.textContent = 'Times Up!'

    }
    //1000ms = 1 second
    }, 1000);
});

/*
Pseudo-Code
THINGS STILL NEED TO BE DONE:
1. Create a question counter to keep track of your question
2. decrement 10000ms for every incorrect answers
3. when times up, show an 'enter your result page' automatically
4. try to fix the 'hide' class so that only the start button is shown before everything else. also try to hide the start button when questions are being answered: Try to hide the start button and keep the next button
5. find ways to link the result page after the timer runs out
5. create a better restart state where you can restart after you get your score and enter initials
6. create the result page that display and store data into the localstorage(localstorage.setItem/ localstorage.getItem)
7. make sure you can clear and still keep the score

*/


//DOM for Questions and Answers
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');

//Null for now to set values later
var shuffledQuestions, currentQuestionIndex

//show questions when start is clicked
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestions()
})

//start the quiz
function startQuiz (){
    console.log('Started')
    startButton.addEventListener('hide', function(){})
    //randomize the questions
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    //put index at 0
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    //go to the next question
    setNextQuestions()
}
//allow for next question
function setNextQuestions() {
    resetState()
    //randomize based on the questions variable index
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


//Using all of these for reference to current homework 