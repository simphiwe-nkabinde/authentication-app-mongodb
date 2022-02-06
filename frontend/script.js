
//register/login page elements
const emailAlert = document.getElementById('emailAlert');
const pwdAlert = document.getElementById('pwdAlert');
const emailInput = document.getElementById('emailInput')
const pwdInput = document.getElementById('pwdInput')
//restricted content elements
const restrictedContent = document.getElementById('restrictedContent')
const errorAlert = document.getElementById('errorAlert')

function login(event) {
    event.preventDefault();
    //reset alerts
    emailAlert.innerText = '';
    pwdAlert.innerText = '';
    //form validation
    if (!emailInput.checkValidity()) {
        emailAlert.innerText = emailInput.validationMessage;
        return;
    }
    if (!pwdInput.checkValidity()) {
        pwdAlert.innerText = pwdInput.validationMessage;
        return;
    }

    // get input values
    let email = emailInput.value;
    let pwd = pwdInput.value;

    let data = { email: email, password: pwd }
    
    //POST request
    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.errors) {
            //set alerts
            emailAlert.innerText = res.errors.email;
            pwdAlert.innerText = res.errors.password;
        } else if (res.user) {
            console.log(res.user);
            window.location.assign('restricted.html')
            console.log(document.cookie);
            // loadRestrictedContent();
        }
    })
    .catch(err => console.log('err: ', err))
}

function register(event) {
    event.preventDefault();
    // reset passweord alert
    emailAlert.innerText = '';
    pwdAlert.innerText = '';
    //form validation
    if (!emailInput.checkValidity()) {
        emailAlert.innerText = emailInput.validationMessage;
        return;
    }
    if (!pwdInput.checkValidity()) {
        pwdAlert.innerText = pwdInput.validationMessage;
        return;
    }

    // get input values
    let email = emailInput.value;
    let pwd = pwdInput.value;

    let data = { email: email, password: pwd }
    
    //POST request
    fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.errors) {
            //set alerts
            console.log(res.errors);
            emailAlert.innerText = res.errors.email;
            pwdAlert.innerText = res.errors.password;
        } else {
            console.log(res,'logged in');
            window.location.assign('login.html')
        }
    })
    .catch(err => console.log('error: ', err))
}

function loadRestrictedContent() {
    // return
    //get restricted content
    fetch('http://localhost:3000/restricted')
    .then(res => res.json())
    .then(res => {
        if (res.content) {
            console.log(res);
            restrictedContent.innerText = res.content
        } else if (res.error) {
            console.log(res);
            errorAlert.innerText = res.error
        }
    })
    .catch(err => console.log('error: ', err))
}