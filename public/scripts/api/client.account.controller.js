/* when logout button is submitted * need to add functionality */
function submitLogout() {

}

/* when log in form is submitted */
function submitLogin() {
    let userName = document.getElementById('loginUser').value;
    let password = document.getElementById('loginPwd').value;
    authenticationCall(userName, password);
}

function submitReg() {
    let userName = document.getElementById('registerUser').value;
    let password = document.getElementById('registerPwd').value;

    registrationCall(userName, password);
}

/* Passes username & password to server for authentication */
function authenticationCall(userName, password) {
    console.log("Attempt to authenticate");
    console.log("username: " + userName);
    console.log("password: " + password);
    console.log("--------------------------");
    getAuthenticationRequest(userName, password);   
}

function registrationCall(userName, password) {
    console.log("Attempt to create user");
    console.log("username: " + userName);
    console.log("password: " + password);
    console.log("--------------------------");
    postNewRegistration(userName, password);

}

//API CALLS TO ACCOUNTS

async function getAuthenticationRequest(userName, password) {
    let url = CONFIG.ACCOUNTS_ACCESS_POINT;
    url = url.concat("?userName=", userName, "&passHash=", password);
    // let data = {
    //     userName: userName,
    //     passHash: password
    // }

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    });

    const authentication = await response.json();

    if (authentication.Authenticated) {
        setCookie("username", userName, 30);
    }
    console.log(authentication.Authenticated);


    return authentication;
}

async function postNewRegistration(userName, password) {
    let url = CONFIG.ACCOUNTS_ACCESS_POINT;
    let data = {
        userName: userName,
        password: password,
    }

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        method: "POST"
    });

    console.log(response.status);
    //return response.status;
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Cookie found, Reroute to account page");
    } else {
        alert("No cookie, going to login page");
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}