<?php
/**
 * Description of Common
 *
 * @author Zoltan Sumegi - http://www.sumegi.net
 * Copyright 2012
 */
class Common {
    private $lang = ""; 
    private $themes = array();
    
    public $Languages = array();
    public $Lang = NULL;
    public $Theme = NULL;
    public $Pages = NULL;
    public $Contact = NULL;
    public $Meta = array();
    
    function Common($lang){
        if (file_exists('modules/config.xml')) {
            $xml = simplexml_load_file('modules/config.xml');
            
            $this->init_Lang($xml, $lang);
            $this->init_Theme($xml);
            $this->init_Pages($xml);
            $this->init_Contact($xml);
            $this->init_Meta($xml);
        }
    }
    
    function init_Lang($xml, $lang){
        foreach ($xml->languages[0]->item as $item) {
            $this->Languages[] = new Language($item['name'], $item['title'], $item['img'], $item['pathfromroot'], $item['langid']);
        }

        if ($this->isContainsLanguage($lang)) {
            $this->set_Lang($lang);
        }
        else {
            $this->set_Lang((string)$xml->languages[0]['default']);
        }
    }
    
    function init_Theme($xml){
        foreach ($xml->themes[0]->item as $item) {
            $this->themes[] = new Theme($item['name'], $item['url']);
            
            if ((string)$item['name'] == (string)$xml->themes[0]['default']) {
                $this->Theme = $this->themes[count($this->themes) - 1];
            }
        }
    }
    
    function init_Pages($xml){
        foreach ($xml->pages[0]->language as $langitem) {
            if ((string)$langitem['name'] == $this->lang) {
                $this->Pages = new Pages($langitem);
                break;
            }
        }
    }
    
    function init_Contact($xml){
        foreach ($xml->company[0]->language as $langitem) {
            if ((string)$langitem['name'] == $this->lang) {
                $this->Contact = new Contact($langitem);
                break;
            }
        }
    }
    
    function init_Meta($xml){
        foreach ($xml->company[0]->language as $langitem) {
            if ((string)$langitem['name'] == $this->lang) {
                
                foreach ($langitem->meta as $meta) {
                    $metahtml = '<meta';
                    foreach ($meta->property as $property) {
                        $metahtml = $metahtml.' '.$property['key'].'="'.$property['value'].'"';
                    }
                    $metahtml = $metahtml.' />';
                    
                    $this->Meta[] = $metahtml;
                }
                
                break;
            }
        }
    }
    
    public function get_Lang(){
        return $this->lang;
    }
    public function set_Lang($lang){
        $this->lang = $lang;
        
        foreach ($this->Languages as $item) {
            if ($item->get_Name() == $lang) {
                $this->Lang = $item;
                break;
            }
        }
    } 
    
    public function isContainsLanguage($lang){
        return Common::isObjectContains($this->Languages, $lang);
    }
    
    public function isContainsTheme($theme){
        return Common::isObjectContains($this->themes, $theme);
    }
    
    public static function isObjectContains($array, $name){
        if ($name == NULL || $name == '') return false;
        
        foreach ($array as $item) {
            if ($item->get_Name() == $name) {
                return true;
            }
        }
        
        return false;
    }
    
    public static function getObjectFromArray($array, $name){
        if ($name == NULL || $name == '') return NULL;
        
        foreach ($array as $item) {
            if ($item->get_Name() == $name) {
                return $item;
            }
        }
        
        return NULL;
    }
    
    public static function GetFormattedNumber($number, $formatString) {
        // parameter $formatString = "+99 (99) 999-9999"
        $formattedNumber = "";
        $numberArray = str_split((string)$number);
        $formatArray = str_split($formatString);
        $j = 0;
        
        foreach ($formatArray as $i){
            if ($i == "9") {
                if ($j < count($numberArray)) {
                    $formattedNumber .= $numberArray[$j];
                    $j++;
                }
            }
            else {
                $formattedNumber .= $i;
            }
        }
        
        return $formattedNumber;
    }
    
    public static function isHostOnline($hostname, $port){
        if ($hostname == NULL || $hostname == '') return false;
        
        if (is_numeric($port)) {
            $file = file('http://'.$hostname.':'.$port, "r");
            return (count($file) > 0) ? true : false;
        }
        else {
            $file = file_get_contents('http://'.$hostname);
        }
        
        return ($file == false) ? false : true;
    }
    
    public static function GetImages($path){
    	$images = array();
    	$extensions = array("gif", "jpg", "jpeg", "png");
    	$ext = "";
    	
    	if (is_dir($path)){
    		if ($path != '.' && $path != '..'){
    			
    			$dir = dir($path);
    			
    			while (false !== ($filename = $dir->read())) {
	    			$ext = array_pop(explode(".", $filename));
	    			
	    			if (in_array(strtolower($ext), $extensions)){
	    				$images[] = $filename;
	    			}
				}
    		}
    	}
    	
    	return implode(",", $images);
    }
}

class Language {
    public $Name = "";
    public $LangID = "";
    public $PathFromRoot = "";
    public $Title = "";
    public $ImageUrl = "";
    
    public function Language($name, $title, $imageurl, $path, $langid){
        $this->Name = (string)$name;
        $this->Title = (string)$title;
        $this->ImageUrl = (string)$imageurl;
        $this->PathFromRoot = (string)$path;
        $this->LangID = (string)$langid;
    }
    
    public function get_Name(){
        return $this->Name;
    }
}

class Theme {
    public $Name = "";
    public $Url = "";
    
    public function Theme($name, $url){
        $this->Name = (string)$name;
        $this->Url = (string)$url;
    }
    
    public function get_Name(){
        return $this->Name;
    }
}

class Pages {
    public $HeaderText = "";
    public $PageItems = array();
    public $Root = "";
    
    public function Pages($langitem){
        $this->HeaderText = (string)$langitem['header'];
        $this->Root = (string)$langitem['root'];
        
        foreach ($langitem->item as $item) {
            $this->PageItems[] = new PageItem($item['menuname'], $item['title'], $item['url'], $item['showinmenu']);
        }
    }
    
    public function get_PageItem($url){
        if (Common::isObjectContains($this->PageItems, $url)) {
            return Common::getObjectFromArray($this->PageItems, $url);
        }
        
        return (count($this->PageItems) > 0) ? $this->PageItems[0] : NULL;
    }
}

class PageItem {
    public $MenuName = "";
    public $Title = "";
    public $Url = "";
    public $IsShowInMenu = true;
    
    public function PageItem($menu, $title, $url, $showinmenu){
        $this->MenuName = (string)$menu;
        $this->Title = (string)$title;
        $this->Url = (string)$url;
        $this->IsShowInMenu = ((string)$showinmenu == 'true') ? true : false;
    }
    
    public function get_Name(){
        return $this->Url;
    }
}

class Contact {
    public $Email = array();
    public $GravatarEmail = "";
    public $Url = array();
    public $Phone = array();
    public $CompanyData = array();
    public $Name = "";
    public $City = "";
    public $AddressLine1 = "";
    public $AddressLine2 = "";
    public $Country = "";
    public $ZIP = "";
    public $Copyright = "";
    public $Coordinates = array();
    
    public function Contact($langitem){
        $this->Name = (string)$langitem->name[0];
        $this->City = (string)$langitem->city[0];
        $this->AddressLine1 = (string)$langitem->addressline1[0];
        $this->AddressLine2 = (string)$langitem->addressline2[0];
        $this->Country = (string)$langitem->country[0];
        $this->ZIP = (string)$langitem->zip[0];
        $this->Copyright = (string)$langitem->copyright[0];
        $this->GravatarEmail = (string)$langitem->gravatar_email[0];
        
        foreach ($langitem->email as $email) {
            $this->Email[] = (string)$email;
        }
        
        foreach ($langitem->url as $url) {
            $this->Url[] = (string)$url;
        }
        
        foreach ($langitem->phone as $phone) {
            $this->Phone[] = new Phone($phone);
        }
        
        foreach ($langitem->companydata as $companydata) {
            $this->CompanyData[] = new KeyValuePair($companydata['key'], $companydata['value']);
        }
        
        foreach ($langitem->location as $location) {
            $this->Coordinates[] = new Coordinates($location);
        }
    }
}

class Phone {
    public $Label = "";
    public $Number = "";
    public $NumberFormat = "";
    public $Enabled = true;
    
    public function __construct($phone) {
        $this->Label = (string)$phone["label"];
        $this->Number = (int)$phone["number"];
        $this->NumberFormat = (string)$phone["numberformat"];
        $this->Enabled = ((string)$phone["enabled"] == 'true') ? true : false;
    }
    
    public function GetFormattedNumber(){
		if ($this->Enabled) {
			return Common::GetFormattedNumber($this->Number, $this->NumberFormat);
		}
		else {
			return "";
		}
    }
}

class Coordinates {

    public $Latitude = "";
    public $Longitude = "";
    public $Zoom = "";
    public $Width = "";
    public $Height = "";
    public $Markers = "";
    
    public function __construct($location) {
        $this->Latitude = (string)$location["lat"];
        $this->Longitude = (string)$location["lng"];
        $this->Zoom = (string)$location["zoom"];
        $this->Width = (string)$location["width"];
        $this->Height = (string)$location["height"];
        $this->Markers = (string)$location["markers"];
    }
    
    public function GetStaticMapImageSrc() {
        //Google API 2.0 static map
        return "http://maps.googleapis.com/maps/api/staticmap?center=".$this->Latitude.",".$this->Longitude."&markers=".$this->Markers."|".$this->Latitude.",".$this->Longitude."&zoom=".$this->Zoom."&size=".$this->Width."x".$this->Height."&sensor=false";
    }

}

class KeyValuePair {

    public $Key = "";
    public $Value = "";
    
    public function __construct($key, $value) {
        $this->Key = $key;
        $this->Value = $value;
    }

}
?>
