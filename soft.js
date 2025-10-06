// State variables
let currentPin = '';
let pinValue = '';
const correctPin = '1234'; // Hardcoded PIN for simulation
let balance = 12500.00;
let account = 'XXXXXXXX1234';
let currentAmount = '';
let transactions = [
    { date: 'Oct 01, 2025', type: 'Withdrawal', amount: 1000, balance: 12500 },
    { date: 'Sep 29, 2025', type: 'Deposit', amount: 1000, balance: 12500 },
    { date: 'Sep 20, 2025', type: 'Withdrawal', amount: 1000, balance: 12500 },
    { date: 'Sep 05, 2025', type: 'Deposit', amount: 1000, balance: 12500 }
];

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'balance') {
        document.getElementById('available-balance').textContent = formatAmount(balance);
    } else if (screenId === 'history') {
        populateHistory();
    } else if (screenId === 'pin') {
        clearPin();
    } else if (screenId === 'withdraw-amount' || screenId === 'deposit-amount') {
        clearAmount(screenId.split('-')[0]);
    }
}

function appendPin(digit) {
    if (pinValue.length < 4) {
        pinValue += digit;
        currentPin += '*';
        document.getElementById('pin-input').textContent = currentPin;
    }
}

function clearPin() {
    currentPin = '';
    pinValue = '';
    document.getElementById('pin-input').textContent = '';
}

function submitPin() {
    if (pinValue === correctPin) {
        goToScreen('main-menu');
    } else {
        alert('Incorrect PIN. Try again.');
        clearPin();
    }
}

function appendAmount(digit, type) {
    currentAmount += digit;
    document.getElementById(type + '-input').textContent = formatAmount(parseFloat(currentAmount || 0));
}

function clearAmount(type) {
    currentAmount = '';
    document.getElementById(type + '-input').textContent = '';
}

function formatAmount(amount) {
    return '₱ ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function submitWithdrawAmount() {
    const amount = parseFloat(currentAmount);
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount.');
        return;
    }
    if (amount > balance) {
        alert('Insufficient balance.');
        return;
    }
    document.getElementById('withdraw-amount-summary').textContent = formatAmount(amount);
    document.getElementById('remaining-balance').textContent = formatAmount(balance - amount);
    goToScreen('withdraw-summary');
}

function confirmWithdraw() {
    const amount = parseFloat(currentAmount);
    balance -= amount;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    transactions.unshift({ date: today, type: 'Withdrawal', amount: amount, balance: balance });
    currentAmount = '';
    goToScreen('main-menu');
}

function submitDepositAmount() {
    const amount = parseFloat(currentAmount);
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount.');
        return;
    }
    document.getElementById('deposit-message').textContent = `Please insert ${formatAmount(amount)} into the deposit slot`;
    goToScreen('deposit-insert');
}

function prepareDepositSummary() {
    const amount = parseFloat(currentAmount);
    document.getElementById('deposit-amount-summary').textContent = formatAmount(amount);
    document.getElementById('new-balance').textContent = formatAmount(balance + amount);
    goToScreen('deposit-summary');
}

function confirmDeposit() {
    const amount = parseFloat(currentAmount);
    balance += amount;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    transactions.unshift({ date: today, type: 'Deposit', amount: amount, balance: balance });
    currentAmount = '';
    goToScreen('main-menu');
}

function populateHistory() {
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = '';
    transactions.slice(0, 4).forEach(tx => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tx.date}</td>
            <td>${tx.type}</td>
            <td>${formatAmount(tx.amount)}</td>
            <td>${formatAmount(tx.balance)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize PIN input
document.getElementById('pin-input').textContent = '';