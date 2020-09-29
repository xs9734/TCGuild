<?php
/**
 * Created by PhpStorm.
 * User: orenh
 * Date: 28/09/2020
 * Time: 23:17
 */

$useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://api.tibiadata.com/v2/guild/Ten+Commandments.json");
curl_setopt ($ch, CURLOPT_USERAGENT, $useragent); // set user agent
curl_setopt($ch, CURLOPT_REFERER, 'http://api.tibiadata.com/');
curl_setopt($ch, CURLOPT_FAILONERROR, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); // return into a variable
curl_setopt($ch, CURLOPT_TIMEOUT, 3); // times out after 4s
curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 10);
$result = curl_exec ($ch);
curl_close ($ch);



$result1 = json_decode($result);

//var_dump($result1->guild->members[0]);

foreach($result1->guild->members AS $Key=>$Value){
    //var_dump($Value->rank_title);
    $title_rank = $Value->rank_title;
    $characters_rank = $Value->characters;

    foreach($characters_rank AS $Key1=>$Value1){
        //var_dump($Value1);

        $name = $Value1->name;
        $nick = $Value1->nick;
        $level = $Value1->level;
        $vocation = $Value1->vocation;
        $joined = $Value1->joined;
        $status = $Value1->status;

        $SQL = "SELECT * FROM guild_members WHERE name = '$name' ORDER BY id DESC LIMIT 1";
        $SQL = $conn->query($SQL);
        $SQLTt = $SQL->rowCount();

        if($SQLTt == 0){
            $SQL1 = "INSERT INTO guild_members 
(rank_title,name,nick,lvl,vocation,joined,status,dtAtualizado) 
VALUES 
('$title_rank', '$name', '$nick', '$level', '$vocation', '$joined', '$status', NOW() )
";
            $conn->query($SQL1);
            $id_member = $conn->lastInsertId();

        } else {
            $SQLRow = $SQL->fetchObject();
            $id_member = $SQLRow->id;

            $SQL1 = "UPDATE guild_members SET rank_title = '$title_rank', lvl = '$level', status = '$status' WHERE id = '$id_member'";
            $conn->query($SQL1);
        }

        echo $SQL2 = "SELECT * FROM guild_member_time_online WHERE id_member = '$id_member' AND status = '0'";
        echo "<br>";
        $SQL2 = $conn->query($SQL2);
        echo $SQL2Tt = $SQL2->rowCount();
        echo "<br>";

        if($SQL2Tt == 0){

            if($status != 'offline'){

                $SQL3 = "INSERT INTO guild_member_time_online 
(id_member,login,logout,status) VALUES 
('$id_member', NOW(), '', 0)";
                $conn->query($SQL3);

            }

        } else {
            if($status == 'offline'){
                $SQL2Row = $SQL2->fetchObject();

                $id_member_time = $SQL2Row->id;
                $date_now = date("Y-m-d H:i:s");

                $SQL3 = "UPDATE guild_member_time_online SET logout = '$date_now', status='1' WHERE id = '$id_member_time'";
                $conn->query($SQL3);

            }
        }







    }

}
