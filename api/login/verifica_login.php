<?php
/**
 * Created by PhpStorm.
 * User: luana
 * Date: 03/09/2019
 * Time: 16:16
 */

// iniciando a sessao
$ses = new Session;
// iniciando a sessao
$ses->start();

// checando a sessao
if(!$ses->check()) {

    switch ($url[0]){
        case 'terms':
            echo $Pagina = carregaTema("termosdeuso");
            break;
        case 'access':
            include('./api/login/loginAcess.php');
            break;

        default:
            echo '<script>window.location.href = "'.$path_Link.'/login";</script>';
            //header('Location: ./login');
            exit();

    }
} else {

    $TituloSite = $Logo1;

    $UserId = $ses->getNode('UserId');
    $UserIdGrupo = $ses->getNode('UserIdGrupo');
    $UserNome = $ses->getNode('UserNome');
    $UserEmail = $ses->getNode('UserEmail');
    $UserSenha = $ses->getNode('UserSenha');
    $UserTipo = $ses->getNode('UserTipo');
    $UserSituacao = $ses->getNode('UserSituacao');
    $UserIdFornecedor = $ses->getNode('UserIdFornecedor');
    $UserIdMarca = $ses->getNode('UserIdMarca');
    $UserIdAgencia = $ses->getNode('UserIdAgencia');
    $UserAdmin = $ses->getNode('UserAdmin');
    $Limites = $ses->getNode('Limites');
    $idEmpresa = $ses->getNode('idEmpresa');

    $DthAtual = date('Y-m-d H:i:s');
    $IdSessao = $ses->getId();


    $Limites = explode(',', $Limites);

    $SelEmpresaLogada = "SELECT * FROM empresas WHERE id = '$idEmpresa' LIMIT 1";
    $SelEmpresaLogada = $conn->query($SelEmpresaLogada);
    $SelEmpresaLogadaTt = $SelEmpresaLogada->rowCount();

    if($SelEmpresaLogadaTt > 0) {
        $SelEmpresaLogadaRow = $SelEmpresaLogada->fetchObject();
        $LogoEmpresa = $SelEmpresaLogadaRow->logomarca;
        $TipoEmpresa = $SelEmpresaLogadaRow->tipoempresa;
        $RazaoSOcialEmpresaLogada = $SelEmpresaLogadaRow->razaoSocial;
        //tipo de empresas
        /*
         * 1 - marca
         * 2 - fornecedor
         * 3 - agencia
         */

    }
    /*VALIDACAO PARA QUITAR USUARIO*/


    if(empty($_SESSION['node']['UserIdAdmin'])) {
        $SelKickUser = "SELECT * FROM ip_registro WHERE IdUser = '$UserId' ORDER BY Id DESC LIMIT 1";
        $SelKickUser = $conn->query($SelKickUser);
        $SelKickUserTt = $SelKickUser->rowCount();

        if ($SelKickUserTt == '0') {

            // destruindo a sessao
            $ses->destroy();
            // destruindo objeto
            unset($ses);

            header("Location: ./");
        } else {

            $SelKickUserRow = $SelKickUser->fetchObject();

            if ($IdSessao != $SelKickUserRow->IdSessao) {

                // destruindo a sessao
                $ses->destroy();
                // destruindo objeto
                unset($ses);

                header("Location: ./");

            }


        }
    }
    /*VALIDACAO PARA QUITAR USUARIO*/

    /*renova session user to kick*/
    $dthAtual = date('Y-m-d H:i:s');
    $PaginaSalveKick = $url[0];


    $SQLUPDATEKICK = "UPDATE ip_registro SET DthCad = '$dthAtual', Pagina = '$PaginaSalveKick' WHERE IdUser = '$UserId'";
    $conn->query($SQLUPDATEKICK);
    /*renova session user to kick*/



    /*TRAVA TELA DEPOIS DA IMPORTAÇÃO*/


    $SelVerTrava = "SELECT * FROM centraldearquivosPrenderEmpresas WHERE idempresa = '$idEmpresa' AND situacao = '1' LIMIT 1";
    $SelVerTrava = $conn->query($SelVerTrava);
    $SelVerTravaTt = $SelVerTrava->rowCount();

    //$SelVerTravaTt = 0;
    if($SelVerTravaTt >0){
        $arrayListaLibera = array('menu', 'logout', 'liberaempresa', 'travaload', 'notificacoesRqst','liberatrava', 'usuariovoltaradmin');
        if(in_array($url[0], $arrayListaLibera)){

            if($url[0] == 'travaload'){

                include('codigos/centradearquivos/travaimportacaoarquivosLoad.php');
                exit();
            }else if($url[0] == 'liberatrava'){

                include('codigos/centradearquivos/liberatrava.php');
                exit();
            }


        } else {
            if($url[1] == 'mudastatusfechamento'){
                include('codigos/fechamentoroyalty/mudastatusfechamento.php');
                exit();
            }else if($url[1] == 'nfdeletefechameto'){
                include('codigos/notasfiscais/delnf.php');
                exit();
            } else {
                include('codigos/centradearquivos/travaimportacaoarquivos.php');
            }

            exit();
        }




    }
    /*TRAVA TELA DEPOIS DA IMPORTAÇÃO*/





    switch ($url[0]){
        case 'menu':
            include('codigos/menu/menu_left.php');
            break;
        case 'cronreadimportfechamento':
            include('cron/ReadImportFechamento.php');
            break;
        case 'dashboard':
            include('codigos/dashboard/dashboard.php');
            break;
        case 'prestacao_contas':
            include('codigos/dashboard_agenciados/base.php');
            break;
        case 'prestacao_contasrqts':
            include('codigos/dashboard_agenciados/conteudo.php');
            break;
        case 'logout':
            include('codigos/login/logout.php');
            break;
        case 'notificacoesRqst':
            include('codigos/notificacoes/notificacoes.php');
            break;
        case 'consultacnpj':
            include('codigos/consultacnpj/consultacnpj.php');
            break;
        case 'consultacnpjstep1':
            include('codigos/consultacnpj/consultacnpjstep1.php');
            break;
        case 'consultacnpjstep2':
            include('codigos/consultacnpj/consultacnpjstep2.php');
            break;
        case 'consultacnpjlogs':
            include('codigos/consultacnpj/consultacnpjcarregalogs.php');
            break;
        case 'usuarios':

            if(isset($url[1])){

                if($url[1]=='editar'){
                    include('codigos/usuarios/cadastro.php');
                } else if($url[1]=='cadastro'){
                    include('codigos/usuarios/cadastro.php');
                } else if($url[1]=='save'){
                    include('codigos/usuarios/save.php');
                } else if($url[1]=='usuarios'){
                    include('codigos/limites/usuarios.php');
                } else if($url[1]=='usuariosload'){
                    include('codigos/limites/usuariosLoad.php');
                } else {
                    header("Location: ../usuarios");
                }
            } else {
                include('codigos/usuarios/usuarios.php');
            }

            break;
        case 'financeiro':

            if(isset($url[1])){

                if($url[1]=='load'){
                    include('codigos/financeiro/load.php');
                } else if($url[1]=='loadEditar'){
                    include('codigos/financeiro/editar.php');
                } else if($url[1]=='loadEditarsave'){
                    include('codigos/financeiro/save.php');
                } else if($url[1]=='gerarboleto'){
                    include('codigos/financeiro/gerarboleto.php');
                } else {
                    include('codigos/financeiro/index.php');
                }
            } else {
                include('codigos/financeiro/index.php');
            }

            break;

        case 'usuariosRqst':
            include('codigos/usuarios/usuariosLista.php');
            break;
        case 'usuariologinadmin':
            include('codigos/usuarios/usuariologinadmin.php');
            break;
        case 'usuariovoltaradmin':
            include('codigos/usuarios/usuariovoltaradmin.php');
            break;
        case 'suportetoken':
            include('codigos/usuarios/TokenSuporte.php');
            break;
        case 'usuarioatvinatv':
            include('codigos/usuarios/usuarioativainativa.php');
            break;
        case 'limites':
            if(isset($url[1])){

                if($url[1]=='editar'){
                    include('codigos/limites/editar.php');
                } else if($url[1]=='cadastro'){
                    include('codigos/limites/cadastro.php');
                } else if($url[1]=='save'){
                    include('codigos/limites/save.php');
                } else if($url[1]=='usuarios'){
                    include('codigos/limites/usuarios.php');
                } else if($url[1]=='usuariosload'){
                    include('codigos/limites/usuariosLoad.php');
                } else {
                    header("Location: ../limites");
                }
            } else {
                include('codigos/limites/limites.php');
            }

            break;
        case 'limitesLoad':
            include('codigos/limites/limitesLoad.php');
            break;
        case 'img':
            include('codigos/fotos/load.php');
            break;
        case 'meuperfil':
            include('codigos/usuarios/meuperfil.php');
            break;
        case 'meuperfilload':
            include('codigos/usuarios/meuperfilload.php');
            break;
        case 'meuperfilsave':
            include('codigos/usuarios/meuperfilsave.php');
            break;
        case 'empresas':
            if(isset($url[1])){

                if($url[1]=='editar'){
                    include('codigos/empresas/editar.php');
                } else if($url[1]=='cadastro'){
                    include('codigos/empresas/cadastro.php');
                } else if($url[1]=='empresascadastroload'){
                    include('codigos/empresas/cadastroLoad.php');
                } else if($url[1]=='empresascadastroadd'){
                    include('codigos/empresas/cadastroadd.php');
                } else if($url[1]=='save'){
                    include('codigos/empresas/save.php');
                } else if($url[1]=='empresasvisualizar'){
                    include('codigos/empresas/visualizar.php');
                } else if($url[1]=='editaremp'){
                    include('codigos/empresas/editaremp.php');
                } else if($url[1]=='empresasload'){
                    include('codigos/empresas/empresasload.php');
                } else if($url[1]=='empresaajuste'){
                    include('codigos/empresas/ajustetabela.php');
                } else if($url[1]=='contatos'){
                    include('codigos/empresas/empresaContatos.php');
                } else if($url[1]=='contatosdel'){
                    include('codigos/empresas/empresaContatosDel.php');
                } else if($url[1]=='gestaofinanceira'){
                    include('codigos/empresas/gestaofinanceira.php');
                } else {
                    header("Location: ../empresas");
                }
            } else {
                include('codigos/empresas/empresas.php');
            }
            break;
        case 'produtos':
            if(isset($url[1])){

                if($url[1]=='cadastro'){
                    include('codigos/produtos/editar.php');
                } else if($url[1]=='tiporoyalty'){
                    include('codigos/produtos/tiporoyalty.php');
                } else if($url[1]=='cadastroload'){
                    include('codigos/produtos/editarload.php');
                } else if($url[1]=='cadastroload1'){
                    include('codigos/produtos/editarload1.php');
                } else if($url[1]=='save'){
                    include('codigos/produtos/save.php');
                }  else if($url[1]=='listagemload'){
                    include('codigos/produtos/listagemload.php');
                } else if($url[1]=='view'){
                    include('codigos/produtos/detalhe.php');
                } else if($url[1]=='sts'){
                    include('codigos/produtos/mudastatus.php');
                } else if($url[1]=='verificaduplicado'){
                    include('codigos/produtos/revisarcodduplicado.php');
                } else {
                    header("Location: ../produtos");
                }
            } else {
                include('codigos/produtos/listagem.php');
            }
            break;
        case 'contratos':
            if(isset($url[1])){

                if($url[1]=='cadastroload'){
                    include('codigos/contratos/EditarLoad.php');
                } else if($url[1]=='cadastro'){
                    include('codigos/contratos/editar.php');
                } else if($url[1]=='listagemload'){
                    include('codigos/contratos/listagemload.php');
                }  else if($url[1]=='ver'){
                    include('codigos/contratos/detalhe.php');
                }  else if($url[1]=='apdesa'){
                    include('codigos/contratos/changesituacao.php');
                }  else if($url[1]=='save'){
                    include('codigos/contratos/save.php');
                } else {
                    header("Location: ../contratos");
                }
            } else {
                include('codigos/contratos/listagem.php');
            }
            break;
        case 'chat':
            if(isset($url[1])){

                if($url[1]=='lista'){
                    include('codigos/chat/lista.php');
                } else if($url[1]=='cadastro'){
                    include('codigos/chat/cadastro.php');
                }
            } else {
                include('codigos/chat/lista.php');
            }
            break;
        case 'fechamentoroyalty':
            if(isset($url[1])){

                if($url[1]=='editar'){
                    include('codigos/fechamentoroyalty/editar.php');
                } else if($url[1]=='listagemload'){
                    include('codigos/fechamentoroyalty/listagemload.php');
                } else if($url[1]=='mudastatusfechamento'){
                    include('codigos/fechamentoroyalty/mudastatusfechamento.php');
                } else if($url[1]=='detalhemes'){
                    include('codigos/fechamentoroyalty/detalhemes.php');
                } else if($url[1]=='detalhes'){
                    include('codigos/fechamentoroyalty/fechamentodetalhesbase.php');
                } else if($url[1]=='ver'){
                    include('codigos/fechamentoroyalty/detalhe.php');
                } else if($url[1]=='nfview'){
                    include('codigos/notasfiscais/view_nf_fechamento.php');
                } else if($url[1]=='nfviewload'){
                    include('codigos/notasfiscais/view_nf_fechamentoLoad.php');
                } else if($url[1]=='uploadimpnfe'){
                    include('codigos/fechamentoroyalty/uploadNfImport.php');
                } else if($url[1]=='nfdeletefechameto'){
                    include('codigos/notasfiscais/delnf.php');
                } else {
                    header("Location: ../fechamentoroyalty");
                }
            } else {
                include('codigos/fechamentoroyalty/listagem.php');
            }
            break;
        case 'centraldearquivos':
            if(isset($url[1])){

                if($url[1]=='listagemload'){
                    include('codigos/centradearquivos/centraldearquivosload.php');
                } else if($url[1]=='uploadarquivo'){
                    include('codigos/centradearquivos/uploadarquivo.php');
                } else if($url[1]=='leituratempo'){
                    include('codigos/centradearquivos/leitura_tempo.php');
                } else if($url[1]=='vinculo'){
                    include('codigos/centradearquivos/vinculo.php');
                } else if($url[1]=='descarte'){
                    include('codigos/centradearquivos/descarte.php');
                } else {
                    header("Location: ../centraldearquivos");
                }
            } else {
                include('codigos/centradearquivos/centraldearquivos.php');
            }
            break;
        case 'selosholograficos':
            if(isset($url[1])){

                if($url[1]=='editar'){
                    include('codigos/selosholograficos/editar.php');
                } else if($url[1]=='listagemload'){
                    include('codigos/selosholograficos/listagemload.php');
                } else if($url[1]=='listagemloadEmpresa'){
                    include('codigos/selosholograficos/listagemempresa.php');
                } else if($url[1]=='detalhe'){
                    include('codigos/selosholograficos/detalhe.php');
                } else {
                    header("Location: ../selosholograficos");
                }
            } else {
                include('codigos/selosholograficos/listagem.php');
            }
            break;
        case 'relatorios':
            if(isset($url[1])){

                if($url[1]=='listagemload'){
                    include('codigos/relatorios/listagemload.php');
                } else if($url[1]=='faturamento-total'){
                    include('codigos/relatorios/faturamentototal.php');
                } else if($url[1]=='vendas'){
                    include('codigos/relatorios/vendas.php');
                } else if($url[1]=='royaltygerado'){
                    include('codigos/relatorios/royaltygerado.php');
                } else if($url[1]=='dre'){
                    include('codigos/relatorios/relatorio_dre.php');
                } else if($url[1]=='top5licenciado'){
                    include('codigos/relatorios/relatorio_top5_licenciado.php');
                } else if($url[1]=='top5produtos'){
                    include('codigos/relatorios/relatorio_top5_produtos.php');
                } else if($url[1]=='vendas-contratos'){
                    include('codigos/relatorios/relatorio_venda_contrato.php');
                } else if($url[1]=='vendas-produtos'){
                    include('codigos/relatorios/relatorio_venda_produto.php');
                } else if($url[1]=='vendas-regiao'){
                    include('codigos/relatorios/relatorio_venda_regiao.php');
                } else {
                    header("Location: ../relatorios");
                }
            } else {
                include('codigos/relatorios/listagem.php');
            }
            break;
        case 'crongestor':
            include('cron/Gestor.php');
            break;
        case 'termosdeuso':
            $Pagina = carregaTema("termosdeuso");
            break;
        case 'api_assert_token':
            include('api/assert/Token.php');
            break;
        case 'api_assert_consultacnpj':
            include('api/assert/consultapj.php');
            break;
        case 'api_qualopradora':
            include('api/QualOperadora/consulta.php');
            break;
        case 'asaas':
            include('api/asaas/Cliente.php');
            break;
        case '404':
            include('codigos/errorpages/404.php');
            break;
        case 'fornecedor_marca_agencia':
            include('codigos/migracao/fornecedor_marca_agencia.php');
            break;
        case 'enviaemail':
            include('codigos/enviamail/index.php');
            break;
        case 'enviaemail1':
            include('codigos/enviamail/sendgrid.php');
            break;
        case 'funildevendas':
            include('codigos/funildevendas/index.php');
            break;
        case 'funildevendasdetalhes':
            include('codigos/funildevendas/detalhes.php');
            break;
        case 'funildevendaschangestatus':
            include('codigos/funildevendas/changestatus.php');
            break;
        case 'funilvendassavesingle':
            include('codigos/funildevendas/save_single.php');
            break;
        case 'funilvendassaveline':
            include('codigos/funildevendas/save_line.php');
            break;
        case 'funilvendasloadarquivos':
            include('codigos/funildevendas/loadarquivos.php');
            break;
        case 'funilvendasuploadarquivos':
            include('codigos/funildevendas/uploadarquivos.php');
            break;
        case 'oportunidades':
            include('codigos/oportunidades/index.php');
            break;
        case 'correcoes':
            include('correcoes.php');
            break;
        default:
            //include('codigos/errorpages/404.php');
            include('codigos/dashboard/dashboard.php');
            exit();

    }


}

?>