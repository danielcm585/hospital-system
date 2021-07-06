<?php
    session_start();

    include("function.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $firstName = get('FirstName');
        $lastName = get('LastName');
        $age = get('Age');
        $email = get('Email');
        $username = get('Username');
        $password = hash('sha256', get('Password'));

        $check = select("SELECT * FROM users WHERE Username='$username'");
        if (!empty($check)) {
            $ret["success"] = false;
            $ret["error"] = "Username has been taken";
            echo json_encode($ret);
            return;
        }

        insert("INSERT INTO users (FirstName,LastName,Age,Username,Email,Password) VALUES ('$firstName','$lastName',$age,'$username','$email','$password');");
        $ret["success"] = true;
        echo json_encode($ret);
    }
?>