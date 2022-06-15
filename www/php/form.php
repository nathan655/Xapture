<?php
$servername = "db.sinners.be";
$username = "nathan655";
$password = "lfHgqe71AsEJ";
$dbname = "nathan655_xapture";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
mysqli_select_db($conn, $dbname);
echo "Connected Successfully.";
function DBin($string)
{
    return  trim(htmlspecialchars($string,ENT_QUOTES));
}

$email = $_POST['email'];
$type = $_POST['type'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$complaint = DBin($_POST['complaint']);
$sql = "INSERT INTO ".$type." (firstName,lastName,email,complaint)
     VALUES ('$firstName','$lastName','$email','$complaint')";

if ($conn->query($sql) === TRUE) {
    echo "New complaint created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
//$res = mysqli_query($conn, $query);
//mysqli_query($conn, "INSERT INTO numbers(name, number, email, nick) values ('" . $name . "', '" . $number . "', '" . $email . "', '" . $nick . "');");
//
//
//if ($res->num_rows > 0) {
//    // output data of each row
//    while ($row = $res->fetch_assoc()) {
//        echo "Name: " . $row["name"] . "   Phone Number: " . $row["number"] . "   email: " . $row["email"] . "  Nickname:    " . $row["nick"] . "<br>";
//    }
//} else {
//    echo "0 results";
//}
//mysqli_close($conn);
//echo $email," ", $firstName," ", $lastName," ", $complaint,' ', $type;
function DBout($string)
{
    $string = trim($string);
    return htmlspecialchars_decode($string,ENT_QUOTES);
}
return json_encode("yes");