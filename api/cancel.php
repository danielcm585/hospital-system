<?php
    session_start();

    include("function.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $doctorID = get('DoctorID');
        $userID = get('UserID');

        if (!empty($doctorID) && !empty($userID)) {
            delete("DELETE FROM patients WHERE DoctorID=$doctorID AND UserID=$userID;");
            delete("UPDATE doctors Capacity=Capacity+1 WHERE DoctorID=$doctorID;");
            $res["success"] = true;
            return json_encode($res);
        }

        $res["success"] = false;
        $res["error"] = "Error while cancel!";
        echo json_encode($res);
    }
?>