<?php 
    require_once("modules/Base/classes/settings.php"); 
?>

<title><?php print $headertext;?></title>
<meta charset="utf-8" />
<?php 
    foreach ($config->Meta as $meta) {
        print $meta;
    }
?>

<script type="text/javascript">
    <?php 
        if ($selectedlang != 'en') {
            print "window.___gcfg = {lang: '".$selectedlang."'};";
        }
    ?>
        
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-xxxxxxx']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>