const add = async () => {
    // get doctor data
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let description = document.getElementById("description").value;
    let capacity = parseInt(document.getElementById("capacity").value);

    if (firstName.length == 0) {
        alert("First name can't be empty");
        return;
    }
    if (lastName.length == 0) {
        alert("Last name can't be empty");
        return;
    }
    if (description.length == 0) {
        alert("Description can't be empty");
        return;
    }
    if (!capacity) {
        alert("Capacity can't be empty");
        return;
    }
    
    // add to doctors by fetching add.php
    let req = {
        "FirstName": firstName,
        "LastName": lastName,
        "Description": description,
        "Capacity": capacity
    };
    let res = null;

    try {
        await fetch('/api/add.php', {
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

    if (!res["success"]) {
        alert(res["error"]);
        return;
    }

    // navigate back to dashboard
    location.href = "/dashboard";
}