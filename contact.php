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
        <?php include 'include/head-gravatar-script.php'; ?>
    </head>
    <body> 
        <div class="page-content">
            <?php include 'themes/Classic/include/content.php'; ?>

            <div id="centercontent" class="center-content">
                <div class="inner-content contact">
                    <div class="left" style="padding-right: 40px;">
                    
						<div id="gravatar"></div>
						
                        <h4><span class="label">Elérhetőségeim</span></h4>

                        <div itemscope itemtype="http://data-vocabulary.org/Organization">
                            <?php 
                                if (isset($config->Contact)) {
                                    print '<ul>';
                                    print '<li style="padding-bottom: 10px;" itemprop="name">'.$config->Contact->Name.'</li>';

                                    $i = 0;
                                    foreach ($config->Contact->Url as $contacturl) {
                                        $urlitemprop = ($i < 1) ? ' itemprop="url"' : '';
                                        print '<li>Weboldal: <a href="http://'.$contacturl.'"'.$urlitemprop.'>'.$contacturl.'</a></li>';
                                        $i++;
                                    }

                                    foreach ($config->Contact->Phone as $phone) {
                                        if ($phone->GetFormattedNumber() != '') {
                                            print '<li itemprop="tel">'.$phone->Label.' <b><span style="padding-top: 10px;">'.$phone->GetFormattedNumber().'</span></b></li>';
                                        }
                                    }
                                    print '</ul>';

                                    print '<ul itemprop="address" itemscope itemtype="http://data-vocabulary.org/Address">';
                                    print '<li><b><span itemprop="locality">'.$config->Contact->City.'</span></b></li>';
                                    print '<li style="padding-bottom: 10px;" itemprop="postal-code">'.$config->Contact->ZIP.'</li>';
                                    print '<li style="display:none;" itemprop="country-name">'.$config->Contact->Country.'</li>';
                                    print '</ul>';
                                }
                            ?>
                        </div>
                    
                        
                    </div>
                    
                </div>
            </div>

            <?php include 'themes/Classic/include/footer.php'; ?>
        </div>
    </body>
</html>
