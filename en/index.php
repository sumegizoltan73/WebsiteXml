<?php 
    $pagelang = "en";
    $rootpath = "../";
    chdir ('../');
    require_once("modules/Base/classes/settings.php"); 
?>
<!DOCTYPE html>
<html <?php print $htmlNamespace;?>>
    <head>
        <?php include 'include/head.php'; ?>
        <?php include 'themes/Classic/include/head.php'; ?>
        <script type="text/javascript" src="<?php print $rootpath;?>modules/Base/js/terminal-OS.js"></script>
        
        <?php include 'include/head-bootstrap3.php'; ?>
        <?php include 'include/head-ajaxcontroltoolkit.php'; ?>
        
        <?php
        	$adPanelTitle = "Partners"; 
        	$adPanelPadding = "3";
        	include 'include/head-adpanel-script.php'; 
        ?>
    </head>
    <body onload="TerminalOS_Start();"> 
        <div class="page-content">
            <?php include 'themes/Classic/include/content.php'; ?>

            <div id="centercontent" class="center-content">
                <div class="logo right">
                    <div id="logocanvas" style="width: 252px; height: 248px; z-index: 10; position:absolute;"></div> 
                    <img id="logo" src="<?php print $rootpath;?>img/logo.png" alt="logo" />
                </div>
                <div class="inner-content" style="min-height: 200px;">
                    I was created this webpage with earlier ASP.NET (C#) based developing.
                </div>
            </div>

            <?php include 'themes/Classic/include/footer.php'; ?>
        </div>
    </body>
</html>