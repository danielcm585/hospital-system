<?php
    session_start();

    include("function.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $doctorID = get('DoctorID');

        if (!empty($doctorID)) {
            delete("DELETE FROM patients WHERE DoctorID=$doctorID;");
            delete("DELETE FROM doctors WHERE DoctorID=$doctorID;");
            $res["success"] = true;
            echo json_encode($res);
        }

        $res["success"] = true;
        $res["error"] = "Error while remove!";
        echo json_encode($res);
    }
?>