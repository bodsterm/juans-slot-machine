const symbols = ["🍒", "🍋", "🍊", "💎", "7️⃣"];
const balanceElement = document.getElementById("balance");
const reelElements = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];
const betInput = document.getElementById("bet");
const spinButton = document.getElementById("spin");
const quitButton = document.getElementById("quit");
const messageElement = document.getElementById("message");

let balance = 100;

const trollMessages = [
    "Wow, so close! ...Just kidding, you weren't even close!",
    "Better luck next time... or maybe never? 😜",
    "Oof, your luck is worse than a rainy Monday!",
    "Keep spinning, maybe you'll win... a headache!",
    "The house always wins, but you get an A for effort!"
];

function updateBalance() {
    balanceElement.textContent = balance.toFixed(2);
}

function spinReels() {
    return reelElements.map(reel => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = symbol;
        return symbol;
    });
}

function calculatePayout(bet, result) {
    if (result[0] === result[1] && result[1] === result[2]) {
        if (result[0] === "7️⃣") return bet * 50;
        if (result[0] === "💎") return bet * 20;
        return bet * 10;
    } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        return bet * 2;
    }
    return 0;
}

function showTrollMessage() {
    if (Math.random() < 0.4) {
        messageElement.textContent = trollMessages[Math.floor(Math.random() * trollMessages.length)];
    }
}

spinButton.addEventListener("click", () => {
    const bet = parseFloat(betInput.value);
    messageElement.textContent = "";

    if (isNaN(bet) || bet <= 0) {
        messageElement.textContent = "Enter a valid bet, you trickster!";
        return;
    }
    if (bet > balance) {
        messageElement.textContent = "Whoa, big spender! Not enough cash!";
        return;
    }
    if (bet < 0.01) {
        messageElement.textContent = "C'mon, bet at least a penny!";
        return;
    }

    balance -= bet;
    spinButton.disabled = true;
    messageElement.textContent = "Spinning...";

    setTimeout(() => {
        const result = spinReels();
        const payout = calculatePayout(bet, result);
        balance += payout;
        updateBalance();

        if (payout > 0) {
            messageElement.textContent = `🎉 You won $${payout.toFixed(2)}! 🎉`;
        } else {
            messageElement.textContent = "😢 No win this time!";
            showTrollMessage();
        }

        if (balance <= 0) {
            messageElement.textContent = "💸 You're broke! Game over!";
            spinButton.disabled = true;
            quitButton.textContent = "Game Over";
        } else {
            spinButton.disabled = false;
        }
    }, 1000);
});

quitButton.addEventListener("click", () => {
    messageElement.textContent = `Thanks for playing! Final balance: $${balance.toFixed(2)}`;
    spinButton.disabled = true;
    quitButton.disabled = true;
});

updateBalance();
