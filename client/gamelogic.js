//get a random quote
const RANDOM_QUOTE = 'http://api.quotable.io/random';

//variable that will set the quote
const generatedQuote = document.getElementById("quoteDisplay");
//variable for the user input
const userString = document.getElementById("userInput");

//variables for determining the user has finished the quote
let generatedQuoteLength = generatedQuote.split("").length;
let userStringLength;

//variables for score
let correctChar = 0;

//function(s) to get the game quote
function getRandomQuote() {
    return fetch(RANDOM_QUOTE)
    .then(response => response.json())
    .then(data => data.content)
}

async function getQuote() {
    const quote = await getRandomQuote();
    quote.split("").foreach(character => {
        const charInQuote = document.createElement("span");
        charInQuote.innerText = character;
        generatedQuote.appendChild(charInQuote);
    });
    userString.value = null;
}
//call the quote to be displayed, may want to add a timer to wait a little bit
getQuote();


//function(s) to show the user that they have the correct string
function displayCorrectness() {
    const correctQuoteArray = generatedQuote.querySelectorAll("span");//this will be the quote
    const userInputArray = userString.value.split(""); //this is what the user types int
    userStringLength = userInputArray.length;

    correctQuoteArray.forEach((currentChars, i) => {
        if(userInputArray[i] == null) {
            currentChars.classList.remove("correct");
            currentChars.classList.remove("incorrect");
        }
        else if(userInputArray[i] === currentChars.innerText) {
            currentChars.classList.add("correct");
            currentChars.classList.remove("incorrect");
            correctChar++;
        }
        else{
            currentChars.classList.add("incorrect");
            currentChars.classList.remove("correct");
            correctChar--;
        }
    });
}

//function(s) to create a timer
function timer() {
    let displayTime = document.getElementById("currentTime");
    let sec = 0;

    while(generatedQuoteLength != userStringLength) {
        setInterval(() => {
            displayTime = sec;
            sec++;
        }, 1000);
    }

    //clear the quote and the screen
    generatedQuote.value = null;
    userString.value = null;

    //call function to get the users score
    findScore();
}
//call the timer to start it 
timer();

//function(s) to calculate the score and store in DB
function findScore() {
    //calculate the user score

    //add the score to the database
}


//function(s) to show where the user places





//HTML of the screen
return(
    <div className="RaceTyper">
        <h1 id="currentTime"></h1>
        <h1 id="score">Score: {correctChar}</h1>
        <br></br>
        <div id="quoteDisplay"></div>
        <br></br>
        <textarea id="userInput" onInput={ () => {
            displayCorrectness();
        }}></textarea>
    </div>
);