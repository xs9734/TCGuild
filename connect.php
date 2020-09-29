<?php
/**
 * Created by PhpStorm.
 * User: Igor Orenha
 * Date: 18/09/2020
 * Time: 23:37
 */



$host  =        "localhost"; //endereço do seu servidor MySQL
$database       =       "guild"; //o database que conterá sua tabela, muitas vezes seu próprio login
$login_db       =       "root"; //login usado no MySQL
$senha_db       =       ""; //senha usado no MySQL

try
{
    $conn = new PDO("mysql:host={$host};dbname={$database}",$login_db,$senha_db);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
