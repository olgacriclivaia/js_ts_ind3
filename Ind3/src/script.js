/**
 * Массив для хранения транзакций
 * @type {Array}
 */
let transactions = [];

/**
 * Инициализация страницы
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transactionForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addTransaction();
    });

    const table = document.getElementById('transactionTable');
    table.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.dataset.id;
            deleteTransaction(id);
        } else if (event.target.tagName === 'TD') {
            const id = event.target.parentElement.dataset.id;
            showDetails(id);
        }
    });
});

/**
 * Добавление новой транзакции
 */
function addTransaction() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const transaction = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        amount: parseFloat(amount),
        category,
        description
    };

    transactions.push(transaction);
    addTransactionToTable(transaction);
    calculateTotal();
    document.getElementById('transactionForm').reset();
}

/**
 * Добавление строки в таблицу транзакций
 * @param {Object} transaction - объект транзакции
 */
function addTransactionToTable(transaction) {
    const tableBody = document.querySelector('#transactionTable tbody');
    const row = document.createElement('tr');
    row.dataset.id = transaction.id;
    row.className = transaction.amount > 0 ? 'positive' : 'negative';

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
    `;

    tableBody.appendChild(row);
}

/**
 * Удаление транзакции по ID
 * @param {string} id - идентификатор транзакции
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    document.querySelector(`#transactionTable tr[data-id="${id}"]`).remove();
    calculateTotal();
}

/**
 * Подсчет общей суммы транзакций
 */
function calculateTotal() {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('totalAmount').textContent = total;
}

/**
 * Отображение подробной информации о транзакции
 * @param {string} id - идентификатор транзакции
 */
function showDetails(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (transaction) {
        const detailsElement = document.getElementById('details');
        detailsElement.innerHTML = `
            <strong>ID:</strong> ${transaction.id}<br>
            <strong>Дата:</strong> ${transaction.date}<br>
            <strong>Категория:</strong> ${transaction.category}<br>
            <strong>Описание:</strong> ${transaction.description}<br>
            <strong>Сумма:</strong> ${transaction.amount}
        `;
    }
}