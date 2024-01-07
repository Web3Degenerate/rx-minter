<?php
$con = mysqli_connect("https://rxminter.com", "blockchainminter_rx_minter_admin", "$3llBl0ckcha1n1nf0N0w$!$."); 
mysqli_select_db($con, "blockchainminter_rx_minter_thirdweb_v_ten"); 
?>


<?php
//insert.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: https://rxminter.com");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Tyle: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include('db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$name=$data->name; 
$wallet_address=$data->$wallet_address
$email=$data->email;

if($name && $wallet_address && $email){
    $sql = "insert into patients(
        name,
        wallet_address,
        email
    )
    values(
        '$name',
        '$wallet_address',
        '$email'
    )"; 

    $result = mysqli_query($con,$sql);
        if($result){
            $response=array(
                'status' => 'valid'
            );
            echo json_encode($response);            
        }else{
            $response=array(
                'status' => 'invalid'
            );
            echo json_encode($response);
        }
}

?>


<?php
//***************************** view.php **********************************************************************************
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Tyle: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include('../db_connect.php');
require('../db_connect.php');

$result = mysqli_query($con, "SELECT * from patients");

$outp = ""; 
while($rs = mysqli_fetch_array($result)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"' . $rs["name"] . '",';
    $outp .= '"wallet_address":"' . $rs["wallet_address"] . '",';       
    $outp .= '"id":"' . $rs["id"] . '",';
    $outp .= '"email":"' . $rs["email"] . '"}';
}
$outp = '{"records":['.$outp.']}';
echo($outp);

//see https://rxminter.com/php-react/view.php

?>




<?php
//***************************** delete.php **********************************************************************************
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: localhost");

header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Tyle: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include('../db_connect.php');
require('../db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$sql = "delete from patients where id='".$data->id."'";
$result = mysqli_query($con,$sql);

?>



<?php
//***************************** edit.php **********************************************************************************
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Tyle: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include('../db_connect.php');
require('../db_connect.php');

$sql = "select * from patients where id='".$_GET['id']."'";
$result = mysqli_query($con, $sql);

$outp = ""; 
while($rs = mysqli_fetch_array($result)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"' . $rs["name"] . '",';
    $outp .= '"wallet_address":"' . $rs["wallet_address"] . '",';       
    $outp .= '"id":"' . $rs["id"] . '",';
    $outp .= '"email":"' . $rs["email"] . '"}';
}

echo $outp;

//see https://rxminter.com/php-react/edit.php?id=2

?>


<?php
//***************************** update.php **********************************************************************************
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Tyle: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include('../db_connect.php');
require('../db_connect.php');

$data = json_decode(file_get_contents("php://input"));

$id = $data->id; 
$name = $data->name;
$wallet_address = $data->wallet_address;
$email = $data->email;


$sql = "update patients set name='$name',wallet_address='$wallet_address',email='$email' where id=$id";
$result = mysqli_query($con,$sql);

if($result){
    $response=array(
        'status' => 'valid'
    );
    echo json_encode($response);            
}else{
    $response=array(
        'status' => 'invalid'
    );
    echo json_encode($response);
}

?>