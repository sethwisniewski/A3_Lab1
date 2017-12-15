<?php
$user = 'root';
$pass = '';
$host = 'localhost';
$db = 'a3_cooperInfo';

//try connecting to the server
$conn = mysqli_connect($host, $user, $pass, $db);
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
  echo 'something done busted!';
  exit;
}

//echo 'connected!';
if (isset($_GET['getVideos'])) {
  $myQuery = "SELECT * FROM video";

  $result = mysqli_query($conn, $myQuery);
  $rows = array();

  while ($row = mysqli_fetch_assoc($result)) {
  $rows[] = $row;
  }
  echo json_encode($rows);
}
//var_dump($rows);
//echo json_encode($rows);

if (isset($_GET["carModel"])) {
  $car = $_GET["carModel"];
  // select one car instead of all of them
  $myQuery = "SELECT * FROM mainmodel WHERE model = '$car'";
  // store the result
  $result = mysqli_query($conn, $myQuery);
  // get the row
  $row = mysqli_fetch_assoc($result);

  // show it on the webpage
  echo json_encode($row);
}
 ?>
