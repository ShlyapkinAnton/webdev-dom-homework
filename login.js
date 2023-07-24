import { loginComment, setToken, token } from "./api.js";
import { nameInputElement } from "./main.js";
 
const loginButton  = document.querySelector('#login-button')
const registrationButton  = document.querySelector('#reg-button');
const loginInputElement = document.getElementById('login-input');
const passwordInputElement = document.getElementById('password-input');

export function login() {
    loginButton.addEventListener("click", () => {
        loginComment(loginInputElement.value, passwordInputElement.value)       
        .then((responseData) => {  
            //console.log(responseData); 
            //console.log(token);                    
            setToken(responseData.user.token)
            console.log(token);
            localStorage.setItem('token', responseData.user.token)
            localStorage.setItem('name', responseData.user.name)
            return responseData.user.name
        }).then((response) => {
            //console.log(response);
            //setIsLogin(true) // авторирезирована или нет, переписывани значения 
            nameInputElement.setAttribute("readonly", "readonly")
            //renderApp(isLogin, call) // отрисовка и readOnly + функции
            document.getElementById('add-form-disable').style.display = 'flex';
            document.getElementById('login-form').style.display = 'none'; 
            nameInputElement.value = response;
        })
        .catch((error) => {
            alert(error.message)
            console.warn(error);
        })
    })
}
    
export function registration() {
    registrationButton.addEventListener('click', () => {
        regComment(loginInputElement.value, passwordInputElement.value, nameInputElement.value)
        .then((responseDate) => {
            setToken(responseDate.user.token)
            localStorage.setItem('token', responseDate.user.token)
            localStorage.setItem('name', responseDate.user.name)
            return responseDate.user.name
        })
        .then((response) => {
            //console.log(response);
            //setIsLogin(true)
            //renderApp(isLogin, call)
            nameInput.value = response
        })
        .catch((error) => {
            alert(error.message)
        }) 
    })
}