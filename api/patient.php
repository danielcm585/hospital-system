<?php
    include("function.php");

    $ret = select("SELECT * FROM patients;");
    echo json_encode($ret);
?>