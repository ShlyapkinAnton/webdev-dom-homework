import { register } from "./api.js";

export function register() {
    const regButton = document.getElementById('reg-button');
    const nameInputElement = document.getElementById('name-input');
    //const loginInputElement = document.getElementById('login-input');
    //const passwordInputElement = document.getElementById('password-input');

    regButton.addEventListener("click", () => {
        console.log('reg');
        register({
            login: loginInputElement.value,
            name: nameInputElement.value,
            password: passwordInputElement.value,
        })
    })
};