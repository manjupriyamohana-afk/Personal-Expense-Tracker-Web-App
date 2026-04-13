let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentFilter = "all";

// Display expenses
function displayExpenses() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";

    let filtered = expenses.filter(exp => {
        if (currentFilter === "all") return true;
        return exp.category === currentFilter;
    });

    let total = 0;

    filtered.forEach((exp, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ₹${exp.amount} - ${exp.category}
            <button onclick="deleteExpense(${index})">Delete</button>
        `;

        list.appendChild(li);
        total += Number(exp.amount);
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// Add expense with validation
function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "" || category === "") {
        alert("Please fill all fields!");
        return;
    }

    if (amount <= 0) {
        alert("Enter valid amount!");
        return;
    }

    expenses.push({ amount, category });

    saveData();
    displayExpenses();

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
}

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    saveData();
    displayExpenses();
}

// Filter
function filterExpenses(type) {
    currentFilter = type;
    displayExpenses();
}

// Save to localStorage
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load data
displayExpenses();