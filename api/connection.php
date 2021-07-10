<?php
    session_start();

    $dbHost = "localhost";
    $dbUser = "root";
    $dbPass = "";
    $dbName = "hospital_system";

    if (!$connection = mysqli_connect($dbHost,$dbUser,$dbPass,$dbName)) {
        die("Failed to connect!");
    }
?>
