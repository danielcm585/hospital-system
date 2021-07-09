const login = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let req = {
        "Password": password,
        "Username": username
    };
    let res = null;
    
    try {
        await fetch('hospitalsystemcompfest.netlify.app/api/login.php', {
            method: 'POST',
            body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(data => {res = data});   
    }
    catch {
        res = {
            "success" : false,
            "error" : "internal error"
        }
    }

    // not success
    if (!res["success"]) {
        alert(res["error"]);
        return;
    }

    // save role to local storage
    localStorage.setItem('userID',res["userID"]);
    localStorage.setItem('userRole',res["userRole"]);
    localStorage.setItem('username',username);
    localStorage.setItem('age',res["age"]);
    localStorage.setItem('firstName',res["firstName"]);
    localStorage.setItem('lastName',res["lastName"]);
    
    // alert Hello!
    alert("Hello "+username);

    // navigate to dashboard
    location.href = "/dashboard";
}
