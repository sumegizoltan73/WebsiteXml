

<div class="menu">
        
    <div class="like-content">
        <div class="fb-like" data-href="http://www.sumegi.net" data-send="true" data-layout="button_count" data-width="180" data-show-faces="true"></div>
        <div class="g-plusone" data-size="small"></div>
        <!--<g:plusone size="small"></g:plusone> -->
    </div>
    
    <div class="menu-content">
        <?php 
            if (isset($config->Pages)) {
                print '<ul>';
                foreach ($config->Pages->PageItems as $item) {
                    if ($item->IsShowInMenu) {
                        print '<li><a href="'.$item->Url.'"><span>'.$item->MenuName.'</span></a></li>';
                    }
                }
                print '</ul>';
            }
        ?>
    </div>
</div>
