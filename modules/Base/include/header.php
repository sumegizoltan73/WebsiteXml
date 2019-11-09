<div id="fb-root"></div>
<div>
    <script type="text/javascript">(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = <?php print '"http://connect.facebook.net/'.str_replace("-", "_", $langid).'/all.js#xfbml=1"'; ?>;
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
</div>

<div class="header">
    <div class="header-content">
        <h1 id="headertext" class="reflectedtext"><?php print $headertext;?></h1>
    </div>
</div>