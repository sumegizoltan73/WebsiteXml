Sys.loader.defineScripts({
    releaseUrl: "%/../MyClientControls/" + "{0}.js",
    debugUrl: "%/../MyClientControls/" + "{0}.debug.js"
},
    [
		{ name: "BootstrapPanelBase",
		    behaviors: [{name: "BootstrapPanelBase", typeName: "Sys.Extended.UI.BootstrapPanelBase"}],
		    executionDependencies: ["ExtendedBase", "ExtendedCommon", "Bootstrap3"] ,
		    isLoaded: !!(Sys && Sys.Extended && Sys.Extended.UI && Sys.Extended.UI.BootstrapPanelBase)
		},
        { name: "Carousel",
	        behaviors: [{name: "Carousel", typeName: "Sys.Extended.UI.Carousel"}],
	        executionDependencies: ["BootstrapPanelBase"] ,
	        isLoaded: !!(Sys && Sys.Extended && Sys.Extended.UI && Sys.Extended.UI.Carousel)
	    },
	    { name: "GravatarClient",
	        behaviors: [{name: "GravatarClient", typeName: "Sys.Extended.UI.GravatarClient"}],
	        executionDependencies: ["BootstrapPanelBase", "EncodeMD5"] ,
	        isLoaded: !!(Sys && Sys.Extended && Sys.Extended.UI && Sys.Extended.UI.GravatarClient)
	    },
        { name: "AdPanel",
	        behaviors: [{name: "AdPanel", typeName: "Sys.Extended.UI.AdPanel"}],
	        executionDependencies: ["BootstrapPanelBase"] ,
	        isLoaded: !!(Sys && Sys.Extended && Sys.Extended.UI && Sys.Extended.UI.AdPanel)
	    }
    ]
);

Sys.loader.defineScripts({
	
}, 
	[
	   { name: "jQuery",
	     releaseUrl: "%/../jQuery/jquery-1.10.0.min.js",
	     debugUrl: "%/../jQuery/jquery-1.10.0.min.js",
	     isLoaded: !!window.jQuery
	   },
	   { name: "jQueryUI",
	     releaseUrl: "%/../jQuery/jquery-ui-1.10.3.custom.min.js",
	     debugUrl: "%/../jQuery/jquery-ui-1.10.3.custom.js",
	     dependencies: ["jQuery"],
	     isLoaded: !!(window.jQuery && jQuery.ui)
	   },
	   { name: "jQuery-1.10",
	     releaseUrl: "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min.js",
	     debugUrl: "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.js",
	     isLoaded: !!window.jQuery
	   },
	   { name: "jQueryUI-1.10",
	     releaseUrl: "http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.min.js",
	     debugUrl: "http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.js",
	     dependencies: ["jQuery-1.10"],
	     isLoaded: !!(window.jQuery && jQuery.ui)
	   },
	   { name: "Bootstrap",
	     releaseUrl: "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js",
	     debugUrl: "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js",
	     dependencies: ["jQuery", "jQueryUI"],
	     isLoaded: !!(window.jQuery && jQuery.ui && jQuery.fn.carousel)
	   },
	   { name: "Bootstrap3",
	     releaseUrl: "http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js",
	     debugUrl: "http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js",
	     dependencies: ["jQuery-1.10", "jQueryUI-1.10"],
	     isLoaded: !!(window.jQuery && jQuery.ui && jQuery.fn.carousel)
	   },
	   { name: "EncodeMD5",
	     releaseUrl: "%/../Encode/md5.min.js",
	     debugUrl: "%/../Encode/md5.js",
	     dependencies: ["EncodeUTF8"],
	     isLoaded: !!(window.md5)
	   },
	   { name: "EncodeUTF8",
	     releaseUrl: "%/../Encode/utf8_encode.min.js",
	     debugUrl: "%/../Encode/utf8_encode.js",
	     isLoaded: !!(window.utf8_encode)
	   }
    ]
);

