<?php
/**
 * Created by PhpStorm.
 * User: orenh
 * Date: 19/09/2020
 * Time: 11:08
 */



function timePHPProcess($start = null) {
    $mTime = microtime(); // Pega o microtime
    $mTime = explode(' ',$mTime); // Quebra o microtime
    $mTime = $mTime[1] + $mTime[0]; // Soma as partes montando um valor inteiro

    if ($start == null){
        return $mTime;
    }else{
        return round($mTime - $start, 6);
    }
}

function carregaTema($Nome, $Tipo="html", $path_tema="", $ses = '', $conn=''){
    if($Tipo == "html")
    {
        $Caminho = $path_tema.$Nome.".html";

        if(file_exists($Caminho))
        {
            return file_get_contents($Caminho, FILE_USE_INCLUDE_PATH);
        }
        else
        {
            // se nao for possivel carregar o arquivo, e impresso um comentario
            return "<!-- Erro ao carregar arquivo ".$Nome." -->";
        }

    }
    else
    {
        $Caminho = $path_tema.$Nome.".".$Tipo;
        include($Caminho);
    }


}