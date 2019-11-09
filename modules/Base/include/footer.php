<div class="footer">
    <div class="inner-content">
        <?php 
            if (isset($config->Contact)) {
				$phone = $config->Contact->Phone[0]->GetFormattedNumber();
				$phonefield = ($phone != "") ? 'Tel.:<b>'.$phone.'</b>' : "";
                print '<table style="display:inline-table;"><tbody><tr><td><a href="mailto:'.$config->Contact->Email[0].'">'.$config->Contact->Email[0].'</a></td></tr></tbody></table> <table style="display:inline-table;"><tbody><tr><td>'.$phonefield.'</td></tr></tbody></table> <table style="display:inline-table;"><tbody><tr><td>&copy;&nbsp;'.$config->Contact->Name.' '.$config->Contact->Copyright.'</td></tr></tbody></table>';
            }
        ?>
    </div>
</div>