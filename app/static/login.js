import {UserLoginModel} from './user_login_model.js';
import {populate_mainpage} from './register.js';
const localhost = 'http://127.0.0.1:5000'
const login_api = '/login'


function send_data_login(){
    let username = document.getElementById("Uname").value;
    let password = document.getElementById("Pass").value;
    console.log(username, password);
    const user_login_model = new UserLoginModel({username: username, password: password})
    login_user(user_login_model)
}

function get_login_page(){
    let login_address = localhost + login_api
    fetch(login_address, {
        method:'GET',
    })
    .then(response => response.json())
    .then(data =>{
        document.getElementById("mainContent").innerHTML = data.html
        document.getElementById('theme-stylesheet').href = `/static/theme/${data.theme}.css`;
        document.getElementById("login").addEventListener("click", send_data_login);
        console.log('Welcome to login page');
    })
    .catch(error => {
        console.error('login failed:', error);
    })
}

function login_user(user_login_model){
    let login_address = localhost + login_api
    console.log(user_login_model);
    console.log(user_login_model.serialise());
    fetch(login_address,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user_login_model.serialise()
    })
    .then(response => response.json())
    .then(data => {
        populate_mainpage(data);
    })    
}

setTimeout(() => {
    setUpListeners();
}, 500)

function setUpListeners(){
    document.getElementById("login_button").addEventListener("click", get_login_page);
    document.getElementById("login_link").addEventListener("click", get_login_page);

}
