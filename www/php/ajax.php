<?php
$mysqli = new mysqli("db.sinners.be", "nathan655", "lfHgqe71AsEJ", "nathan655_xapture");
if($mysqli->connect_error) {
    exit('Could not connect');
}

$sql = "SELECT * FROM Quote";
$rows = [];
$num = $_POST['text'];
$result = $mysqli->query($sql);
while($row = $result->fetch_row()) {
    $rows[] = $row;
}
//return $rows;
echo json_encode($rows);