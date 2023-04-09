//get a random quote
const RANDOM_QUOTE = 'http://api.quotable.io/random';

//variable that will set the quote
const generatedQuote = document.getElementById("quoteDisplay");
//variable for the user input
const userString = document.getElementById("userInput");


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
    })
}
//call the quote to be displayed, may want to add a timer to wait a little bit
getQuote();


//function(s) to show the user that they have the correct string
function displayCorrectness() {
    const correctQuoteArray = generatedQuote;//this will be the quote
    const userInputArray = userString; //this is what the user types int

    correctQuoteArray.forEach((currentChar, i) => {
        if(userInputArray[i] == null) {
            currentChar.classList.remove("correct");
            currentChar.classList.remove("incorrect");
        }
        else if(userInputArray[i] === currentChar.innerText) {
            currentChar.classList.add("correct");
            currentChar.classList.remove("incorrect");
        }
        else{
            currentChar.classList.add("incorrect");
            currentChar.classList.remove("correct");
        }
    });
}

//function(s) to calculate the score and store in DB






//function(s) to show where the user places





//HTML of the screen
return(
    <div className="RaceTyper">
        <div id="quoteDisplay"></div>
        <textarea id="userInput" onInput={ () => {
            displayCorrectness();
        }}></textarea>
    </div>
);
