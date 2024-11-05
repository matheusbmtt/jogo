const readline = require('readline'); // Import the readline module for handling input and output in the terminal

const rl = readline.createInterface({ // Create an interface for input
    input: process.stdin, // Set standard input to the terminal
    output: process.stdout // Set standard output to the terminal
});

// Function that prompts the user to choose a difficulty level
const getDifficulty = () => {
    console.log("🎃 Choose a difficulty level: 🎃");
    console.log("1. Easy (1 to 5, 5 attempts)"); // Easy option
    console.log("2. Medium (1 to 10, 3 attempts)"); // Medium option
    console.log("3. Hard (1 to 20, 2 attempts)"); // Hard option

    // Ask the user to choose one of the options
    rl.question("Choose 1, 2, or 3: ", (choice) => {
        switch (choice) {
            case '1':
                startGame(5, 5); // Call startGame with 5 as limit and 5 attempts
                break;
            case '2':
                startGame(10, 3); // Call startGame with 10 as limit and 3 attempts
                break;
            case '3':
                startGame(20, 2); // Call startGame with 20 as limit and 2 attempts
                break;
            default:
                console.log("⚠️ Invalid option. Please try again."); // Error message for invalid option
                getDifficulty(); // Restart difficulty selection
                break;
        }
    });
};

// Function that starts the game
const startGame = (maxNumber, attempts) => {
    const secretNumber = Math.floor(Math.random() * maxNumber) + 1; // Generate a random number between 1 and maxNumber
    let score = 0; // Initialize player's score

    console.log(`\nYou chose the level with numbers from 1 to ${maxNumber} and ${attempts} attempts!`);
    
    // Recursive function to ask for user guesses
    const askGuess = () => { 
        if (attempts > 0) { // Check if there are attempts left
            rl.question(`You have ${attempts} attempts remaining. What is your guess? `, (answer) => {
                const guess = parseInt(answer); // Convert the user's answer to an integer

                // Check if the input is valid
                if (isNaN(guess) || guess < 1 || guess > maxNumber) {
                    console.log("⚠️ Please enter a valid number."); // Error message for invalid input
                    askGuess(); // Ask again
                } else if (guess === secretNumber) { // If the guess is correct
                    score += attempts * 10; // Increase score based on remaining attempts
                    console.log(`🎉 Congratulations! You guessed the number ${secretNumber} and earned ${score} points! 
                                   
      ▄▄▀▀▀▀▀▀▀▀▀▀▄▄█▄   ▄    █
      █▀             ▀▀█▄   ▀         ▄ 
    ▄▀                 ▀██   ▄▀▀▀▄▄  ▀
  ▄█▀▄█▀▀▀▀▄      ▄▀▀█▄ ▀█▄  █▄   ▀█
 ▄█ ▄▀  ▄▄▄ █   ▄▀▄█▄  █  █▄  ▀█    █
▄█  █   ▀▀▀ █  ▄█ ▀▀▀  █   █▄  █    █
██   ▀▄   ▄█▀   ▀▄▄▄▄▄█▀   ▀█  █▄   █
██     ▀▀▀                  █ ▄█    █
██                     █    ██▀    █▄
██                     █    █       ▀▀█▄
██                    █     █       ▄▄██
 ██                  ▄▀     █       ▀▀█▄
 ▀█      █        ▄█▀       █       ▄▄██
 ▄██▄     ▀▀▀▄▄▄▄▀▀         █       ▀▀█▄
  ▀▀▀▀                      █▄▄▄▄▄▄▄▄▄██
  🎉`); // Victory message
                    playAgain(); // Ask if the user wants to play again
                } else { // If the guess is incorrect
                    attempts--; // Decrement the number of remaining attempts
                    // Provide hints based on the guess
                    if (guess < secretNumber) {
                        console.log("👻 Hint: The number is higher!"); // Hint for low guess
                    } else {
                        console.log("👻 Hint: The number is lower!"); // Hint for high guess
                    }
                    askGuess(); // Ask again
                }
            });
        } else { // If attempts are exhausted
            console.log(`😱 You couldn't guess! The number was ${secretNumber}.
                
                ░░░░░░░
            ░░░░░░░░░░░░░░░░░
          │░░░░░░░░░░░░░░░░░░░│
          │░░░░░░░░░░░░░░░░░░░│
         ░└┐░░░░░░░░░░░░░░░░░┌┘░
         ░░└┐░░░░░░░░░░░░░░░┌┘░░
         ░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░
          ░│██████▌░░░▐██████│░      YOU DIED!!!
          ░│▐███▀▀░░▄░░▀▀███▌│░
          ─┘░░░░░░░▐█▌░░░░░░░└─
          ░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░
            ─┘██▌░░░░░░░▐██└─
            ░░▐█─┬┬┬┬┬┬┬─█▌░░
            ░░░▀┬┼┼┼┼┼┼┼┬▀░░░
             ░░░└┴┴┴┴┴┴┴┘░░░
               ░░░░░░░░░░░
            `); // Defeat message
            playAgain(); // Ask if they want to play again
        }
    };

    askGuess(); // Start the guessing loop
};

// Function that asks the user if they want to play again
const playAgain = () => {
    rl.question("Would you like to play again? (y/n): ", (answer) => {
        if (answer.toLowerCase() === 'y') { // If the answer is 'y' or 'Y'
            getDifficulty(); // Restart difficulty selection
        } else {
            console.log("Thank you for playing! See you next time! 🎃"); // Farewell message
            rl.close(); // Close the input interface, ending the program
        }
    });
};

getDifficulty(); // Call the function to start the game, asking for difficulty