<?php
    session_start();

    include("function.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $firstName = get('FirstName');
        $lastName = get('LastName');
        $description = get('Description');
        $capacity = get('Capacity');

        insert("INSERT INTO doctors (FirstName,LastName,Description,Capacity) VALUES ('$firstName','$lastName','$description',$capacity);");
        $res["success"] = true;
        echo json_encode($res);
    }
?>