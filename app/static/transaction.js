import {MyTransaction} from './user_transaction.js';
import {showSection} from './register.js';
const localhost = 'http://127.0.0.1:5000'
const transactions_api = '/sendTransaction'
const my_transactions_api = '/myTransactions'

let current_user

export function set_user(user){
    current_user = user;
}

export function get_user(){
    return current_user;
}

export function collect_transaction_data(){
    let account_number = document.getElementById("account-number").value;
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;

    let user_transaction = new MyTransaction(get_user(), account_number, amount, description);
    console.log(user_transaction)
    console.log(get_user())
    execute_transaction(user_transaction)
}

function execute_transaction(user_transaction){
    let transaction_address = localhost + transactions_api
    fetch(transaction_address,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:user_transaction.serialise()
    })
    .then(async response => response.json())
    .then(data =>{
        console.log('YES123132!')
        showSection('transaction-history')
        render_my_transactions(data)
    })
    .catch(error => {
        console.error('login failed:', error);
    })
}

export function get_my_transaction(user_transaction){
    let my_transactions_address = localhost + my_transactions_api
    let body_data = `{"username": "${get_user()}"}`
    console.log(body_data)
    fetch(my_transactions_address,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body_data
    })
    .then(async response => response.json())
    .then(data =>{
        render_my_transactions(data)
    })
    .catch(error => {
        console.error('login failed:', error);
    })
}

function render_my_transactions(data){
    console.log(data);
    console.log(data.transactions);
    let parsedData = JSON.parse(data.transactions);
    // Assuming you have a table element with id 'myTable'
    const tableBody = document.getElementById('transaction-history-container');

  tableBody.innerHTML = '';
    // Iterate over the array and append each row to the table
    parsedData.forEach(item => {
      const row = createTableRow(item);
      tableBody.appendChild(row);
    });
}

function createTableRow(data) {
  const tr = document.createElement('tr');

  // Iterate over the object properties and create <td> elements
  Object.keys(data).forEach(key => {
    const td = document.createElement('td');
    td.textContent = data[key];
    tr.appendChild(td);
  });

  return tr;
}

