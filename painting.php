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
        	$carouselTitle = "FESTÉS, GLETTELÉS";
        	$carouselImagePath = 'img/albums/painting/'; 
        	$carouselTargetControl = "paintingCarousel";
        	$carouselWidth = "380";
        	include 'include/head-carousel-script.php'; 
        ?>
    </head>
    <body> 
        <div class="page-content">
            <?php include 'themes/Classic/include/content.php'; ?>

            <div class="center-content">
                <div class="inner-content">
                
                	<div id="paintingCarousel"></div>
                </div>
            </div>

            <?php include 'themes/Classic/include/footer.php'; ?>
        </div>
    </body>
</html>