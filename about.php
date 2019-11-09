<?php 
    $pagelang = "hu";
    $rootpath = "";
    require_once("modules/Base/classes/settings.php"); 
?>
<!DOCTYPE html>
<html <?php print $htmlNamespace;?>>
    <head>
        <?php include 'include/head.php'; ?>
        <?php include 'themes/Classic/include/head.php'; ?>
        
        <?php include 'include/head-bootstrap3.php'; ?>
        <?php include 'include/head-ajaxcontroltoolkit.php'; ?>
        
        <?php
        	$adPanelTitle = "Partnerek";  
        	$adPanelPadding = "3";
        	include 'include/head-adpanel-script.php'; 
        ?>
        <?php
        	$adPanelTitle = "Publikációk";  
        	$adPanelPadding = "10";
        	include 'include/head-publications-script.php'; 
        ?>
    </head>
    <body> 
        <div class="page-content">
            <?php include 'themes/Classic/include/content.php'; ?>

            <div id="centercontent" class="center-content">
                <div class="inner-content">
                    <h5><span class="label">IT TAPASZTALAT</span></h5>
                    <ul>
                        <li><span class="label label-inverse">ASP.NET</span> WebForms <span class="label label-info">KIEMELT TUDÁSSAL</span></li>
						<li><span class="label label-inverse">C#</span> <span class="label label-info">KIEMELT TUDÁSSAL</span></li>
						<li><span class="label label-inverse">Javascript</span> (<span class="label label-inverse">AjaxControlToolkit</span>, jQuery, jQuery UI, jQuery plugin authoring, Twitter Bootstrap, <span class="label label-inverse">TypeScript</span>, pure javascript) <span class="label label-info">KIEMELT TUDÁSSAL</span></li>
						<li>Visual Basic .NET</li>
						<li>ASP.NET MVC 3-4 és razor</li>
						<li>PHP</li>
					</ul>
					
					<div id="publications"></div>
                </div>
            </div>

            <?php include 'themes/Classic/include/footer.php'; ?>
        </div>
    </body>
</html>
