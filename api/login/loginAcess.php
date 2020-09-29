<?php
/**
 * Created by PhpStorm.
 * User: orenh
 * Date: 19/09/2020
 * Time: 11:24
 */



$login = (trim($_POST['InpLogin']));
$senha = md5(trim($_POST['InpPass']));


$SelLogin = "SELECT usr.*, usrl.limit_selected FROM users usr LEFT JOIN limit_group usrl ON usrl.id = usr.limit_user WHERE usr.login = '$login' LIMIT 1";
$SelLogin = $conn->query($SelLogin);
$SelLoginTt = $SelLogin->rowCount();

