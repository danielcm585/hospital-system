<?php
    session_start();

    include("function.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $doctorID = get('DoctorID');
        $userID = get('UserID');
        $firstName = get('FirstName');
        $lastName = get('LastName');
        $age = get('Age');

        if (!empty($doctorID) && !empty($userID)) {
            insert("INSERT INTO patients (DoctorID,UserID,FirstName,LastName,Age) VALUES ($doctorID,$userID,'$firstName','$lastName',$age);");
            update("UPDATE doctors SET Capacity=Capacity-1 WHERE DoctorID=$doctorID;");
        }
        else echo "Error while apply!";
    }
?>