/// <reference name="MicrosoftAjax.js"/>
/* =========================================================
 * AdPanel.debug.js v1.4.4
 * https://adpanel.codeplex.com/
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

    var scriptName = "AdPanel";

    if (Type._registerScript) {
        Type._registerScript("AdPanel.js");
    }

    function execute() {

    	Sys.Extended.UI.AdPanelContent = function (){
    		/// <summary>
    	    /// The AdPanelContent enumeration is used to specify how the AdPanelBehavior 
    	    /// render the panel content.
    	    /// </summary>
    	    /// <field name="Content" type="Number" integer="true">
    	    /// Render the panel content as normal content.
    	    /// </field>
    	    /// <field name="Wrap" type="Number" integer="true">
    	    /// Wrap the target control with a placeholder DomElement, then add 
    		/// the panel content and the original content as child to this placeholder.
    	    /// </field>
    	    throw Error.invalidOperation();
    	};
    	Sys.Extended.UI.AdPanelContent.prototype = {
    		Content: 0,
		    Wrap: 1
		};
		Sys.Extended.UI.AdPanelContent.registerEnum("Sys.Extended.UI.AdPanelContent", false);

		Sys.Extended.UI.AdPanelPosition = function (){
    		/// <summary>
    	    /// The AdPanelPosition enumeration is used to specify how the AdPanelBehavior 
    	    /// place the panel content.
    	    /// </summary>
			/// <field name="Top" type="Number" integer="true"></field>
			/// <field name="Left" type="Number" integer="true"></field>
			/// <field name="Bottom" type="Number" integer="true"></field>
    	    /// <field name="Right" type="Number" integer="true"></field>
    	    throw Error.invalidOperation();
    	};
    	Sys.Extended.UI.AdPanelPosition.prototype = {
    		Top: 0,
		    Left: 1,
		    Bottom: 2,
		    Right: 3
		};
		Sys.Extended.UI.AdPanelPosition.registerEnum("Sys.Extended.UI.AdPanelPosition", false);
    	
		Sys.Extended.UI.AdPanelLayer = function (){
    		/// <summary>
    	    /// The AdPanelLayer enumeration is used to specify how the AdPanelBehavior 
    	    /// render the items in the panel content.
    	    /// </summary>
			/// <field name="Inline" type="Number" integer="true"></field>
			/// <field name="InlineBlock" type="Number" integer="true"></field>
			/// <field name="Block" type="Number" integer="true"></field>
    	    /// <field name="ListGroup" type="Number" integer="true">
			/// Render the items as Bootstrap list-group.
			/// </field>
    	    throw Error.invalidOperation();
    	};
    	Sys.Extended.UI.AdPanelLayer.prototype = {
    		Inline: 0,
    		InlineBlock: 1,
    		Block: 2,
    		ListGroup: 3
		};
		Sys.Extended.UI.AdPanelLayer.registerEnum("Sys.Extended.UI.AdPanelLayer", false);

		Sys.Extended.UI.AdWidth = function (){
    		/// <summary>
    	    /// The AdWidth enumeration is used to specify how the AdPanelBehavior 
    	    /// size the item in the panel content.
    	    /// </summary>
			/// <field name="Auto" type="Number" integer="true">
			/// Size the item with own width.
			/// </field>
			/// <field name="Inherit" type="Number" integer="true">
			/// Size the item with 'inherit' style - for applying the panel width.
			/// </field>
			/// <field name="Responsive" type="Number" integer="true">
			/// Size the image item as Bootstrap responsive image.
			/// </field>
    	    throw Error.invalidOperation();
    	};
    	Sys.Extended.UI.AdWidth.prototype = {
    		Auto: 0,
		    Inherit: 1,
		    Responsive: 2
		};
		Sys.Extended.UI.AdWidth.registerEnum("Sys.Extended.UI.AdWidth", false);
    	
        Sys.Extended.UI.AdPanel = function (element){
            Sys.Extended.UI.AdPanel.initializeBase(this, [element]);

            this._Ads = [];
            this._Content = Sys.Extended.UI.AdPanelContent.Content;
            this._Layer = Sys.Extended.UI.AdPanelLayer.InlineBlock;
            this._Position = Sys.Extended.UI.AdPanelPosition.Right;
            
            this._delegates = {};
            
        };
        Sys.Extended.UI.AdPanel.prototype = {
            initialize: function (){
                Sys.Extended.UI.AdPanel.callBaseMethod(this, 'initialize');

                if (this._Ads.length > 0){
                	this._createAdpanel();
                }
            },

            dispose: function (){
        		if (this._delegates.resize){
        			var el = this.get_element();
        			$removeHandler(el.parentNode, "click", this._delegates.resize);
        			this._delegates.resize = null;
        		}
            	
                Sys.Extended.UI.AdPanel.callBaseMethod(this, "dispose");
            },

            get_Ads: function (){ return this._Ads; },
            set_Ads: function (value){
            	if (Array.isArray(value)) {
            		this._Ads = value;
            	} 
            },
            get_Content: function (){ return this._Content; },
            set_Content: function (value){ this._Content = value; },
            get_Layer: function (){ return this._Layer; },
            set_Layer: function (value){ this._Layer = value; },
            get_Position: function (){ return this._Position; },
            set_Position: function (value){ this._Position = value; },
            
            _setWrapStyle: function (){
            	/// <summary>
                /// Set wrap element style from the targetcontrol
                /// </summary>
            	var el,wrap,styleprops,i;
            	
            	el = this.get_element();
            	wrap = el.parentNode;
            	styleprops = "display,cssFloat,position,width,height";
            	styleprops = styleprops.split(',');
            	
            	for (i=0;i<styleprops.length;i++){
            		wrap.style[styleprops[i]] = el.style[styleprops[i]];
            	}
            	
            	wrap.className = el.className;
            	el.className = "";
            }, 
            
            _onResize: function (){
            	var el = this.get_element();
            	var wrapContentSize = $common.getContentSize(el.parentNode);
            	var adPanelSize = $common.getSize($get(String.format("{0}_adPanel", el.id)));
            	var width = wrapContentSize.width - adPanelSize.width - 30;
            	
            	el.style.width = width + "px";
            }, 
            
            _setResize: function (){
            	var el = this.get_element();
            	
            	this._delegates.resize = Function.createDelegate(this, this._onResize);
            	$addHandler(el.parentNode, "click", this._delegates.resize);
            	
            	this._onResize();
            },
            
            _createAdpanel: function (){
            	/// <summary>
                /// Create a panel for the advertisenments
                /// </summary>
            	var target, el, div, list;
            	
            	target = this.get_element();
            	el = target;
            	
            	if (this._Content == Sys.Extended.UI.AdPanelContent.Wrap){
            		// wrap the targetcontrol
            		div = document.createElement("div");
            		$common.wrapElement(el, div);
            		el = document.createElement("div");
            		el.id = String.format("{0}_adPanel", target.id);
            		el.style.margin = "5px";
            		
            		this._setSize(el);
            		this._setWrapStyle();
            		
            		// AdPanel position
            		if (this._Position == Sys.Extended.UI.AdPanelPosition.Top){
            			target.parentNode.insertBefore(el, target);
            		}
            		else if (this._Position == Sys.Extended.UI.AdPanelPosition.Bottom){
                		target.parentNode.appendChild(el);
            		}
            		else {
            			target.parentNode.insertBefore(el, target);
            			
            			el.style.display = "inline-block";
            			target.style.display = "inline-block";
            			
            			if (this._Position == Sys.Extended.UI.AdPanelPosition.Left){
            				el.style.cssFloat = "left";
            				target.style.cssFloat = "right";
            			}
            			else if (this._Position == Sys.Extended.UI.AdPanelPosition.Right){
            				el.style.cssFloat = "right";
            				target.style.cssFloat = "left";
            			}
            			
            			this._setResize();
            		}
            	}
            	else {
            		this._setSize(el);
            	}
            	
            	// Format the AdPanel as bootstrap panel
            	$common.addCssClasses(el, this._PanelCSS.split(' '));
        		el.style.padding = String.format("{0}px", this._PanelPadding);
            	
            	this._createPanelHead(el);
            	
            	if (this._Layer == Sys.Extended.UI.AdPanelLayer.ListGroup){
            		list = document.createElement("ul");
            		$common.addCssClasses(list, this._ListGroupCSS.split(' '));
            		el.appendChild(list);
            		
            		if (this._ListGroupMargin){
            			list.style.margin = this._ListGroupMargin;
            		}
            		
            		el = list;
            	}
            	
            	this._appendAdItems(el);
            },
            
            _appendAdItems: function (el){
            	/// <summary>
                /// Append ad items to the panel
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="false">A DomElement for panel content</param>
            	var i, item, contentParent, image, link, adItems, contentSize;
            	
            	adItems = this._Ads;
            	contentSize = $common.getContentSize(el);
            	
            	for (i=0; i< adItems.length; i++){
            		link = null;
            		image = null;
            		
            		if (this._Layer == Sys.Extended.UI.AdPanelLayer.ListGroup){
                		item = document.createElement("li");
                		$common.addCssClasses(item, this._ListGroupItemCSS.split(' '));
            			item.style.width = contentSize.width + "px";
            			
            			if (this._ListGroupItemPadding){
            				item.style.padding = this._ListGroupItemPadding;
            			}
            		}
            		else {
                		item = document.createElement("div");
                		item.style.width = "auto";
                		item.style.height = "auto";
            		}
            		
            		if (this._Layer == Sys.Extended.UI.AdPanelLayer.Inline){
            			item.style.display = "inline";
            			item.style.paddingLeft = "3px";
            			item.style.height = contentSize.height + "px";
            		}
            		else if (this._Layer == Sys.Extended.UI.AdPanelLayer.InlineBlock){
            			item.style.display = "inline-block";
            			item.style.paddingLeft = "3px";
            			item.style.height = contentSize.height + "px";
            		}
            		else if (this._Layer == Sys.Extended.UI.AdPanelLayer.Block){
            			item.style.paddingTop = "3px";
            			item.style.width = contentSize.width + "px";
            		}
            		
            		if (adItems[i].link){
                		link = document.createElement("a");
                		link.setAttribute("href", adItems[i].link);
                		link.setAttribute("target", "_blank");
                		link.style.width = "inherit";
                		item.appendChild(link);
            		}
            		
            		if (adItems[i].image){
                		image = document.createElement("img");
                		image.src = adItems[i].image;
                		
                		if (adItems[i].width){
                			if (adItems[i].width == Sys.Extended.UI.AdWidth.Responsive){
                				Sys.UI.DomElement.addCssClass(image, "img-responsive");
                			}
                			else {
                				image.style.width = "inherit";
                			}
                		}
                		
                		if (adItems[i].tooltip){
                    		image.setAttribute("alt", adItems[i].tooltip);
                		}
                		else {
                    		image.setAttribute("alt", "");
                		}
                		
                		if (link){
                			link.appendChild(image);
                		}
                		else {
                			item.appendChild(image);
                		}
            		}
            		
            		el.appendChild(item);
            		
            		if (adItems[i].content){
            			contentParent = (link) ? jQuery(link) : jQuery(item);
            			contentParent.append(jQuery(String.format("<div>{0}<div>", adItems[i].content)));
            			contentParent.find("*").filter("h3,h4,h5,h6").css({marginTop: '1px', marginBottom: '1px'});
            		}
            		
            		if (adItems[i].tooltip){
            			item.setAttribute("title", adItems[i].tooltip);
            			
            			if (this._Position == Sys.Extended.UI.AdPanelPosition.Left){
            				item.setAttribute("data-placement", "right");
            			}
            			else if (this._Position == Sys.Extended.UI.AdPanelPosition.Right){
            				item.setAttribute("data-placement", "left");
            			}
            			else if (this._Position == Sys.Extended.UI.AdPanelPosition.Top){
            				item.setAttribute("data-placement", "bottom");
            			}
            			else {
            				item.setAttribute("data-placement", "top");
            			}
            			
            			jQuery(item).tooltip();
            		}
            	}
            }
        };

        Sys.Extended.UI.AdPanel.registerClass('Sys.Extended.UI.AdPanel', Sys.Extended.UI.BootstrapPanelBase);
        if (Sys.registerComponent){ Sys.registerComponent(Sys.Extended.UI.AdPanel, { name: 'AdPanel' }); }


    } // execute

    if (window.Sys && Sys.loader){
        Sys.loader.registerScript(scriptName, ["BootstrapPanelBase"], execute);
    }
    else {
        execute();
    }
})();