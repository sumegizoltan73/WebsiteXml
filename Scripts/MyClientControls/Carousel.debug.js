/// <reference name="MicrosoftAjax.js"/>
/* =========================================================
 * Carousel.debug.js v1.4.4
 * https://carousel.codeplex.com/
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

    var scriptName = "Carousel";

    if (Type._registerScript){
        Type._registerScript("Carousel.js");
    }

    function execute(){

        Sys.Extended.UI.Carousel = function (element){
            Sys.Extended.UI.Carousel.initializeBase(this, [element]);

            this._ActiveIndicatorCSS = "active";
            this._ActiveItem = 0;
            this._ActiveItemCSS = "active item";
            this._CarouselTemplate =    '<ol class="carousel-indicators"></ol>' +
										'<div class="carousel-inner"></div>' +
										'<a class="carousel-control left" href="#{0}" data-slide="prev">&lsaquo;</a>' +
										'<a class="carousel-control right" href="#{0}" data-slide="next">&rsaquo;</a>';
            this._ClassName = "carousel slide";
            this._ImageNames = "";
            this._ImageUrl = "";
            this._IndicatorItemTemplate = '<li data-target="#{0}" data-slide-to="{1}"></li>';
            this._Interval = 2000;
            this._ItemCSS = "item";
            this._ItemTemplate = '<div><img src="{0}" alt="" /></div>';
            this._SelectorIndicator = "ol.carousel-indicators";
            this._SelectorItems = "div.carousel-inner";
            
            // override base defaults
            this.set_PanelCSS("panel panel-success");
            this.set_PanelHeadPadding("20px 15px 0px 15px");
            this.set_PanelHeadTag("h4");
            this.set_PanelHeadTagCSS("");
            this.set_PanelPadding(0);
            this.set_Width(0);

            // local variables
            this._images = [];
        };
        Sys.Extended.UI.Carousel.prototype = {
            initialize: function (){
                Sys.Extended.UI.Carousel.callBaseMethod(this, 'initialize');

                if (this._ImageNames){
                	this._images = this._ImageNames.split(',');
                }
                
                if (this._images.length > 0){
                	this._createCarousel();
                }
            },

            dispose: function (){
                Sys.Extended.UI.Carousel.callBaseMethod(this, "dispose");
            },
            
            _createCarousel: function (){
                var el, id, div, carousel, indicator, inner, indicatorItem, item, i;
                
                el = this.get_element();
                id = el.id;
                carousel = jQuery(String.format(this._CarouselTemplate, id));
                
                if (this._Width){
                	el.style.width = this._Width + "px";
                }
                
                $common.addCssClasses(el, this._ClassName.split(' '));
                $common.addCssClasses(el, this._PanelCSS.split(' '));
                
                div = this._createPanelHead(el);
                
                if (this._PanelHeadPadding){
                    div.style.padding = this._PanelHeadPadding;	
                }

                el = jQuery(el);
                carousel.appendTo(el);
                
                indicator = el.find('*').filter(this._SelectorIndicator);
                inner = el.find('*').filter(this._SelectorItems);
                
                for(i=0; i< this._images.length; i++){
                	indicatorItem = jQuery(String.format(this._IndicatorItemTemplate, id, i));
                	item = jQuery(String.format(this._ItemTemplate, this._ImageUrl + this._images[i]));
                	
                	if (i == this._ActiveItem){
                		indicatorItem.addClass(this._ActiveIndicatorCSS);
                		item.addClass(this._ActiveItemCSS);
                	}
                	else {
                		item.addClass(this._ItemCSS);
                	}
                	
                	indicatorItem.appendTo(indicator);
                	item.appendTo(inner);
                }
                
                el.carousel({interval: this._Interval });
            },

            get_ActiveIndicatorCSS: function (){ return this._ActiveIndicatorCSS; },
            set_ActiveIndicatorCSS: function (value){ this._ActiveIndicatorCSS = value; },
            get_ActiveItem: function (){ return this._ActiveItem; },
            set_ActiveItem: function (value){ this._ActiveItem = value; },
            get_ActiveItemCSS: function (){ return this._ActiveItemCSS; },
            set_ActiveItemCSS: function (value){ this._ActiveItemCSS = value; },
            get_CarouselTemplate: function (){ return this._CarouselTemplate; },
            set_CarouselTemplate: function (value){ this._CarouselTemplate = value; },
            get_ClassName: function (){ return this._ClassName; },
            set_ClassName: function (value){ this._ClassName = value; },
            get_ImageNames: function (){ return this._ImageNames; },
            set_ImageNames: function (value){ this._ImageNames = value; },
            get_ImageUrl: function (){ return this._ImageUrl; },
            set_ImageUrl: function (value){ this._ImageUrl = value; },
            get_IndicatorItemTemplate: function (){ return this._IndicatorItemTemplate; },
            set_IndicatorItemTemplate: function (value){ this._IndicatorItemTemplate = value; },
            get_Interval: function (){ return this._Interval; },
            set_Interval: function (value){ this._Interval = value; },
            get_ItemCSS: function (){ return this._ItemCSS; },
            set_ItemCSS: function (value){ this._ItemCSS = value; },
            get_ItemTemplate: function (){ return this._ItemTemplate; },
            set_ItemTemplate: function (value){ this._ItemTemplate = value; },
            get_SelectorIndicator: function (){ return this._SelectorIndicator; },
            set_SelectorIndicator: function (value){ this._SelectorIndicator = value; },
            get_SelectorItems: function (){ return this._SelectorItems; },
            set_SelectorItems: function (value){ this._SelectorItems = value; }
        };

        Sys.Extended.UI.Carousel.registerClass('Sys.Extended.UI.Carousel', Sys.Extended.UI.BootstrapPanelBase);
        if (Sys.registerComponent){ Sys.registerComponent(Sys.Extended.UI.Carousel, { name: 'Carousel' }); }


    } // execute

    if (window.Sys && Sys.loader){
        Sys.loader.registerScript(scriptName, ["BootstrapPanelBase"], execute);
    }
    else {
        execute();
    }
})();