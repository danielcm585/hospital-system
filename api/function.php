<?php
    include("connection.php");

    function get($name) {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if (isset($_POST[$name])) {
			return $_POST[$name];
		}
		return null;
    }

    function insert($sql) {
        global $connection;
        mysqli_query($connection,$sql);
    }

    function delete($sql) {
        global $connection;
        mysqli_query($connection,$sql);
    }

    function update($sql) {
        global $connection;
        mysqli_query($connection,$sql);
    }

    function select($sql) {
        global $connection;
        $result = mysqli_query($connection,$sql);
        
        if ($result) {
            $ret = Array();
            while ($data = mysqli_fetch_assoc($result)) {
                array_push($ret, $data);
            }
            return $ret;
        }
        return [];
    }
?>