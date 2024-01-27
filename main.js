const incomeTransArray = [];
const expenseTransArray = [];
const incomeArray = [];
const expenseArray = [];
let incomeOrExpense = "";
const form = document.querySelector('form');
const transListWrapper = document.querySelector(".transationList-wrapper");
const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");
const balance = document.getElementById("balance");

// Update function for the noTransaction message
const updateNoTransactionMessage = () => {
    const noTransaction = document.querySelector('.noTransaction');

    if (incomeTransArray.length === 0 && expenseTransArray.length === 0) {
        if (!noTransaction) {
            const noTransactionElement = document.createElement('div');
            noTransactionElement.className = "noTransaction";
            noTransactionElement.innerHTML = "<p>No transactions</p>";
            transListWrapper.appendChild(noTransactionElement);
        }
    } else {
        if (noTransaction) {
            noTransaction.remove();
        }
    }
}

updateNoTransactionMessage();



// Getting the value of checkbox from two checkboxes
const checkboxIncome = document.getElementById('checkbox1');
const checkboxExpense = document.getElementById('checkbox2');

checkboxIncome.addEventListener('change', handleChangeCheckBox);
checkboxExpense.addEventListener('change', handleChangeCheckBox);

function handleChangeCheckBox(event) {
    if (event.target.checked) {
        incomeOrExpense = event.target.value;

        if (event.target === checkboxIncome) {
            checkboxExpense.checked = false;
        } else {
            checkboxIncome.checked = false;
        }
    }
}

// Handling form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!checkboxIncome.checked && !checkboxExpense.checked) {
        alert("Please select either income or expense.");
        return;
    }

    // Get form values
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    const newDate = new Date(date)
    const formatedDate = `${String(newDate.getDate()).padStart(2, '0')}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${String(newDate.getFullYear()).slice(2)}`

    const titleIcomeOrExpense = incomeOrExpense.toUpperCase()

    if (amount < 1) {
        alert("Amount should be greater than 0");
        return;
    }

    // Create list item for transaction
    const listWrapper = document.getElementById("list");
    const transaction = document.createElement('li');
    transaction.className = `list-item ${incomeOrExpense}`;
    transaction.innerHTML = `<div class="item-content">
        <h4>${name}</h4>
        <div>
            <p>${formatedDate}</p>
            <p>- ${titleIcomeOrExpense}</p>
        </div>
    </div>
    <div class="priceAndClose">
        <p id="cashAmnt" class="${incomeOrExpense}">${amount}<span class="ruppeeSymbol">&#x20B9</span></p>
        <span class="material-symbols-outlined" id="close" onclick="removeList(event);">cancel</span>
    </div>`;

    // Add transaction to the list
    listWrapper.appendChild(transaction);
    transListWrapper.appendChild(listWrapper);

    // Push transaction to respective array
    if (checkboxIncome.checked) {
        checkboxIncome.checked = false;
        incomeTransArray.push(transaction);
        incomeArray.push(parseFloat(amount));
    } else {
        checkboxExpense.checked = false;
        expenseTransArray.push(transaction);
        expenseArray.push(parseFloat(amount));
    }

    updateNoTransactionMessage()

    // Update total amounts
    updateTotals();

    //clearing the input fields
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
});

// Remove the list item that is clicked
function removeList(event) {
    const listItem = event.target.closest("li");
    let indexToRemove;

    if (listItem.classList.contains('income')) {
        indexToRemove = incomeTransArray.indexOf(listItem);
        incomeTransArray.splice(indexToRemove, 1);
        incomeArray.splice(indexToRemove, 1);
    } else if (listItem.classList.contains('expense')) {
        indexToRemove = expenseTransArray.indexOf(listItem);
        expenseTransArray.splice(indexToRemove, 1);
        expenseArray.splice(indexToRemove, 1);
    }

    listItem.remove();
    updateNoTransactionMessage();
    updateTotals();
}

// Function to update total amounts and balance
function updateTotals() {
    const incomeSum = incomeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const expenseSum = expenseArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const balanceTotal = incomeSum - expenseSum;

    incomeTotal.textContent = incomeSum
    expenseTotal.textContent = expenseSum
    
    if(balanceTotal < 0){
        balance.textContent = 0
    }else{
        balance.textContent = balanceTotal
    }
}


