<?php 
function db_connect() {
    $servername = "localhost";
    $dbname = "desafio_revvo";       
    $username = "root";     
    $password = "";   
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

?>
