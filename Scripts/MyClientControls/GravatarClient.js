(function(){Type.registerNamespace("Sys");Type.registerNamespace("Sys.Extended");Type.registerNamespace("Sys.Extended.UI");var b="GravatarClient";if(Type._registerScript){Type._registerScript("GravatarClient.js")}function a(){Sys.Extended.UI.GravatarClient=function(c){Sys.Extended.UI.GravatarClient.initializeBase(this,[c]);this._Email="";this._Entry=null;this._Icons={};this._ImageSize=80;this._IsDetailsEnabled=true;this._LoadedDetails="name,displayName,currentLocation,emails";this.set_PanelCSS("panel panel-success");this.set_PanelHeadPadding("5px 15px 5px 15px");this.set_Title("Gravatar");this._delegates={};this._details=null;this._hash="";this._loadableDetails="profileUrl,preferredUsername,photos,name,displayName,aboutMe,currentLocation,phoneNumbers,emails,ims,accounts,urls";this._script=null};Sys.Extended.UI.GravatarClient.prototype={initialize:function(){Sys.Extended.UI.GravatarClient.callBaseMethod(this,"initialize");var c,e,d;if(this._Email){if(!this._ImageSize){this._ImageSize=80}this._delegates.processDetails=Function.createDelegate(this,this._onSuccess);this._hash=md5(this._Email.toLowerCase());c=this.get_element();d=this._PanelPadding;this.set_PanelPadding(0);this._createPanelHead();this.set_PanelPadding(d);e=this._createImage();c.appendChild(e);if(this._IsDetailsEnabled){e.style.margin="2px";this._setDetails();$common.addCssClasses(c,this._PanelCSS.split(" "));c.style.paddingBottom="0px";this._loadData()}}},dispose:function(){this._delegates.processDetails=null;Sys.Extended.UI.GravatarClient.callBaseMethod(this,"dispose")},_setDetails:function(){var d,e,c=this._LoadedDetails.split(",");this._loadableDetails=this._loadableDetails.split(",");this._details=[];for(d=0;d<c.length;d++){e=c[d].trim();if(Array.contains(this._loadableDetails,e)){this._details.push(e)}}},_loadData:function(){var f,c,d,e;f=this.get_element().id;d=this._delegates.processDetails;e=String.format("{0}_{1}_callback",f,this._hash);c=String.format("http://www.gravatar.com/{0}.json?callback={1}",this._hash,e);window[e]=function(g){d(g)};this._script=document.createElement("script");this._script.setAttribute("type","text/javascript");this._script.setAttribute("src",c);document.head.appendChild(this._script)},_removeCallbackScript:function(){var d,c;d=this.get_element().id;c=String.format("{0}_{1}_callback",d,this._hash);window[c]=null;this._script.parentNode.removeChild(this._script);this._script=null},_onSuccess:function(d){this._removeCallbackScript();if(d.entry){var e,c=d.entry[0];e=this._createNamePanel(c);this._setAbout(e,c);this._setEmails(e,c);this._setUrls(e,c);this._setPhoneNumbers(e,c);this._setIms(e,c);this._setAccounts(e,c);this._setPhotos(e,c)}},_createDataList:function(e,m,h,d,g){var j=null,n,f,k,l,c;if(m[h]&&Array.contains(this._details,h)){if("0" in m[h]){this._createBadge(e,d);j=this._createListGroup(e);for(f=0;f<m[h].length;f++){n=this._createListGroupItem(j);if(g){k=document.createElement("a");k.setAttribute("target","_blank");switch(h){case"emails":k.setAttribute("href","mailto:"+m[h][f].value);this._createIcon(k,"glyphicon glyphicon-envelope");l=document.createElement("span");l.innerHTML=m[h][f].value;k.appendChild(l);break;case"urls":k.setAttribute("href",m[h][f].value);this._createIcon(k,"glyphicon glyphicon-globe");l=document.createElement("span");l.innerHTML=m[h][f].title;k.appendChild(l);break;case"accounts":k.setAttribute("href",m[h][f].url);c=this._setIconImage(k,m[h][f].shortname);l=document.createElement("span");if(c){l.innerHTML=m[h][f].display}else{l.innerHTML=m[h][f].shortname+" - "+m[h][f].display}k.appendChild(l);break}n.appendChild(k)}else{switch(h){case"phoneNumbers":switch(m[h][f].type){case"home":this._createIcon(n,"glyphicon glyphicon-home");break;case"work":this._createIcon(n,"glyphicon glyphicon-briefcase");break;case"mobile":this._createIcon(n,"glyphicon glyphicon-phone");break}l=document.createElement("span");l.innerHTML=m[h][f].value;n.appendChild(l);break;case"ims":c=this._setIconImage(n,m[h][f].type);l=document.createElement("span");if(c){l.innerHTML=m[h][f].value}else{l.innerHTML=m[h][f].type+": "+m[h][f].value}n.appendChild(l);break;default:n.innerHTML=m[h][f].value;break}}}}}return j},_setPhotos:function(f,h){if(h.photos&&Array.contains(this._details,"photos")){if("0" in h.photos){var k,g,e,d=0,l,c;c=this._createBadge(f,"Photos");k=this._createListGroup(f);g=this._createListGroupItem(k);for(e=0;e<h.photos.length;e++){if(h.thumbnailUrl!=h.photos[e].value){l=this._createGenericImage(h.photos[e].value,"");g.appendChild(l);d++}}if(!d){k.parentNode.removeChild(k);c.parentNode.removeChild(c)}}}},_setAbout:function(d,f){if(f.aboutMe&&Array.contains(this._details,"aboutMe")){var g,e,c;this._createBadge(d,"About");g=this._createListGroup(d);e=this._createListGroupItem(g);this._createIcon(e,"glyphicon glyphicon-comment");c=document.createElement("span");c.innerHTML=f.aboutMe;e.appendChild(c)}},_setEmails:function(c,d){this._createDataList(c,d,"emails","Emails",true)},_setUrls:function(c,d){this._createDataList(c,d,"urls","Urls",true)},_setPhoneNumbers:function(c,d){this._createDataList(c,d,"phoneNumbers","Phone Numbers")},_setIms:function(c,d){this._createDataList(c,d,"ims","Ims")},_setAccounts:function(c,d){this._createDataList(c,d,"accounts","Accounts",true)},_createNamePanel:function(p){var f,e=null,l,q,k,i,m,d,h,j,o,c,n,g=null;f=this.get_element();m=Array.contains(this._details,"profileUrl");d=Array.contains(this._details,"preferredUsername");h=(m)?p.profileUrl.replace("http://",""):"";j=(d)?p.preferredUsername:"";if(p.name&&Array.contains(this._details,"name")){g=p.name.formatted}if(Array.contains(this._details,"displayName")){c=p.displayName||j||""}else{c=j||""}o=g||c||h;e=this._createPanel(f,o);l=this._createListGroup(e);q=this._createListGroupItem(l);if(m||d){i=(m)?"a":"span";k=document.createElement(i);if(m){k.setAttribute("href",p.profileUrl);k.setAttribute("target","_blank")}if(j||o||m){this._createIcon(k,"glyphicon glyphicon-user");n=document.createElement("span");n.innerHTML=j||o||"gravatar profile";k.appendChild(n);q.appendChild(k)}}if(p.currentLocation&&Array.contains(this._details,"currentLocation")){q=this._createListGroupItem(l);q.innerHTML=p.currentLocation}if(e){e.style.margin="2px"}return e},_createPanel:function(c,d){var e=document.createElement("div");$common.addCssClasses(e,this._PanelCSS.split(" "));e.style.padding=String.format("{0}px",this._PanelPadding);this.set_Title(d);this.set_PanelHeadTag("h4");head=this._createPanelHead(e);if(this._PanelHeadPadding){head.style.padding=this._PanelHeadPadding}if(c){c.appendChild(e)}return e},_createBadge:function(d,e){var c=document.createElement("span");$common.addCssClasses(c,["badge"]);c.style.cssFloat="none";c.style.marginRight="0px";c.style.marginTop="4px";if(e){c.innerHTML=e}if(d){d.appendChild(c)}return c},_createListGroup:function(c){var d=document.createElement("ul");$common.addCssClasses(d,this._ListGroupCSS.split(" "));if(this._ListGroupMargin){d.style.margin=this._ListGroupMargin}if(c){c.appendChild(d)}return d},_createListGroupItem:function(c){var d=document.createElement("li");$common.addCssClasses(d,this._ListGroupItemCSS.split(" "));if(this._ListGroupItemPadding){d.style.padding=this._ListGroupItemPadding}if(c){c.appendChild(d)}return d},_createIcon:function(d,c){var e=document.createElement("i");$common.addCssClasses(e,c.split(" "));e.style.fontSize="11px";e.style.marginRight="3px";if(d){d.appendChild(e)}return e},_setIconImage:function(g,e){var f,d,i,h,c=false;f=this._Icons||{};if(e in f){d=f[e].url||"";i=f[e].className||"";h=f[e].alt||e;if(d){this._createIconImage(g,d,i,h);c=true}}return c},_createIconImage:function(e,c,d,h){var g,f;f=document.createElement("img");g=d||"";$common.addCssClasses(f,g.split(" "));f.src=c;f.style.marginRight="3px";if(e){e.appendChild(f)}return f},_createImage:function(){var c,d=null;c=String.format("http://www.gravatar.com/avatar/{0}?s={1}",this._hash,this._ImageSize);d=this._createGenericImage(c,"avatar");return d},_createGenericImage:function(d,e){var c,f;f=document.createElement("div");f.style.marginBottom="4px";c=document.createElement("img");c.src=d;c.setAttribute("alt",e||"");f.appendChild(c);return f},get_Email:function(){return this._Email},set_Email:function(c){this._Email=c},get_Entry:function(){return this._Entry},set_Entry:function(c){this._Entry=c},get_Icons:function(){return this._Icons},set_Icons:function(c){this._Icons=c},get_ImageSize:function(){return this._ImageSize},set_ImageSize:function(c){this._ImageSize=c},get_IsDetailsEnabled:function(){return this._IsDetailsEnabled},set_IsDetailsEnabled:function(c){this._IsDetailsEnabled=c},get_LoadedDetails:function(){return this._LoadedDetails},set_LoadedDetails:function(c){this._LoadedDetails=c}};Sys.Extended.UI.GravatarClient.registerClass("Sys.Extended.UI.GravatarClient",Sys.Extended.UI.BootstrapPanelBase);if(Sys.registerComponent){Sys.registerComponent(Sys.Extended.UI.GravatarClient,{name:"GravatarClient"})}}if(window.Sys&&Sys.loader){Sys.loader.registerScript(b,["BootstrapPanelBase","EncodeMD5"],a)}else{a()}})();