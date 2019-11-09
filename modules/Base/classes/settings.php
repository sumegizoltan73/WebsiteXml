<?php 
    require_once("modules/Base/classes/Common.php"); 
    
    $config = new Common($pagelang);
    $selectedlang = $config->get_Lang();
    $headertext = (isset($config->Pages)) ? $config->Pages->HeaderText : "&nbsp;";
    $langid = $config->Lang->LangID;
    $htmlNamespace =  'itemscope itemtype="http://schema.org/LocalBusiness"'.' lang="'.$selectedlang.'"';
    $gravatarEmail = (isset($config->Contact)) ? $config->Contact->GravatarEmail : "";
?>
