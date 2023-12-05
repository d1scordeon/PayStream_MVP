import { BankCard } from './bank_card.js';
import {UserRegisterModel} from './user_register_module.js';
import {set_user, get_my_transaction, collect_transaction_data} from './transaction.js';

const localhost = 'http://127.0.0.1:5000'
const register_api = '/register'

let current_section;

function send_data(){
    let username = document.getElementById("Uname").value;
    let password = document.getElementById("Pass").value;
    let passconfirm = document.getElementById("PassConfirm").value;
    let email = document.getElementById("Email").value;
    let cardnumber = document.getElementById("CardNumber").value;
    let expdate = document.getElementById("ExpDate").value;
    let cvv = document.getElementById("CVV").value;
    console.log(username, password, passconfirm, email, cardnumber, expdate, cvv)
    const bankcard = new BankCard({cardnumber: cardnumber, expdate: expdate, cvv: cvv})
    const user_register_model = new UserRegisterModel({username: username, password: password, email: email, bankcard: bankcard});
    register_user(user_register_model);
}

function get_registration_page(){
    let register_address = localhost + register_api
    fetch(register_address, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("mainContent").innerHTML = data.html
        document.getElementById('theme-stylesheet').href = `/static/theme/${data.theme}.css`;
        document.getElementById("register_button").addEventListener("click", send_data);
        console.log('Welcome to registration Page');
    })
    .catch(error => {
        console.error('Registration failed:', error);
    })
}

function register_user(user_register_model){
    let register_address = localhost + register_api
    console.log(user_register_model);
    console.log(user_register_model.serialise());
    fetch(register_address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user_register_model.serialise()
    })
    .then(response => response.json())
    .then(data => {
        populate_mainpage(data);
    })
    .catch(error => {
        console.error('Registration failed:', error);
    })
}

export function populate_mainpage(data) {
    document.getElementById("mainContent").innerHTML = data.html;
    document.getElementById('theme-stylesheet').href = `/static/theme/${data.theme}.css`;
    document.getElementById("username").innerHTML = data.user.username;
    document.getElementById("welcome_username").innerHTML = `Ласкаво просимо, ${data.user.username}!`;
    document.getElementById("email").innerHTML = data.user.email;
    document.getElementById("cardnumber").innerHTML = data.user.cardnumber;
    document.getElementById("expdate").innerHTML = data.user.expdate;
    document.getElementById("cvv").innerHTML = data.user.cvv;

    document.getElementById("main_link").addEventListener("click", function () { showSection('welcome-section'); });
    document.getElementById("trans_link").addEventListener("click", function () { showSection('transactions'); });
    document.getElementById("trans_history_link").addEventListener("click", function () {
        console.log('IOIOIOIOIO'); showSection('transaction-history'); });
    document.getElementById("user_info_link").addEventListener("click", function () { showSection('user-info'); });
    document.getElementById("send_transaction_button").addEventListener("click", collect_transaction_data);

    set_user(data.user.username)
    showSection('welcome-section');

    console.log('Registration successful:', data);
}

export function showSection(sectionId) {
    if(sectionId === 'transaction-history'){
        console.log('NOOOOOOOOOOOOOOOOOOO!')
        get_my_transaction()
    }
    // Показуємо обрану секцію
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        if(current_section){
            current_section.style.display = 'none';
        }
        current_section = selectedSection
        current_section.style.display = 'block';
    }
}

setTimeout(() => {
    setUpListenersForMainPage();
}, 500)

function setUpListenersForMainPage(){
    document.getElementById("registration_button").addEventListener("click", get_registration_page);
    document.getElementById("registration_link").addEventListener("click", get_registration_page);

}