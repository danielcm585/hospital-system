const register = async () => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = parseInt(document.getElementById("age").value);
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if (firstName.length == 0) {
        alert("First name can't be empty");
        return;
    }
    if (lastName.length == 0) {
        alert("Last name can't be empty");
        return;
    }
    if (username.length == 0) {
        alert("Username can't be empty");
        return;
    }
    if (!age) {
        alert("Age can't be empty");
        return;
    }
    if (email.length == 0) {
        alert("Email can't be empty");
        return;
    }
    if (password.length < 8) {
        alert("Password must consist 8 or more characters");
        return;
    }

    // throw to register.php and make query
    let req = {
        "FirstName": firstName,
        "LastName": lastName,
        "Age": age,
        "Email": email,
        "Username": username,
        "Password": password
    };
    let res = null;
    
    try {
        await fetch('/api/register.php', {
            method: 'POST',
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(data => {res = data});   
    }
    catch {
        res = {
            "success": false,
            "error": "internal error"
        }
    }

    if (!res["success"]) {
        alert(res["error"]);
        return;
    }
    
    // navigate to login
    location.href = "/login";
}