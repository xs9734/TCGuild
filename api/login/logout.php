<?php
/**
 * Created by PhpStorm.
 * User: Igor Orenha
 * Date: 26/01/2017
 * Time: 17:47
 */


// iniciando a sessao
$ses = new Session;
// iniciando a sessao
$ses->start();

// destruindo a sessao
$ses->destroy();
// destruindo objeto
unset($ses);

header("Location: ./");
?>