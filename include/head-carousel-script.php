<script type="text/javascript"> 
	Sys.require([Sys.scripts.Carousel], function(){
		
		// create extender when required scripts and document loaded
		$(document).ready(function() {
			
			$create(Sys.Extended.UI.Carousel, 
						{	
							ActiveItem: 0, 
							Title: "<?php print $carouselTitle ?>",
							ImageUrl: "<?php print $rootpath.$carouselImagePath ?>", 
							Interval: 4000, 
							IsPanelHeadVisible: true,
							PanelHeadTag: "h4",
							PanelCSS: "panel panel-success",
							Width: <?php print $carouselWidth ?>, 
							ImageNames: "<?php print Common::GetImages($carouselImagePath) ?>"
						}, 
						null, 
						null, 
						$get("<?php print $carouselTargetControl ?>"));
						
		});
		
	});   
</script> 
