<?php
/**
 * Created by PhpStorm.
 * User: orenh
 * Date: 19/09/2020
 * Time: 10:59
 */

error_reporting(1);
date_default_timezone_set('America/Sao_Paulo');

/*inicio URL AMIGAVEL*/
$url = (isset($_GET['url'])) ? $_GET['url']:'index.php';
$url = array_filter(explode('/', $url));
/*FIM URL AMIGAVEL*/

header('Content-type: text/html; charset=UTF-8');
include('../connect.php'); //carrega configuracoes basicas como MYSQL entre outros
include('../functions.php'); //Todas as funcoes do sistema
$startTIME = timePHPProcess();

include('login/session.class.php'); //sessao da classe perdsonalizada de login


// iniciando a sessao
$ses = new Session;
// iniciando a sessao
$ses->start();

// checando a sessao
if(!$ses->check()) {

    switch ($url[0]){
        case 'access':
            if(isset($url[1])){
                if($url[1]=='editar'){
                    include('./api/login/loginAcess.php');
                }
            }
            break;
        case 'robot':
            if(isset($url[1])){
                if($url[1]=='guild'){
                    include('./robot/guild.php');
                }
                if($url[1]=='check_members_online'){
                    include('./robot/check_members_online.php');
                }
            }


            break;

        default:
            //echo '<script>window.location.href = "'.$path_Link.'/login";</script>';
            //header('Location: ./login');
            exit();

    }
} else {


}