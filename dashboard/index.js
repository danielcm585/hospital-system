let userID = parseInt(localStorage.userID);
let userRole = localStorage.userRole;
let username = localStorage.username;
let age = localStorage.age;
let firstName = localStorage.firstName;
let lastName = localStorage.lastName;

const apply = async (doctorID) => {
    let req = {
        "UserID": userID,
        "DoctorID": doctorID,
        "FirstName": firstName,
        "LastName": lastName,
        "Age": age
    };
    let res = null;

    try {
        await fetch('/api/apply.php', {
            method: 'POST',
            body: JSON.stringify(req)
        })
        //.then(response => response.json())
        //.then(data => {res = data});   
    }
    catch {}
    
    // navigate to dashboard
    location.href = "/dashboard";
}

const cancel = async (doctorID) => {
    let req = {
        "UserID": userID,
        "DoctorID": doctorID
    };
    let res = null;

    try {
        await fetch('/api/cancel.php', {
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
    
    // navigate to dashboard
    location.href = "/dashboard";
}

const remove = async (doctorID) => {
    // erase from doctors and patients
    let req = {
        "DoctorID": doctorID
    };
    let res = null;

    try {
        await fetch('/api/remove.php', {
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

    // navigate back to dashboard
    location.href = "/dashboard";
}

const getDoctor = async () => {
    let response1 = await fetch('/api/doctor.php');
    let doctors = await response1.json();
    let response2 = await fetch('/api/patient.php');
    let patients = await response2.json();

    let ret = '';
    ret += `
        <div class="doctor">
    `
    doctors.forEach (doctor => {
        if (doctor.Capacity > 0) {
            ret += `
                <div id="card">
            `
            ret += `
                <div id="doctor${doctor.DoctorID}">
                    <h3>
                        dr. ${doctor.FirstName} ${doctor.LastName} <br>
                    </h3>
                    <img src="/image/D${doctor.DoctorID}.png">
                    <hr>
                    <div class="subtitle">
                        ${doctor.Description}
                    </div>
            `;
            if (userRole == "admin") {
                ret += `
                    <button onClick="location.href='patient.html?${doctor.DoctorID}'")">Patients</button> <br>
                    <button onClick="remove(${doctor.DoctorID})">Remove</button>
                `;
            }
            else {
                let applied = 0;
                patients.forEach (patient => {
                    if (patient.DoctorID == doctor.DoctorID && patient.UserID == userID) {
                        applied = 1;
                    }
                })
                if (applied) {
                    ret += `
                        <button onClick="cancel(${doctor.DoctorID})">Cancel</button>
                    `;
                }
                else {
                    ret += `
                        <button onClick="apply(${doctor.DoctorID})">Apply</button>
                    `;
                }
            }
            ret += `
                    </div>
                </div>
                <br>
            `;
        }
    })
    ret += `
        </div>
    `
    
    document.getElementById('doctorList').innerHTML = ret;
    if (userRole == "admin") {
        document.getElementById('addDoctor').innerHTML = `
            <input id="button" type="submit" value="Add" onClick="location.href='/add'">
        `
    }

    // <button onClick="location.href='/add'">Add</button>

    // if (userRole == "admin") {
    //     document.getElementsByClassName('navbar_menu').innerHTML = `
    //         <li class="navbar_items">
    //             <a href="/api/logout.php" class="navbar_links">Logout</a>
    //         </li>
    //         <li class="navbar_items">
    //             <a href="/add" class="navbar_links">Add</a>
    //         </li>
    //     `;
    // }
}

getDoctor();