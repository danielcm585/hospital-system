const getPatient = async () => {
    const doctorID = location.search.slice(1);

    let response = await fetch('/api/patient.php');
    let patients = await response.json();

    let ret = '';
    patients.forEach (patient => {
        if (patient.DoctorID == doctorID) {
            ret += `
                <div id="card">
                    <div id="patient${patient.PatientID}">
                        <div class="title">
                            ${patient.FirstName} ${patient.LastName} <br>
                        </div>
                        <div class="subtitle">
                            ${patient.Age} years old
                        </div>
                    </div>
                </div>
                <br>
            `
        }
    })

    document.getElementById('patientList').innerHTML = ret;
}

getPatient();