window.onload = function() {


	// letters
	var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

		hintsBank = ['EYEBROWS ON...!', 'TOO REAL', 'JUGGIN AND..', 'WE ARE THIS AGAIN ', 'WHEN YOU REACH THAT LEVEL', 'BOSSY SAYS', 'I IN SPANISH', 'BUDWEISER FROGS', '20 BUCKS OR A NO GO', 'THE MAN FROM THE FIF FLOOR', 'RELAX', 'NOT COOL', 'THE HOUSE', 'IN PHILLY EVERY THING IS ONE OF THESE', 'NOPE', 'YOUR CREW', 'ITS ALL GOOD', 'SURF BUT NO DUDE OR RADICAL', 'LIL PUMP GANG'],
		// Words
		wordBank = ["fleek", "trill", "finesse", "litty", "turnt",
			"ever the", "yo", "wassup", "dub",
			"bruh", "chill",
			"thats wack", "crib", "jawn", "nah", "squad",
			"all gravy", "swag",
			"gucci"
		],
		// Number of guess
		lives = 6,
		// Array of guesses
		guesses = [],
		// Current word
		currentWord = [],
		//  hint
		hint = '',

		wins = 0,
		losses = 0,
		// Getting elements
		guess = document.getElementById("guess"),
		letters = document.getElementById("letters"),
		hints = document.getElementById("hints"),
		livesHTML = document.getElementById("lives"),
		winsHTML = document.getElementById("scoreWins"),
		lossesHTML = document.getElementById("scoreLosses"),
		message = document.getElementById("win-message"),
		resetButton = document.getElementById("reset-btn");

	//Game
	var game = function() {

		validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var validLettersSpaced = [];
		validLettersSpaced = validLetters.join(" ");
		letters.innerHTML = validLettersSpaced;
		//randomizer
		var seed = Math.ceil(Math.random() * (wordBank.length - 1));

		var solutionArray = wordBank[seed].split("");
		// Clear the currentWord
		var currentWord = [];

		var lives = 6;
		// Puuts a dash to the currentWord array for every letter in the chosen word
		for (var i = wordBank[seed].length - 1; i >= 0; i--) {
			currentWord.push('-');
		};

		hint = hintsBank[seed];
		// Creating var joining the currentWord array to remove comma
		var guessSpaced = currentWord.join(" ");

		hints.innerHTML = "Hint - " + hint;
		guess.innerHTML = guessSpaced;
		livesHTML.innerHTML = "You have " + lives + " lives";
		// Creating var joining the validLetters array to remove comma s
		var validLettersSpaced = validLetters.join(" ");
		letters.innerHTML = validLettersSpaced;

		document.onkeyup = function checkLetter(event) {

			var keyPressed = event.key.toLowerCase();
			// Allow to continue only if right key is pressed
			if (validLetters.indexOf(keyPressed) !== -1) {

				if (lives !== 0) {

					if (currentWord.indexOf("-") === -1) {
						return;
					} else if (solutionArray.indexOf(keyPressed) !== -1) {
						// Loops
						function getAllIndexes() {
							var indexes = [],
								i;
							for (i = 0; i < solutionArray.length; i++)
								if (solutionArray[i] === keyPressed) {
									indexes.push(i);
								};
							// For each letter in the solutio
							for (var i = indexes.length - 1; i >= 0; i--) {
								currentWord[indexes[i]] = keyPressed;
							};
							// Puts the new word to the page
							var guessSpaced = currentWord.join(" ");
							guess.innerHTML = guessSpaced;
							// Replace correct letter with a checkmark when guessed
							validLetters[validLetters.indexOf(keyPressed)] = '&#10004;'
							var validLettersSpaced = [];
							validLettersSpaced = validLetters.join(" ");
							letters.innerHTML = validLettersSpaced;
							// was an alert
							if (currentWord.indexOf('-') === -1) {
								guess.innerHTML = guessSpaced;
								livesHTML.innerHTML = 'play again since you are so good at this'
								wins = wins + 1;
								winsHTML.innerHTML = wins + '  wins';
							};
						};
						// Execute
						getAllIndexes(solutionArray, keyPressed);
					} else {

						validLetters[validLetters.indexOf(keyPressed)] = '_ '
						var validLettersSpaced = [];
						validLettersSpaced = validLetters.join(" ");
						letters.innerHTML = validLettersSpaced;
						// Subtract a life for a wrong guess
						lives = lives - 1;
						// Display lives zero lives is game over
						if (lives === 0) {
							livesHTML.innerHTML = 'Game over :(';
							losses = losses + 1;
							lossesHTML.innerHTML = losses + '  losses';
						} else if (lives === 1) {
							livesHTML.innerHTML = 'You have ' + lives + ' life left';
						} else {
							livesHTML.innerHTML = 'You have ' + lives + ' lives left';
						};
					};
				}
			} else {
				return;
			};
		};
	};
	// Run game
	game();
	// The "Play Again" button will restart 
	resetButton.onclick = function() {
		game();
	};
};
