async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username&&password) {
        const responce = await fetch('/api/users/login', {

        })
    }


}