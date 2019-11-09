<script type="text/javascript"> 
	Sys.require([Sys.scripts.GravatarClient], function(){
		
		$(document).ready(function() {
			
			$create(Sys.Extended.UI.GravatarClient, 
						{	 
							Email: "<?php print $gravatarEmail ?>", 
							ImageSize: 80,
							IsDetailsEnabled: true,
							LoadedDetails: "profileUrl,preferredUsername,photos,name,displayName,aboutMe,currentLocation,phoneNumbers,emails,ims,accounts,urls",
							ListGroupCSS: "list-group panel panel-default",
							Icons: {
								gtalk: { url: "<?php print $rootpath.'img/glyphicons/Hangouts-flat.png' ?>", className: "", alt: "" },
								skype: { url: "<?php print $rootpath.'img/glyphicons/glyphicons_social_38_skype.png' ?>", className: "" },
								google: { url: "<?php print $rootpath.'img/glyphicons/glyphicons_social_02_google_plus.png' ?>" },
								youtube: { url: "<?php print $rootpath.'img/glyphicons/glyphicons_social_22_youtube.png' ?>" },
								facebook: { url: "<?php print $rootpath.'img/glyphicons/glyphicons_social_30_facebook.png' ?>" }
							}
						}, 
						null, 
						null, 
						$get("gravatar"));
						
		});
		
	});   
</script>