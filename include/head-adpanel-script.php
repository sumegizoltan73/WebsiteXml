<script type="text/javascript"> 
	Sys.require([Sys.scripts.AdPanel], function(){
		
		$(document).ready(function() {
			
			$create(Sys.Extended.UI.AdPanel, 
						{	 
							Title: "<?php print $adPanelTitle ?>", 
							Width: 270,
							Height: 'auto',
							PanelPadding: <?php print $adPanelPadding ?>,
							Content: Sys.Extended.UI.AdPanelContent.Wrap,
							Position: Sys.Extended.UI.AdPanelPosition.Right,
							Layer: Sys.Extended.UI.AdPanelLayer.Block,
							Ads: [
								{ 	tooltip: "Dr. Nagy Mátyás", 
									link: "http://www.drnagymatyas.hu/",
									image: "http://s1.tlap.hu/hirdek/2526/hird_fajl_134236116859018.jpg",
									width: Sys.Extended.UI.AdWidth.Reponsive
								},
								{ 	tooltip: "Bajai cégek és vállalkozások | tlap.hu", 
									link: "http://bajaicegek.tlap.hu/",
									width: Sys.Extended.UI.AdWidth.Reponsive,
									content: '<h4><span class="label label-info">bajaicegek.tlap.hu</span></h4>'
								},
								{ 	tooltip: "Bitmen.hu", 
									link: "http://bitmen.hu/",
									width: Sys.Extended.UI.AdWidth.Reponsive,
									content: '<h4><span class="label label-info">bitmen.hu</span></h4>'
								},
								{
									tooltip: "AjaxControlToolkit",
									link: "http://ajaxcontroltoolkit.codeplex.com/",
									image: "<?php print $rootpath.'img/partners/ToolkitLogo.jpg' ?>",
									width: Sys.Extended.UI.AdWidth.Inherit
								},
								{
									tooltip: "Fedora Linux",
									link: "http://fedoraproject.org/hu/",
									image: "http://fedoraproject.org/static/images/banners/f19release.png",
									width: Sys.Extended.UI.AdWidth.Reponsive
								},
								{
									tooltip: "Eclipse IDE",
									link: "http://www.eclipse.org/",
									image: "http://www.eclipse.org/eclipse.org-common/themes/Nova/images/eclipse.png",
									width: Sys.Extended.UI.AdWidth.Reponsive
								},
								{
									tooltip: "CodePlex",
									link: "https://www.codeplex.com/",
									image: "<?php print $rootpath.'img/partners/CodePlexLogo.png' ?>",
									width: Sys.Extended.UI.AdWidth.Inherit
								},
								{
									tooltip: "NuGet Gallery",
									link: "https://www.nuget.org/",
									image: "<?php print $rootpath.'img/partners/nuget-logo.png' ?>",
									width: Sys.Extended.UI.AdWidth.Inherit
								},
								{
									tooltip: "GitHub",
									link: "https://github.com/",
									image: "<?php print $rootpath.'img/partners/GithubLogo.jpg' ?>",
									width: Sys.Extended.UI.AdWidth.Reponsive
								},
								{
									tooltip: "Bitbucket.org",
									link: "https://bitbucket.org/",
									image: "<?php print $rootpath.'img/partners/BitbucketLogo.jpg' ?>",
									width: Sys.Extended.UI.AdWidth.Reponsive
								},
								{
									tooltip: "Google",
									link: "http://google.hu/",
									image: "<?php print $rootpath.'img/partners/Google.png' ?>",
									width: Sys.Extended.UI.AdWidth.Reponsive
								},
								{
									tooltip: "SkyDrive",
									link: "https://skydrive.live.com/",
									image: "<?php print $rootpath.'img/partners/200px-Skydrive_logo.svg.png' ?>",
									width: Sys.Extended.UI.AdWidth.Reponsive
								}
							]
						}, 
						null, 
						null, 
						$get("centercontent"));
						
		});
		
	});   
</script> 
