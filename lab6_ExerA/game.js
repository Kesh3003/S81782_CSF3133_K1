// Global variables to track game state, scores, and history
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Validate player name and initialize the game
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    // Check if name input is empty
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message and current date/time
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started: " + new Date();
    gameStarted = true;
}

// Generate a random choice for the computer
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Execute a single round of the game
function playRound(playerChoice) {
    // Prevent playing before clicking Start Game
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Get image elements and update their src attributes
    let playerImg = document.getElementById("playerImg");
    let computerImg = document.getElementById("computerImg");
    playerImg.src = playerChoice + ".png";
    computerImg.src = computerChoice + ".png";

    let outcome = "";
    let resultElement = document.getElementById("result");

    // Determine winner and update text + image box colors
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultElement.innerHTML = "Round " + roundCount + ": It's a Draw!";
        resultElement.style.color = "grey";

        // Grey border for Draw
        playerImg.style.borderColor = "grey";
        computerImg.style.borderColor = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultElement.innerHTML = "Round " + roundCount + ": You Win!";
        resultElement.style.color = "green";

        // Green border for Win (You), Red for Lose (Computer)
        playerImg.style.borderColor = "green";
        computerImg.style.borderColor = "red";
    } else {
        outcome = "Lose";
        losses++;
        resultElement.innerHTML = "Round " + roundCount + ": You Lose!";
        resultElement.style.color = "red";

        // Red border for Lose (You), Green for Win (Computer)
        playerImg.style.borderColor = "red";
        computerImg.style.borderColor = "green";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Save result to array and append row to history table
    results.push(outcome);
    let historyTable = document.getElementById("history");
    historyTable.innerHTML +=
        "<tr>" +
        "<td>" + roundCount + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + outcome + "</td>" +
        "</tr>";
}

// Calculate and display win percentage using a for loop
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summaryText").innerHTML = "You have not played any rounds yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercentage + "%.";
}

// Reset all scores, arrays, table rows, image borders, and display messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    // Reset scoreboard UI
    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";

    // Clear result and summary text
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";

    // Reset image box borders back to default grey
    document.getElementById("playerImg").style.borderColor = "#ccc";
    document.getElementById("computerImg").style.borderColor = "#ccc";

    // Reset history table back to only the header row
    document.getElementById("history").innerHTML =
        "<tr>" +
        "<th>Round</th>" +
        "<th>You</th>" +
        "<th>Computer</th>" +
        "<th>Result</th>" +
        "</tr>";
}
