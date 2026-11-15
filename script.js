
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let expenseForm = document.getElementById("expenseForm");
let expenseList = document.getElementById("expenseList");

let amount = document.getElementById("amount");
let description = document.getElementById("description");
let category = document.getElementById("category");
let submitBtn = document.getElementById("submitBtn");

let editId = null;


// Display Expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach((expense) => {

        let li = document.createElement("li");

        li.className = "list-group-item d-flex justify-content-between align-items-center";

        let details = document.createElement("span");

        details.textContent = `* ₹${expense.amount} | ${expense.description} | ${expense.category}`;

        let buttons = document.createElement("div");

        buttons.className = "d-flex gap-2";

        // Edit Button
        let editBtn = document.createElement("button");

        editBtn.className = "btn btn-warning btn-sm";
        editBtn.textContent = "Edit";

        editBtn.onclick = function () {
            editExpense(expense.id);
        };

        // Delete Button
        let deleteBtn = document.createElement("button");

        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function () {
            deleteExpense(expense.id);
        };

        buttons.append(editBtn, deleteBtn);

        li.append(details, buttons);

        expenseList.appendChild(li);

    });

}


// Add and Update Expense
expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let expenseData = {

        id: editId || Date.now(),

        amount: Number(amount.value),

        description: description.value.trim(),

        category: category.value

    };

    if (editId === null) {

        expenses.push(expenseData);

    } else {

        expenses = expenses.map((expense) => {

            return expense.id === editId ? expenseData : expense;

        });

        editId = null;

        submitBtn.textContent = "Add Expense";

    }

    // Update Local Storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    expenseForm.reset();

});


// Delete Expense
function deleteExpense(id) {

    expenses = expenses.filter((expense) => {

        return expense.id !== id;

    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

}


// Edit Expense
function editExpense(id) {

    let expense = expenses.find((expense) => {

        return expense.id === id;

    });

    amount.value = expense.amount;

    description.value = expense.description;

    category.value = expense.category;

    editId = id;

    submitBtn.textContent = "Update Expense";

}


// Display saved expenses when page loads
displayExpenses();
