<?php
    include("function.php");

    $username = get('Username');
    $password = hash('sha256', get('Password'));
    
    $result = select("SELECT * FROM users WHERE Username='$username';");
    if (empty($result)) {
        $res["success"] = false;
        $res["error"] = "Wrong username";
        echo json_encode($res);
        return;
    }

    if ($result[0]['Password'] == $password)  {
        $res["success"] = true;
        $res["userID"] = $result[0]['UserID'];
        $res["userRole"] = strval($result[0]['UserRole']);
        $res["age"] = $result[0]['Age'];
        $res["firstName"] = strval($result[0]['FirstName']);
        $res["lastName"] = strval($result[0]['LastName']);
        echo json_encode($res);
        return;
    }

    $res["success"] = false;
    $res["error"] = "Wrong password";
    echo json_encode($res);
?>