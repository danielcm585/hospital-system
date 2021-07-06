<?php
    include("function.php");

    $ret = select("SELECT * FROM doctors;");
    echo json_encode($ret);
?>