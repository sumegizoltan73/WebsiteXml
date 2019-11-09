/// <reference name="MicrosoftAjax.js"/>
/* =========================================================
 * BootstrapPanelBase.debug.js v1.1.4
 * https://bootstrappanelbase.codeplex.com/
 * =========================================================
 * New BSD License (BSD)
 * 
 * Copyright 2013 Zoltán Sümegi
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or 
 * without modification, are permitted provided that the following 
 * conditions are met:
 * 
 * Redistributions of source code must retain the above copyright 
 * notice, this list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright 
 * notice, this list of conditions and the following disclaimer 
 * in the documentation and/or other materials provided with 
 * the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT 
 * NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND 
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ========================================================= */
(function () {
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "BootstrapPanelBase";

    if (Type._registerScript) {
        Type._registerScript("BootstrapPanelBase.js");
    }

    function execute() {
    	
        Sys.Extended.UI.BootstrapPanelBase = function (element){
            Sys.Extended.UI.BootstrapPanelBase.initializeBase(this, [element]);

            this._Height = 'auto';
            this._IsPanelHeadVisible = true;
            this._ListGroupCSS = "list-group";
            this._ListGroupItemCSS = "list-group-item";
            this._ListGroupItemPadding = "3px 10px 3px 10px";
            this._ListGroupMargin = "4px 0px 0px 0px";
            this._PanelCSS = "panel panel-primary";
            this._PanelHeadCSS = "panel-heading";
            this._PanelHeadPadding = "";
            this._PanelHeadTag = "h3";
            this._PanelHeadTagCSS = "panel-title";
            this._PanelPadding = 3;
            this._Title = "";
            this._Width = 240;
            
        };
        Sys.Extended.UI.BootstrapPanelBase.prototype = {
            initialize: function (){
                Sys.Extended.UI.BootstrapPanelBase.callBaseMethod(this, 'initialize');

            },

            dispose: function (){
            	
                Sys.Extended.UI.BootstrapPanelBase.callBaseMethod(this, "dispose");
            },

            get_Height: function (){ return this._Height; },
            set_Height: function (value){ this._Height = value; },
            get_IsPanelHeadVisible: function (){ return this._IsPanelHeadVisible; },
            set_IsPanelHeadVisible: function (value){ this._IsPanelHeadVisible = value; },
            get_ListGroupCSS: function (){ return this._ListGroupCSS; },
            set_ListGroupCSS: function (value){ this._ListGroupCSS = value; },
            get_ListGroupItemCSS: function (){ return this._ListGroupItemCSS; },
            set_ListGroupItemCSS: function (value){ this._ListGroupItemCSS = value; },
            get_ListGroupItemPadding: function (){ return this._ListGroupItemPadding; },
            set_ListGroupItemPadding: function (value){ this._ListGroupItemPadding = value; },
            get_ListGroupMargin: function (){ return this._ListGroupMargin; },
            set_ListGroupMargin: function (value){ this._ListGroupMargin = value; },
            get_PanelCSS: function (){ return this._PanelCSS; },
            set_PanelCSS: function (value){ this._PanelCSS = value; },
            get_PanelHeadCSS: function (){ return this._PanelHeadCSS; },
            set_PanelHeadCSS: function (value){ this._PanelHeadCSS = value; },
            get_PanelHeadPadding: function (){ return this._PanelHeadPadding; },
            set_PanelHeadPadding: function (value){ this._PanelHeadPadding = value; },
            get_PanelHeadTag: function (){ return this._PanelHeadTag; },
            set_PanelHeadTag: function (value){ 
            	if (Array.contains("h1,h2,h3,h4,h5,h6".split(','), value.toLowerCase())) {
            		this._PanelHeadTag = value;
            	}
            },
            get_PanelHeadTagCSS: function (){ return this._PanelHeadTagCSS; },
            set_PanelHeadTagCSS: function (value){ this._PanelHeadTagCSS = value; },
            get_PanelPadding: function (){ return this._PanelPadding; },
            set_PanelPadding: function (value){
            	var e = Function._validateParams(arguments, [
            	    {name: "value", type: Number, integer: true}
            	]);
	            if (e) throw e;
            	this._PanelPadding = value; 
            },
            get_Title: function (){ return this._Title; },
            set_Title: function (value){ this._Title = value; },
            get_Width: function (){ return this._Width; },
            set_Width: function (value){ this._Width = value; },
            
            _getPanelMargin: function (){
            	/// <summary>
                /// Calculate margin for the style.margin attributes of a DomElement
                /// </summary>
                /// <returns type="Number" integer="true" />
            	return (this._PanelPadding) ? this._PanelPadding * (-1) : 0;
            },
            
            _getSize: function (data){
            	/// <summary>
                /// Calculate size for the style.width and style.height attributes of a DomElement
                /// </summary>
                /// <param name="data" type="Object" optional="true" mayBeNull="true">Value of size</param>
                /// <returns type="String" />
                var i, rx, rxtest, newsize = data, size = 'auto';
            	
            	if (!data || (data === 0) || (data == '0')){
            		newsize = 'auto';
            	}
            	
            	newsize = String.format("{0}", newsize);
            	
            	if (!isNaN(parseInt(newsize, 10))) {
            		size = newsize + "px";
            	}
            	else {
            		rxtest = ["/^[0-9\\.]+(px){0,}$","^[0-9\\.]+pt$","^[0-9\\.]+em$","^[0-9\\.]+%$"];
            		
            		for (i=0; i<rxtest.length; i++){
            			rx = new RegExp(rxtest[i]);
            			
            			if (rx.test(newsize)){
                       		size = newsize;   
                       		break;
            			}
            		}
            	}
            	
            	return size;
            },
            
            _setSize: function (el){
            	/// <summary>
                /// Set size of the element in the parameter
                /// </summary>
                /// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="false">A DomElement for setting size</param>
            	var width = this._getSize(this._Width);
            	var height = this._getSize(this._Height);
            	
            	el.style.height = height;
            	el.style.width = width;
            	
            	if (height != 'auto') {
            		el.style.overflow = 'auto';
            		el.style.overflowX = 'hidden';
            	}
            },

            _createPanelHead: function (el){
            	/// <summary>
                /// Create a bootstrap style head
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="false">A DomElement for panel content</param>
            	/// <returns type="Sys.UI.DomElement" />
            	var div = null, head;

            	if (!el){
            		el = this.get_element();
            	}
            	
            	if (this._IsPanelHeadVisible){
	        		div = document.createElement("div");
	        		$common.addCssClasses(div, this._PanelHeadCSS.split(' '));
	        		div.style.paddingBottom = "0px";
	        		
	        		if (this._PanelPadding){
	            		div.style.margin = String.format("{0}px {0}px 0px {0}px", this._getPanelMargin());	        			
	        		}
            		
	        		head = document.createElement(this._PanelHeadTag);
	        		$common.addCssClasses(head, this._PanelHeadTagCSS.split(' '));
	        		
	            	if (this._Title){
	            		head.innerHTML = this._Title;
	            	}
	        		
	        		div.appendChild(head);
	        		el.appendChild(div);
            	}
            	
            	return div;
            }
        };

        if (Sys.Extended.UI.BehaviorBase){
            Sys.Extended.UI.BootstrapPanelBase.registerClass('Sys.Extended.UI.BootstrapPanelBase', Sys.Extended.UI.BehaviorBase);
        }
        else {
            Sys.Extended.UI.BootstrapPanelBase.registerClass('Sys.Extended.UI.BootstrapPanelBase', Sys.UI.Behavior);
        }
        if (Sys.registerComponent){ Sys.registerComponent(Sys.Extended.UI.BootstrapPanelBase, { name: 'BootstrapPanelBase' }); }


    } // execute

    if (window.Sys && Sys.loader){
        Sys.loader.registerScript(scriptName, ["ExtendedBase", "ExtendedCommon"], execute);
    }
    else {
        execute();
    }
})();