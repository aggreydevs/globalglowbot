// METHODS

// THis Function initializes the game 

function initializePage(cities, wordContainer, bodyParts){

  // The guess function chooses which city we are using from our array

  var guess = cities[Math.floor(Math.random() * (cities.length - 1))];
  
  // This hides our robot

  bodyParts.forEach(function(bodyPart){
    document.querySelector(bodyPart).style.visibility = "hidden";
  });

// This sets up boxes based on the word chosen from our array

  wordContainer.innerHTML = "";

  // gets rid of spaces inside word

  for(var i = 0; i <= guess.replace(/\s/g, "").length - 1; i++){
    wordContainer.innerHTML += "<div class='box'></div>";
  }

  return guess;
}

// Cities for Word Choice

var cities = ["Toronto" , "London" , "New York", "Seoul", "Los Angeles", "Chicago", "Detroit", "Bogota", "Bangkok", "Tokyo" , "Madrid", "Paris", "Amsterdam" , "Kiev", "Miami", "Berlin", "Tampa", "Orlando"," San Francisco", "Seattle", "Medellin", "Dallas", "Las Vegas", "Vancouver", "Beijiing", "Shanghai", "Jakarta", "Manila", "Sydney", "Buenos Aires", "Lima", "Mexico City", "Stockholm", "Copenhagen", "Brussels", "New Orleans", "Austin", "Montreal", "Atlanta", "Portland", "Calgary", "Quito", "Caracas", "Sao Paolo", "Santiago", "Rio De Janeiro" , "Havana", "Lagos", "Johannesburg", "Cape Town", "Melbourne", "Nairobi", "Perth"]

// This array stores the information for the CSS parts of the robot that are visible 

var bodyParts = [".head", ".left_eye", ".right_eye", ".mouth", ".torso", ".left_arm", ".right_arm", ".left_leg", ".right_leg"];
var wordContainer = document.querySelector(".word");

var guess = initializePage(cities, wordContainer, bodyParts);

// This is our array that stores correct letters

var finalWord = [];
guess.toLowerCase().replace(/\s/g, "").split('').forEach(function(letter) {
  finalWord.push('');
});

// This stores the letters that do not fit in our chosen word. 

let badLetters = [];

// This tracks the number of bad guesses, which helps us build our CSS robot 

var incorrectGuessCount = -1;


//This gives us our loss message and lets us know the correct word

function lose(){
  document.querySelector(bodyParts[bodyParts.length - 1]).style.visibility = "visible";
  document.querySelector("#correctAnswer").innerHTML = "<p>You lost :( , the correct word was: " + guess + "</p>";
  
}

// This gives our victory message

function winner(){
  document.querySelector("#correctAnswer").innerHTML = "<p>Congrats you win!!!</p>";
}

// this listens to keyboard input and asks it to consider only letters

document.addEventListener("keyup", function(event){
  if((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123)){
    var count = 0;
    var goodLetters = []

    // This takes the word 
    var chars = guess.toLowerCase().replace(/\s/g, "").split('');
    
    if(chars.includes(event.key)){
      chars.forEach(function(letter){
        if(letter == event.key){
          goodLetters.push(count);
        }

        // increase count ??

       count++;
      });
    } else {
      // add
      if(badLetters.length < (bodyParts.length - 1)){
        if(!badLetters.includes(event.key)){
          badLetters.push(event.key);
          incorrectGuessCount += 1;
          document.querySelector(bodyParts[incorrectGuessCount]).style.visibility = "visible";
          document.querySelector("#wrongLetters").innerHTML = badLetters;
        }
      } else {
        lose();
      }
    }

    // This draws characters into the box 

    goodLetters.forEach(function(foundIndex){
      wordContainer.querySelectorAll('.box')[foundIndex].innerHTML = "<h1>" + event.key +"</h1>";
      finalWord[foundIndex] = event.key;
      
    });


// if the board has no spaces left we win!

    if(!finalWord.includes("")){
      winner();
    }
  }
});


// This event listener is for our restart button

document.getElementById("restart-button").addEventListener("click", function(){
  guess = initializePage(cities, wordContainer, bodyParts);
  incorrectGuessCount = -1;
  badLetters = [];
  finalWord = [''];
  document.querySelector("#wrongLetters").innerHTML = badLetters;
  document.querySelector("#correctAnswer").innerHTML = "";
});

