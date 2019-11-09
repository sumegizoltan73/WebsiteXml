<script type="text/javascript"> 
	Sys.require([Sys.scripts.AdPanel], function(){
		
		$(document).ready(function() {
			
			$create(Sys.Extended.UI.AdPanel, 
						{	 
							Title: "<?php print $adPanelTitle ?>", 
							Width: 270,
							Height: 'auto',
							PanelPadding: <?php print $adPanelPadding ?>,
							Content: Sys.Extended.UI.AdPanelContent.Content,
							Position: Sys.Extended.UI.AdPanelPosition.Bottom,
							Layer: Sys.Extended.UI.AdPanelLayer.ListGroup,
							Ads: [
								{ 	tooltip: "www.codeplex.com", 
									link: "http://www.codeplex.com/site/users/view/sumegizoltan",
									width: Sys.Extended.UI.AdWidth.Reponsive,
									content: '<span class="badge">www.codeplex.com</span>'
								},
								{ 	tooltip: "GitHub", 
									link: "https://github.com/sumegizoltan/",
									width: Sys.Extended.UI.AdWidth.Reponsive,
									content: '<span class="badge">GitHub</span>'
								},
								{ 	tooltip: "bitbucket.org", 
									link: "https://bitbucket.org/zoli73/",
									width: Sys.Extended.UI.AdWidth.Reponsive,
									content: '<span class="badge">bitbucket.org</span>'
								},
								{ 	tooltip: "NuGet Gallery", 
									link: "https://www.nuget.org/profiles/sumegizoltan/",
									width: Sys.Extended.UI.AdWidth.Reponsive,
									content: '<span class="badge">nuget.org</span>'
								}
							]
						}, 
						null, 
						null, 
						$get("publications"));
						
		});
		
	});   
</script> 
