(function(){Type.registerNamespace("Sys");Type.registerNamespace("Sys.Extended");Type.registerNamespace("Sys.Extended.UI");var b="BootstrapPanelBase";if(Type._registerScript){Type._registerScript("BootstrapPanelBase.js")}function a(){Sys.Extended.UI.BootstrapPanelBase=function(c){Sys.Extended.UI.BootstrapPanelBase.initializeBase(this,[c]);this._Height="auto";this._IsPanelHeadVisible=true;this._ListGroupCSS="list-group";this._ListGroupItemCSS="list-group-item";this._ListGroupItemPadding="3px 10px 3px 10px";this._ListGroupMargin="4px 0px 0px 0px";this._PanelCSS="panel panel-primary";this._PanelHeadCSS="panel-heading";this._PanelHeadPadding="";this._PanelHeadTag="h3";this._PanelHeadTagCSS="panel-title";this._PanelPadding=3;this._Title="";this._Width=240};Sys.Extended.UI.BootstrapPanelBase.prototype={initialize:function(){Sys.Extended.UI.BootstrapPanelBase.callBaseMethod(this,"initialize")},dispose:function(){Sys.Extended.UI.BootstrapPanelBase.callBaseMethod(this,"dispose")},get_Height:function(){return this._Height},set_Height:function(c){this._Height=c},get_IsPanelHeadVisible:function(){return this._IsPanelHeadVisible},set_IsPanelHeadVisible:function(c){this._IsPanelHeadVisible=c},get_ListGroupCSS:function(){return this._ListGroupCSS},set_ListGroupCSS:function(c){this._ListGroupCSS=c},get_ListGroupItemCSS:function(){return this._ListGroupItemCSS},set_ListGroupItemCSS:function(c){this._ListGroupItemCSS=c},get_ListGroupItemPadding:function(){return this._ListGroupItemPadding},set_ListGroupItemPadding:function(c){this._ListGroupItemPadding=c},get_ListGroupMargin:function(){return this._ListGroupMargin},set_ListGroupMargin:function(c){this._ListGroupMargin=c},get_PanelCSS:function(){return this._PanelCSS},set_PanelCSS:function(c){this._PanelCSS=c},get_PanelHeadCSS:function(){return this._PanelHeadCSS},set_PanelHeadCSS:function(c){this._PanelHeadCSS=c},get_PanelHeadPadding:function(){return this._PanelHeadPadding},set_PanelHeadPadding:function(c){this._PanelHeadPadding=c},get_PanelHeadTag:function(){return this._PanelHeadTag},set_PanelHeadTag:function(c){if(Array.contains("h1,h2,h3,h4,h5,h6".split(","),c.toLowerCase())){this._PanelHeadTag=c}},get_PanelHeadTagCSS:function(){return this._PanelHeadTagCSS},set_PanelHeadTagCSS:function(c){this._PanelHeadTagCSS=c},get_PanelPadding:function(){return this._PanelPadding},set_PanelPadding:function(c){var d=Function._validateParams(arguments,[{name:"value",type:Number,integer:true}]);if(d){throw d}this._PanelPadding=c},get_Title:function(){return this._Title},set_Title:function(c){this._Title=c},get_Width:function(){return this._Width},set_Width:function(c){this._Width=c},_getPanelMargin:function(){return(this._PanelPadding)?this._PanelPadding*(-1):0},_getSize:function(g){var e,h,c,f=g,d="auto";if(!g||(g===0)||(g=="0")){f="auto"}f=String.format("{0}",f);if(!isNaN(parseInt(f,10))){d=f+"px"}else{c=["/^[0-9\\.]+(px){0,}$","^[0-9\\.]+pt$","^[0-9\\.]+em$","^[0-9\\.]+%$"];for(e=0;e<c.length;e++){h=new RegExp(c[e]);if(h.test(f)){d=f;break}}}return d},_setSize:function(e){var d=this._getSize(this._Width);var c=this._getSize(this._Height);e.style.height=c;e.style.width=d;if(c!="auto"){e.style.overflow="auto";e.style.overflowX="hidden"}},_createPanelHead:function(d){var e=null,c;if(!d){d=this.get_element()}if(this._IsPanelHeadVisible){e=document.createElement("div");$common.addCssClasses(e,this._PanelHeadCSS.split(" "));e.style.paddingBottom="0px";if(this._PanelPadding){e.style.margin=String.format("{0}px {0}px 0px {0}px",this._getPanelMargin())}c=document.createElement(this._PanelHeadTag);$common.addCssClasses(c,this._PanelHeadTagCSS.split(" "));if(this._Title){c.innerHTML=this._Title}e.appendChild(c);d.appendChild(e)}return e}};if(Sys.Extended.UI.BehaviorBase){Sys.Extended.UI.BootstrapPanelBase.registerClass("Sys.Extended.UI.BootstrapPanelBase",Sys.Extended.UI.BehaviorBase)}else{Sys.Extended.UI.BootstrapPanelBase.registerClass("Sys.Extended.UI.BootstrapPanelBase",Sys.UI.Behavior)}if(Sys.registerComponent){Sys.registerComponent(Sys.Extended.UI.BootstrapPanelBase,{name:"BootstrapPanelBase"})}}if(window.Sys&&Sys.loader){Sys.loader.registerScript(b,["ExtendedBase","ExtendedCommon"],a)}else{a()}})();