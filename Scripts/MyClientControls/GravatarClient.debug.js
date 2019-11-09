/// <reference name="MicrosoftAjax.js"/>
/* =========================================================
 * GravatarClient.debug.js v1.5.0
 * https://gravatarclient.codeplex.com/
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
(function (){
    Type.registerNamespace("Sys");
    Type.registerNamespace("Sys.Extended");
    Type.registerNamespace("Sys.Extended.UI");

    var scriptName = "GravatarClient";

    if (Type._registerScript){
        Type._registerScript("GravatarClient.js");
    }

    function execute(){

        Sys.Extended.UI.GravatarClient = function (element){
            Sys.Extended.UI.GravatarClient.initializeBase(this, [element]);

            this._Email = "";
            this._Entry = null;
            this._Icons = {};
            this._ImageSize = 80;
            this._IsDetailsEnabled = true;
            this._LoadedDetails = "name,displayName,currentLocation,emails";
            
            // override base defaults
            this.set_PanelCSS("panel panel-success");
            this.set_PanelHeadPadding("5px 15px 5px 15px");
            this.set_Title("Gravatar");
            
            // local variables
            this._delegates = {};
            this._details = null;
            this._hash = "";
            this._loadableDetails = "profileUrl,preferredUsername,photos,name,displayName,aboutMe,currentLocation,phoneNumbers,emails,ims,accounts,urls";
            this._script = null;
        };
        Sys.Extended.UI.GravatarClient.prototype = {
            initialize: function (){
                Sys.Extended.UI.GravatarClient.callBaseMethod(this, 'initialize');

                var el, div, paddingTemp;
                
                if (this._Email){
                    if (!this._ImageSize) {
                    	this._ImageSize = 80;
                    }
                    
                    this._delegates.processDetails = Function.createDelegate(this, this._onSuccess);
                    
                    this._hash = md5(this._Email.toLowerCase());
                    el = this.get_element();
                    
                    // gravatar panel head
                    paddingTemp = this._PanelPadding;
                    this.set_PanelPadding(0);
                    this._createPanelHead();
                    this.set_PanelPadding(paddingTemp);

                    div = this._createImage();
                    el.appendChild(div);
                    
                	if (this._IsDetailsEnabled){
            			div.style.margin = "2px";
            			
                		this._setDetails();
                		
                        $common.addCssClasses(el, this._PanelCSS.split(' '));
                        el.style.paddingBottom = "0px";
                    	this._loadData();	
                	}
                }
            },

            dispose: function (){
            	this._delegates.processDetails = null;
            	
                Sys.Extended.UI.GravatarClient.callBaseMethod(this, "dispose");
            },
            
            _setDetails: function (){
            	/// <summary>
                /// Initialize loadable details.
                /// </summary>
            	var i, detail, details = this._LoadedDetails.split(',');
            	this._loadableDetails = this._loadableDetails.split(',');
        		this._details = [];
        		
        		for (i = 0; i<details.length; i++){
        			detail = details[i].trim();
        			
        			if (Array.contains(this._loadableDetails, detail)){
        				this._details.push(detail);
        			}
        		}
            },
            
            _loadData: function (){
            	/// <summary>
                /// Generate callback for the gravatar request.
                /// </summary>
            	var id, url, fn, fnName; 
            	
            	id = this.get_element().id;
            	fn = this._delegates.processDetails;
            	fnName = String.format("{0}_{1}_callback", id, this._hash);
            	
            	url = String.format("http://www.gravatar.com/{0}.json?callback={1}", 
            						this._hash, 
            						fnName);
            	
            	// set the global callback function
            	window[fnName] = function(data){
            		fn(data);
            	};
            	
            	// generate head script for request - because otherwise violated the Same-origin policy (http://en.wikipedia.org/wiki/Same_origin_policy)
            	this._script = document.createElement("script");
            	this._script.setAttribute("type", "text/javascript");
            	this._script.setAttribute("src", url);
            	
            	document.head.appendChild(this._script);
            },
            
            _removeCallbackScript: function (){
            	/// <summary>
                /// Remove the callback function and the generated head script.
                /// </summary>
            	var id, fnName; 

            	id = this.get_element().id;
            	fnName = String.format("{0}_{1}_callback", id, this._hash);
            	window[fnName] = null;
            	
            	this._script.parentNode.removeChild(this._script);
            	this._script = null;
            },
            
            _onSuccess: function (data){
            	/// <summary>
                /// Callback function for the gravatar request.
                /// </summary>
            	/// <param name="data" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
            	
            	this._removeCallbackScript();
            	
            	if (data.entry){
            		var div, entry = data.entry[0];
            		
            		div = this._createNamePanel(entry);
            		this._setAbout(div, entry);
            		this._setEmails(div, entry);
            		this._setUrls(div, entry);
            		this._setPhoneNumbers(div, entry);
            		this._setIms(div, entry);
            		this._setAccounts(div, entry);
            		this._setPhotos(div, entry);
            	}
            },
            
            _createDataList: function (el, entry, propertyName, badgeText, isDataAsLink){
            	/// <summary>
                /// Add photos to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
            	/// <param name="propertyName" type="String" optional="false" mayBeNull="false">Name of the entry property.</param>
            	/// <param name="badgeText" type="String" optional="false" mayBeNull="false">Text of the badge style header.</param>
            	/// <param name="isDataAsLink" type="Boolean" optional="true" mayBeNull="true">True when the data is a hypertext.</param>
            	/// <returns type="Sys.UI.DomElement" />
            	var list = null, item, i, link, label, isIconCreated;
            	if (entry[propertyName] && Array.contains(this._details, propertyName)){
        			if ("0" in entry[propertyName]){
            			this._createBadge(el, badgeText);
            			list = this._createListGroup(el);
            			
            			for (i=0; i<entry[propertyName].length; i++){
                			item = this._createListGroupItem(list);
                			
                			if (isDataAsLink){
                				link = document.createElement("a");
        		    			link.setAttribute("target", "_blank");
        		    			
                				switch (propertyName){
                					case "emails":
                        				link.setAttribute("href", "mailto:" + entry[propertyName][i].value);
                            			this._createIcon(link, "glyphicon glyphicon-envelope");
                        				label = document.createElement("span");
                            			label.innerHTML = entry[propertyName][i].value;
                        				link.appendChild(label);
                						break;
                					case "urls":
                        				link.setAttribute("href", entry[propertyName][i].value);
                        				this._createIcon(link, "glyphicon glyphicon-globe");
                        				label = document.createElement("span");
                        				label.innerHTML = entry[propertyName][i].title;
                        				link.appendChild(label);
                						break;
                					case "accounts":
                        				link.setAttribute("href", entry[propertyName][i].url);
                        				isIconCreated = this._setIconImage(link, entry[propertyName][i].shortname);
                        				
                        				label = document.createElement("span");
                        				if (isIconCreated){
                        					label.innerHTML = entry[propertyName][i].display;
                        				}
                        				else {
                            				label.innerHTML = entry[propertyName][i].shortname + " - " + entry[propertyName][i].display;	
                        				}
                        				link.appendChild(label);
                						break;
                				}
                				
        		    			item.appendChild(link);
                			}
                			else {
                				switch (propertyName){
            						case "phoneNumbers":
            							switch (entry[propertyName][i].type){
            								case "home":
                    							this._createIcon(item, "glyphicon glyphicon-home");
            									break;
            								case "work":
                    							this._createIcon(item, "glyphicon glyphicon-briefcase");
            									break;
            								case "mobile":
                    							this._createIcon(item, "glyphicon glyphicon-phone");
            									break;
            							}
                            			label = document.createElement("span");
                            			label.innerHTML = entry[propertyName][i].value;
                        				item.appendChild(label);
            							break;
            						case "ims":
            							isIconCreated = this._setIconImage(item, entry[propertyName][i].type);
            							
            							label = document.createElement("span");
            							if (isIconCreated){
                        					label.innerHTML = entry[propertyName][i].value;
                        				}
                        				else {
                            				label.innerHTML = entry[propertyName][i].type + ": " + entry[propertyName][i].value;	
                        				}
                        				item.appendChild(label);
            							break;
            						default:
                            			item.innerHTML = entry[propertyName][i].value;
            							break;
                				}	
                			}	
            			}	
        			}
        		}
            	
            	return list;
            },
            _setPhotos: function (el, entry){
            	/// <summary>
                /// Add photos to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		if (entry.photos && Array.contains(this._details, "photos")){
        			if ("0" in entry.photos){
            			var list, item, i, j = 0, div, label;
            			
            			label = this._createBadge(el, "Photos");
            			list = this._createListGroup(el);
            			item = this._createListGroupItem(list);
            			
            			for (i=0; i<entry.photos.length; i++){
                			if (entry.thumbnailUrl != entry.photos[i].value){
                				div = this._createGenericImage(entry.photos[i].value, "");
                    			item.appendChild(div);
                    			j++;
                			}	
            			}	
            			
            			if (!j){
            				list.parentNode.removeChild(list);
            				label.parentNode.removeChild(label);
            			}
        			}
        		}
        		
            },
            _setAbout: function (el, entry){
            	/// <summary>
                /// Add about field to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		if (entry.aboutMe && Array.contains(this._details, "aboutMe")){
        			var list, item, label;
        			
        			this._createBadge(el, "About");
        			list = this._createListGroup(el);
        			item = this._createListGroupItem(list);
        			
        			this._createIcon(item, "glyphicon glyphicon-comment");
        			label = document.createElement("span");
    				label.innerHTML = entry.aboutMe;
    				item.appendChild(label);
        		}
            },
            _setEmails: function (el, entry){
            	/// <summary>
                /// Add emails to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		this._createDataList(el, entry, "emails", "Emails", true);
            },
            _setUrls: function (el, entry){
            	/// <summary>
                /// Add Urls to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		this._createDataList(el, entry, "urls", "Urls", true);
            },
            _setPhoneNumbers: function (el, entry){
            	/// <summary>
                /// Add Phone numbers to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		this._createDataList(el, entry, "phoneNumbers", "Phone Numbers");
            },
            _setIms: function (el, entry){
            	/// <summary>
                /// Add Ims to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		this._createDataList(el, entry, "ims", "Ims");
            },
            _setAccounts: function (el, entry){
            	/// <summary>
                /// Add account informations to the panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
        		this._createDataList(el, entry, "accounts", "Accounts", true);
            },
            _createNamePanel: function (entry){
            	/// <summary>
                /// Create name panel.
                /// </summary>
            	/// <param name="entry" type="Object" optional="false" mayBeNull="false">Json object with gravatar datas.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var el, div = null, list, item, usernameElement, usernameTag, isProfileUrlEnabled, isUserNameEnabled, profileUrl, username, displayedName, name, label, formattedName = null;
            	
            	el = this.get_element();
            	isProfileUrlEnabled = Array.contains(this._details, "profileUrl");
            	isUserNameEnabled = Array.contains(this._details, "preferredUsername");
            	profileUrl = (isProfileUrlEnabled) ? entry.profileUrl.replace("http://", ""): "";
            	username = (isUserNameEnabled) ? entry.preferredUsername : "";
            	
            	if (entry.name && Array.contains(this._details, "name")){
        			formattedName = entry.name.formatted;
        		}
            	
            	if (Array.contains(this._details, "displayName")){
                	name = entry.displayName || username || "";	
            	}
            	else {
                	name = username || "";
            	}
            	
            	displayedName = formattedName || name || profileUrl;
            	
        		// name panel
    			div = this._createPanel(el, displayedName);
    			list = this._createListGroup(div);
    			
    			item = this._createListGroupItem(list);
    			
    			if (isProfileUrlEnabled || isUserNameEnabled){
    				usernameTag = (isProfileUrlEnabled) ? "a" : "span";
	    			usernameElement = document.createElement(usernameTag);
	    			
	    			if (isProfileUrlEnabled){
		    			usernameElement.setAttribute("href", entry.profileUrl);
		    			usernameElement.setAttribute("target", "_blank");
	    			}
	    			
	    			if (username || displayedName || isProfileUrlEnabled){
	    				this._createIcon(usernameElement, "glyphicon glyphicon-user");
	        			label = document.createElement("span");
	    				label.innerHTML = username || displayedName || "gravatar profile";
	    				usernameElement.appendChild(label);
		    			item.appendChild(usernameElement);	
	    			}
    			}
    			
    			if (entry.currentLocation && Array.contains(this._details, "currentLocation")){
        			item = this._createListGroupItem(list);
        			item.innerHTML = entry.currentLocation;
    			}
    			
    			if (div){
        			div.style.margin = "2px";	
    			}
    			
    			return div;
            },
            
            _createPanel: function (el, title){
            	/// <summary>
                /// Create a Bootstrap panel.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for panel content.</param>
            	/// <param name="title" type="String" optional="false" mayBeNull="false">String for panel head label.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var div = document.createElement("div");
            	
            	$common.addCssClasses(div, this._PanelCSS.split(' '));
        		div.style.padding = String.format("{0}px", this._PanelPadding);
            	
        		this.set_Title(title);
        		this.set_PanelHeadTag("h4");
    			head = this._createPanelHead(div);
    			
                if (this._PanelHeadPadding){
                    head.style.padding = this._PanelHeadPadding;	
                }
                
                if (el){
        			el.appendChild(div);	
                }
                
                return div;
            },
            
            _createBadge: function (el, text){
            	/// <summary>
                /// Create a Bootstrap badge.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for parent node.</param>
            	/// <param name="text" type="String" optional="true" mayBeNull="true">Label of badge.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var label = document.createElement("span");
            	
            	$common.addCssClasses(label, ["badge"]);
            	label.style.cssFloat = "none";
            	label.style.marginRight = "0px";
            	label.style.marginTop = "4px";
            	
            	if (text){
            		label.innerHTML = text;
            	}
            	
            	if (el){
    				el.appendChild(label);
    			}
            	
            	return label;
            },
            
            _createListGroup: function (el){
            	/// <summary>
                /// Create a Bootstrap grouplist.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for parent node.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var list = document.createElement("ul");
    			$common.addCssClasses(list, this._ListGroupCSS.split(' '));
    			if (this._ListGroupMargin){
        			list.style.margin = this._ListGroupMargin;
        		}
    			
    			if (el){
    				el.appendChild(list);
    			}
    			
    			return list;
            },
            
            _createListGroupItem: function (el){
            	/// <summary>
                /// Create a Bootstrap grouplist item.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for parent node.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var item = document.createElement("li");
    			$common.addCssClasses(item, this._ListGroupItemCSS.split(' '));

    			if (this._ListGroupItemPadding){
    				item.style.padding = this._ListGroupItemPadding;
    			}
    			
    			if (el){
        			el.appendChild(item);
    			}
    			
    			return item;
            },
            
            _createIcon: function (el, className){
            	/// <summary>
                /// Create an icon.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for parent node.</param>
            	/// <param name="className" type="String" optional="false" mayBeNull="false">Classname of generated DomElement.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var item = document.createElement("i");
    			$common.addCssClasses(item, className.split(' '));
    			item.style.fontSize = "11px";
    			item.style.marginRight = "3px";
    			
    			if (el){
        			el.appendChild(item);
    			}
    			
    			return item;
            },
            
            _setIconImage: function (el, name){
            	/// <summary>
                /// Create an icon if the settings of named icon data exist.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for parent node.</param>
            	/// <param name="name" type="String" optional="true" mayBeNull="true">Name of the data.</param>
                /// <returns type="Boolean">True if the icon created.</returns>
            	var icons, url, classname, alt, isCreated = false;
            	
            	icons = this._Icons || {};
            	
            	if (name in icons){
        			url = icons[name].url || "";
        			classname = icons[name].className || "";
        			alt = icons[name].alt || name;
        			
        			if (url){
        				this._createIconImage(el, url, classname, alt);
        				isCreated = true;
        			}
            	}
            	
            	return isCreated;
            },
            
            _createIconImage: function (el, url, className, alt){
            	/// <summary>
                /// Create an icon.
                /// </summary>
            	/// <param name="el" type="Sys.UI.DomElement" optional="false" mayBeNull="true">A DomElement for parent node.</param>
            	/// <param name="url" type="String" optional="false" mayBeNull="false">Url of image.</param>
            	/// <param name="className" type="String" optional="true" mayBeNull="true">Classname of generated DomElement.</param>
            	/// <param name="alt" type="String" optional="true" mayBeNull="true">Alternate text.</param>
                /// <returns type="Sys.UI.DomElement" />
            	var classname, item;
            	
            	item = document.createElement("img");
            	classname = className || "";
    			$common.addCssClasses(item, classname.split(' '));
    			item.src = url;
    			item.style.marginRight = "3px";
    			
    			if (el){
        			el.appendChild(item);
    			}
    			
    			return item;
            },
            
            _createImage: function (){
            	/// <summary>
                /// Create a gravatar image.
                /// </summary>
                /// <returns type="Sys.UI.DomElement" />
            	var url, div = null;
            	
                url = String.format("http://www.gravatar.com/avatar/{0}?s={1}", this._hash, this._ImageSize);
                div = this._createGenericImage(url, "avatar");
                
                return div;
            },
            
            _createGenericImage: function (url, alt){
            	/// <summary>
                /// Create a gravatar image.
                /// </summary>
                /// <returns type="Sys.UI.DomElement" />
            	var img, div;
            	
            	div = document.createElement("div");
            	div.style.marginBottom = "4px";
            	
            	img = document.createElement("img");
                
                img.src = url;
                img.setAttribute("alt", alt || "");
                
                div.appendChild(img);
                
                return div;
            },

            get_Email: function (){ return this._Email; },
            set_Email: function (value){ this._Email = value; },
            get_Entry: function (){ return this._Entry; },
            set_Entry: function (value){ this._Entry = value; },
            get_Icons: function (){ return this._Icons; },
            set_Icons: function (value){ this._Icons = value; },
            get_ImageSize: function (){ return this._ImageSize; },
            set_ImageSize: function (value){ this._ImageSize = value; },
            get_IsDetailsEnabled: function (){ return this._IsDetailsEnabled; },
            set_IsDetailsEnabled: function (value){ this._IsDetailsEnabled = value; },
            get_LoadedDetails: function (){ return this._LoadedDetails; },
            set_LoadedDetails: function (value){ this._LoadedDetails = value; }
        };

        Sys.Extended.UI.GravatarClient.registerClass('Sys.Extended.UI.GravatarClient', Sys.Extended.UI.BootstrapPanelBase);
        if (Sys.registerComponent){ Sys.registerComponent(Sys.Extended.UI.GravatarClient, { name: 'GravatarClient' }); }


    } // execute

    if (window.Sys && Sys.loader){
        Sys.loader.registerScript(scriptName, ["BootstrapPanelBase", "EncodeMD5"], execute);
    }
    else {
        execute();
    }
})();