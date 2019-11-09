<div class="langmenu">
    <?php 
        if (isset($config->Languages)) {
            
            $pages = explode("/", $_SERVER["REQUEST_URI"]);
            $page = $pages[count($pages) - 1];
            
            print '<ul>';
            foreach ($config->Languages as $_langitem) {
                if($pagelang == $_langitem->Name) {
                    print '<li><img src="'.$rootpath.$_langitem->ImageUrl.'" alt="'.$_langitem->Title.'" title="'.$_langitem->Title.'" /></li>';
                }
                else {
                    print '<li><a href="'.$rootpath.$_langitem->PathFromRoot.$page.'"><img class="hand" src="'.$rootpath.$_langitem->ImageUrl.'" alt="'.$_langitem->Title.'" title="'.$_langitem->Title.'" /></a></li>';
                }
            }
            print '</ul>';
        }
    ?>
</div>