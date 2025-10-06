// script.js
document.addEventListener('DOMContentLoaded', () => {
    const insertCardBtn = document.getElementById('insert-card');
    const screenInsert = document.getElementById('screen-insert');
    const screenPin = document.getElementById('screen-pin');
    const screenMenu = document.getElementById('screen-menu');
    const screenBalance = document.getElementById('screen-balance');
    const screenWithdrawAmount = document.getElementById('screen-withdraw-amount');
    const screenWithdrawSummary = document.getElementById('screen-withdraw-summary');
    const screenDepositAmount = document.getElementById('screen-deposit-amount');
    const screenDepositConfirm = document.getElementById('screen-deposit-confirm');
    const screenDepositSummary = document.getElementById('screen-deposit-summary');
    const pinInput = document.getElementById('pin-input');
    const amountInput = document.getElementById('amount-input');
    const depositAmountInput = document.getElementById('deposit-amount-input');
    const enterPinBtn = document.getElementById('enter-pin');
    const confirmAmountBtn = document.getElementById('confirm-amount');
    const confirmDepositAmountBtn = document.getElementById('confirm-deposit-amount');
    const backFromWithdrawBtn = document.getElementById('back-from-withdraw');
    const backFromDepositBtn = document.getElementById('back-from-deposit');
    const cancelWithdrawBtn = document.getElementById('cancel-withdraw');
    const confirmWithdrawBtn = document.getElementById('confirm-withdraw');
    const cancelDepositBtn = document.getElementById('cancel-deposit');
    const confirmDepositBtn = document.getElementById('confirm-deposit');
    const logoutBtn = document.getElementById('logout');
    const checkBalanceBtn = document.getElementById('check-balance');
    const withdrawBtn = document.getElementById('withdraw');
    const depositBtn = document.getElementById('deposit');
    const checkHistoryBtn = document.getElementById('check-history');
    const backToMenuBtn = document.getElementById('back-to-menu');
    const backToMenuFromDepositBtn = document.getElementById('back-to-menu-from-deposit');

    let pin = '';
    let withdrawalAmount = '';
    let depositAmount = '';
    let currentBalance = 12500.00;

    // Update balance display
    function updateBalanceDisplay() {
        const balanceElement = document.getElementById('balance-display');
        if (balanceElement) {
            balanceElement.textContent = `₱${currentBalance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    // Helper function to format currency
    function formatCurrency(amount) {
        return '₱' + amount.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Helper function to show screens
    function showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show the target screen
        document.getElementById(screenId).classList.add('active');
    }

    updateBalanceDisplay();

    // Switch to PIN screen
    insertCardBtn.addEventListener('click', () => {
        showScreen('screen-pin');
    });

    // Keypad functionality for PIN
    const pinKeys = document.querySelectorAll('#screen-pin .key');
    pinKeys.forEach(key => {
        key.addEventListener('click', () => {
            if (pin.length < 4) {
                pin += key.textContent;
                pinInput.value = '*'.repeat(pin.length);
            }
        });
    });

    // Clear PIN
    document.querySelector('#screen-pin .clear').addEventListener('click', () => {
        pin = '';
        pinInput.value = '';
    });

    // Enter PIN (mock validation)
    enterPinBtn.addEventListener('click', () => {
        if (pin.length === 4) {
            // For demo, assume '1234' is correct PIN
            if (pin === '1234') {
                showScreen('screen-menu');
                pin = '';
                pinInput.value = '';
            } else {
                alert('Incorrect PIN. Please try again.');
                pin = '';
                pinInput.value = '';
            }
        } else {
            alert('Please enter a 4-digit PIN.');
        }
    });

    // Check Balance - Switch to balance screen
    checkBalanceBtn.addEventListener('click', () => {
        updateBalanceDisplay();
        showScreen('screen-balance');
    });

    // Back to menu from balance
    backToMenuBtn.addEventListener('click', () => {
        showScreen('screen-menu');
    });

    // Withdraw - Switch to amount entry screen
    withdrawBtn.addEventListener('click', () => {
        showScreen('screen-withdraw-amount');
        withdrawalAmount = '';
        amountInput.value = '';
    });

    // Back from withdraw amount to menu
    backFromWithdrawBtn.addEventListener('click', () => {
        showScreen('screen-menu');
        withdrawalAmount = '';
        amountInput.value = '';
    });

    // Keypad functionality for amount
    const amountKeys = document.querySelectorAll('#screen-withdraw-amount .key');
    amountKeys.forEach(key => {
        key.addEventListener('click', () => {
            withdrawalAmount += key.textContent;
            const numValue = parseInt(withdrawalAmount) || 0;
            amountInput.value = numValue > 0 ? `₱${numValue.toLocaleString('en-PH')}.00` : '';
        });
    });

    // Clear amount
    document.querySelector('#screen-withdraw-amount .clear').addEventListener('click', () => {
        withdrawalAmount = '';
        amountInput.value = '';
    });

    // Confirm amount - Switch to summary screen
    confirmAmountBtn.addEventListener('click', () => {
        const amountNum = parseInt(withdrawalAmount) || 0;
        if (amountNum > 0 && amountNum <= currentBalance) {
            const remainingBalance = currentBalance - amountNum;
            document.getElementById('withdrawal-display').textContent = `₱${amountNum.toLocaleString('en-PH')}.00`;
            document.getElementById('remaining-display').textContent = `₱${remainingBalance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            showScreen('screen-withdraw-summary');
        } else if (amountNum > currentBalance) {
            alert('Insufficient funds. Please enter a lower amount.');
        } else {
            alert('Please enter a valid amount.');
        }
    });

    // Cancel withdraw - Back to menu
    cancelWithdrawBtn.addEventListener('click', () => {
        showScreen('screen-menu');
        withdrawalAmount = '';
    });

    // Confirm withdraw - Process and back to menu
    confirmWithdrawBtn.addEventListener('click', () => {
        const amountNum = parseInt(withdrawalAmount) || 0;
        currentBalance -= amountNum;
        updateBalanceDisplay();
        alert(`Withdrawal successful! ₱${amountNum.toLocaleString('en-PH')}.00 has been dispensed.\nRemaining balance: ₱${currentBalance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        showScreen('screen-menu');
        withdrawalAmount = '';
    });

    // Deposit - Switch to amount entry screen
    depositBtn.addEventListener('click', () => {
        showScreen('screen-deposit-amount');
        depositAmount = '';
        depositAmountInput.value = '';
    });

    // Back from deposit amount to menu
    backFromDepositBtn.addEventListener('click', () => {
        showScreen('screen-menu');
        depositAmount = '';
        depositAmountInput.value = '';
    });

    // Keypad functionality for deposit amount
    const depositKeys = document.querySelectorAll('#screen-deposit-amount .key');
    depositKeys.forEach(key => {
        key.addEventListener('click', () => {
            if (depositAmountInput.value === '₱ 0.00' || depositAmountInput.value === '') {
                depositAmount = key.textContent;
                depositAmountInput.value = '₱ ' + depositAmount;
            } else {
                depositAmount += key.textContent;
                depositAmountInput.value = '₱ ' + depositAmount;
            }
        });
    });

    // Clear deposit amount
    document.querySelector('#screen-deposit-amount .clear').addEventListener('click', () => {
        depositAmount = '';
        depositAmountInput.value = '₱ 0.00';
    });

    // Confirm deposit amount - Switch to confirmation screen
    confirmDepositAmountBtn.addEventListener('click', () => {
        const amountText = depositAmountInput.value.replace('₱ ', '').replace(/,/g, '');
        const amountNum = parseFloat(amountText) || 0;
        
        if (isNaN(amountNum) || amountNum <= 0) {
            depositAmountInput.value = '₱ 0.00';
            alert('Please enter a valid amount.');
            return;
        }
        
        document.getElementById('deposit-amount-display').textContent = formatCurrency(amountNum);
        showScreen('screen-deposit-confirm');
    });

    // Cancel deposit and go back to main menu
    cancelDepositBtn.addEventListener('click', () => {
        showScreen('screen-menu');
        depositAmount = '';
        depositAmountInput.value = '';
    });

    // Confirm deposit and show summary
    confirmDepositBtn.addEventListener('click', () => {
        const amountText = depositAmountInput.value.replace('₱ ', '').replace(/,/g, '');
        const amountNum = parseFloat(amountText) || 0;
        const newBalance = currentBalance + amountNum;
        
        document.getElementById('deposited-display').textContent = formatCurrency(amountNum);
        document.getElementById('new-balance-display').textContent = formatCurrency(newBalance);
        
        showScreen('screen-deposit-summary');
    });

    // Back to menu from deposit summary
    backToMenuFromDepositBtn.addEventListener('click', () => {
        const amountText = depositAmountInput.value.replace('₱ ', '').replace(/,/g, '');
        const amountNum = parseFloat(amountText) || 0;
        
        // Update the actual balance
        currentBalance += amountNum;
        updateBalanceDisplay();
        
        showScreen('screen-menu');
        depositAmount = '';
        depositAmountInput.value = '';
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        showScreen('screen-insert');
    });
});