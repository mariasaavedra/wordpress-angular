(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof module!=='undefined'&&module.exports){module.exports=factory(require('jquery'))}else{factory(jQuery)}})(function($){var _previousResizeWidth=-1,_updateTimeout=-1;var _parse=function(value){return parseFloat(value)||0};var _rows=function(elements){var tolerance=1,$elements=$(elements),lastTop=null,rows=[];$elements.each(function(){var $that=$(this),top=$that.offset().top-_parse($that.css('margin-top')),lastRow=rows.length>0?rows[rows.length-1]:null;if(lastRow===null){rows.push($that)}else{if(Math.floor(Math.abs(lastTop-top))<=tolerance){rows[rows.length-1]=lastRow.add($that)}else{rows.push($that)}}
lastTop=top});return rows};var _parseOptions=function(options){var opts={byRow:!0,property:'height',target:null,remove:!1};if(typeof options==='object'){return $.extend(opts,options)}
if(typeof options==='boolean'){opts.byRow=options}else if(options==='remove'){opts.remove=!0}
return opts};var matchHeight=$.fn.matchHeight=function(options){var opts=_parseOptions(options);if(opts.remove){var that=this;this.css(opts.property,'');$.each(matchHeight._groups,function(key,group){group.elements=group.elements.not(that)});return this}
if(this.length<=1&&!opts.target){return this}
matchHeight._groups.push({elements:this,options:opts});matchHeight._apply(this,opts);return this};matchHeight.version='0.7.0';matchHeight._groups=[];matchHeight._throttle=80;matchHeight._maintainScroll=!1;matchHeight._beforeUpdate=null;matchHeight._afterUpdate=null;matchHeight._rows=_rows;matchHeight._parse=_parse;matchHeight._parseOptions=_parseOptions;matchHeight._apply=function(elements,options){var opts=_parseOptions(options),$elements=$(elements),rows=[$elements];var scrollTop=$(window).scrollTop(),htmlHeight=$('html').outerHeight(!0);var $hiddenParents=$elements.parents().filter(':hidden');$hiddenParents.each(function(){var $that=$(this);$that.data('style-cache',$that.attr('style'))});$hiddenParents.css('display','block');if(opts.byRow&&!opts.target){$elements.each(function(){var $that=$(this),display=$that.css('display');if(display!=='inline-block'&&display!=='flex'&&display!=='inline-flex'){display='block'}
$that.data('style-cache',$that.attr('style'));$that.css({'display':display,'padding-top':'0','padding-bottom':'0','margin-top':'0','margin-bottom':'0','border-top-width':'0','border-bottom-width':'0','height':'100px','overflow':'hidden'})});rows=_rows($elements);$elements.each(function(){var $that=$(this);$that.attr('style',$that.data('style-cache')||'')})}
$.each(rows,function(key,row){var $row=$(row),targetHeight=0;if(!opts.target){if(opts.byRow&&$row.length<=1){$row.css(opts.property,'');return}
$row.each(function(){var $that=$(this),style=$that.attr('style'),display=$that.css('display');if(display!=='inline-block'&&display!=='flex'&&display!=='inline-flex'){display='block'}
var css={'display':display};css[opts.property]='';$that.css(css);if($that.outerHeight(!1)>targetHeight){targetHeight=$that.outerHeight(!1)}
if(style){$that.attr('style',style)}else{$that.css('display','')}})}else{targetHeight=opts.target.outerHeight(!1)}
$row.each(function(){var $that=$(this),verticalPadding=0;if(opts.target&&$that.is(opts.target)){return}
if($that.css('box-sizing')!=='border-box'){verticalPadding+=_parse($that.css('border-top-width'))+_parse($that.css('border-bottom-width'));verticalPadding+=_parse($that.css('padding-top'))+_parse($that.css('padding-bottom'))}
$that.css(opts.property,(targetHeight-verticalPadding)+'px')})});$hiddenParents.each(function(){var $that=$(this);$that.attr('style',$that.data('style-cache')||null)});if(matchHeight._maintainScroll){$(window).scrollTop((scrollTop/htmlHeight)*$('html').outerHeight(!0))}
return this};matchHeight._applyDataApi=function(){var groups={};$('[data-match-height], [data-mh]').each(function(){var $this=$(this),groupId=$this.attr('data-mh')||$this.attr('data-match-height');if(groupId in groups){groups[groupId]=groups[groupId].add($this)}else{groups[groupId]=$this}});$.each(groups,function(){this.matchHeight(!0)})};var _update=function(event){if(matchHeight._beforeUpdate){matchHeight._beforeUpdate(event,matchHeight._groups)}
$.each(matchHeight._groups,function(){matchHeight._apply(this.elements,this.options)});if(matchHeight._afterUpdate){matchHeight._afterUpdate(event,matchHeight._groups)}};matchHeight._update=function(throttle,event){if(event&&event.type==='resize'){var windowWidth=$(window).width();if(windowWidth===_previousResizeWidth){return}
_previousResizeWidth=windowWidth}
if(!throttle){_update(event)}else if(_updateTimeout===-1){_updateTimeout=setTimeout(function(){_update(event);_updateTimeout=-1},matchHeight._throttle)}};$(matchHeight._applyDataApi);$(window).bind('load',function(event){matchHeight._update(!1,event)});$(window).bind('resize orientationchange',function(event){matchHeight._update(!0,event)})})
/**
 * This script adds the accessibility-ready responsive menus Genesis Framework child themes.
 *
 * @author StudioPress
 * @link https://github.com/copyblogger/responsive-menus
 * @version 1.1.2
 * @license GPL-2.0+
 */

var genesisMenuParams      = typeof genesis_responsive_menu === 'undefined' ? '' : genesis_responsive_menu,
	genesisMenusUnchecked  = genesisMenuParams.menuClasses,
	genesisMenus           = {},
	menusToCombine         = [];

( function ( document, $, undefined ) {

	'use strict';

	// Make our menus unique if there's more than one instance on the page.
	/**
	 * Validate the menus passed by the theme with what's being loaded on the page,
	 * and pass the new and accurate information to our new data.
	 * @param {genesisMenusUnchecked} Raw data from the localized script in the theme.
	 * @return {array} genesisMenus array gets populated with updated data.
	 * @return {array} menusToCombine array gets populated with relevant data.
	 */
	$.each( genesisMenusUnchecked, function( group ) {

		// Mirror our group object to populate.
		genesisMenus[group] = [];

		// Loop through each instance of the specified menu on the page.
		$.each( this, function( key, value ) {

			var menuString = value,
				$menu      = $(value);

			// If there is more than one instance, append the index and update array.
			if ( $menu.length > 1 ) {

				$.each( $menu, function( key, value ) {

					var newString = menuString + '-' + key;

					$(this).addClass( newString.replace('.','') );

					genesisMenus[group].push( newString );

					if ( 'combine' === group ) {
						menusToCombine.push( newString );
					}

				});

			} else if ( $menu.length == 1 ) {

				genesisMenus[group].push( menuString );

				if ( 'combine' === group ) {
					menusToCombine.push( menuString );
				}

			}

		});

	});

	// Make sure there is something to use for the 'others' array.
	if ( typeof genesisMenus.others == 'undefined' ) {
		genesisMenus.others = [];
	}

	// If there's only one menu on the page for combining, push it to the 'others' array and nullify our 'combine' variable.
	if ( menusToCombine.length == 1 ) {
		genesisMenus.others.push( menusToCombine[0] );
		genesisMenus.combine = null;
		menusToCombine = null;
	}

	var genesisMenu         = {},
		mainMenuButtonClass = 'menu-toggle',
		subMenuButtonClass  = 'sub-menu-toggle',
		responsiveMenuClass = 'genesis-responsive-menu';

	// Initialize.
	genesisMenu.init = function() {

		// Exit early if there are no menus to do anything.
		if ( $( _getAllMenusArray() ).length == 0 ) {
			return;
		}

		var menuIconClass     = typeof genesisMenuParams.menuIconClass !== 'undefined' ? genesisMenuParams.menuIconClass : 'dashicons-before dashicons-menu',
			subMenuIconClass  = typeof genesisMenuParams.subMenuIconClass !== 'undefined' ? genesisMenuParams.subMenuIconClass : 'dashicons-before dashicons-arrow-down-alt2',
			toggleButtons     = {
				menu : $( '<button />', {
					'class' : mainMenuButtonClass,
					'aria-expanded' : false,
					'aria-pressed' : false,
					'role' : 'button'
					} )
					.append( genesisMenuParams.mainMenu ),
				submenu : $( '<button />', {
					'class' : subMenuButtonClass,
					'aria-expanded' : false,
					'aria-pressed' : false,
					'role' : 'button'
					} )
					.append( $( '<span />', {
						'class' : 'screen-reader-text',
						'text' : genesisMenuParams.subMenu
					} ) )
			};

		// Add the responsive menu class to the active menus.
		_addResponsiveMenuClass();

		// Add the main nav button to the primary menu, or exit the plugin.
		_addMenuButtons( toggleButtons );
		
		// Setup additional classes.
		$( '.' + mainMenuButtonClass ).addClass( menuIconClass );
		$( '.' + subMenuButtonClass ).addClass( subMenuIconClass );
		$( '.' + mainMenuButtonClass ).on( 'click.genesisMenu-mainbutton', _mainmenuToggle ).each( _addClassID );
		$( '.' + subMenuButtonClass ).on( 'click.genesisMenu-subbutton', _submenuToggle );
		$( window ).on( 'resize.genesisMenu', _doResize ).triggerHandler( 'resize.genesisMenu' );
	};

	/**
	 * Add menu toggle button to appropriate menus.
	 * @param {toggleButtons} Object of menu buttons to use for toggles.
	 */
	function _addMenuButtons( toggleButtons ) {

		// Apply sub menu toggle to each sub-menu found in the menuList.
		$( _getMenuSelectorString( genesisMenus ) ).find( '.sub-menu' ).before( toggleButtons.submenu );

		
		if ( menusToCombine !== null ) {

			var menusToToggle = genesisMenus.others.concat( menusToCombine[0] );
		 	
		 	// Only add menu button the primary menu and navs NOT in the combine variable.
		 	$( _getMenuSelectorString( menusToToggle ) ).before( toggleButtons.menu );

		} else {

			// Apply the main menu toggle to all menus in the list.
			$( _getMenuSelectorString( genesisMenus.others ) ).before( toggleButtons.menu );

		}

	}

	/**
	 * Add the responsive menu class.
	 */
	function _addResponsiveMenuClass() {
		$( _getMenuSelectorString( genesisMenus ) ).addClass( responsiveMenuClass );
	}

	/**
	 * Execute our responsive menu functions on window resizing.
	 */
	function _doResize() {
		var buttons   = $( 'button[id^="genesis-mobile-"]' ).attr( 'id' );
		if ( typeof buttons === 'undefined' ) {
			return;
		}
		_maybeClose( buttons );
		_superfishToggle( buttons );
		_changeSkipLink( buttons );
		_combineMenus( buttons );
	}

	/**
	 * Add the nav- class of the related navigation menu as
	 * an ID to associated button (helps target specific buttons outside of context).
	 */
	function _addClassID() {
		var $this = $( this ),
			nav   = $this.next( 'nav' ),
			id    = 'class';

		$this.attr( 'id', 'genesis-mobile-' + $( nav ).attr( id ).match( /nav-\w*\b/ ) );
	}
	
	/**
	 * Combine our menus if the mobile menu is visible.
	 * @params buttons
	 */
	function _combineMenus( buttons ){
		
		// Exit early if there are no menus to combine.
		if ( menusToCombine == null ) {
			return;
		}

		// Split up the menus to combine based on order of appearance in the array.
		var primaryMenu   = menusToCombine[0],
			combinedMenus = $( menusToCombine ).filter( function(index) { if ( index > 0 ) { return index; } });
		
		// If the responsive menu is active, append items in 'combinedMenus' object to the 'primaryMenu' object.
		if ( 'none' !== _getDisplayValue( buttons ) ) {

			$.each( combinedMenus, function( key, value ) {
				$(value).find( '.menu > li' ).addClass( 'moved-item-' + value.replace( '.','' ) ).appendTo( primaryMenu + ' ul.genesis-nav-menu' );
			});
			$( _getMenuSelectorString( combinedMenus ) ).hide();

		} else {

			$( _getMenuSelectorString( combinedMenus ) ).show();
			$.each( combinedMenus, function( key, value ) {
				$( '.moved-item-' + value.replace( '.','' ) ).appendTo( value + ' ul.genesis-nav-menu' ).removeClass( 'moved-item-' + value.replace( '.','' ) );
			});
			
		}

	}

	/**
	 * Action to happen when the main menu button is clicked.
	 */
	function _mainmenuToggle() {
		var $this = $( this );
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.next( 'nav' ).slideToggle( 'fast' );
	}

	/**
	 * Action for submenu toggles.
	 */
	function _submenuToggle() {

		var $this  = $( this ),
			others = $this.closest( '.menu-item' ).siblings();
		_toggleAria( $this, 'aria-pressed' );
		_toggleAria( $this, 'aria-expanded' );
		$this.toggleClass( 'activated' );
		$this.next( '.sub-menu' ).slideToggle( 'fast' );

		others.find( '.' + subMenuButtonClass ).removeClass( 'activated' ).attr( 'aria-pressed', 'false' );
		others.find( '.sub-menu' ).slideUp( 'fast' );

	}

	/**
	 * Activate/deactivate superfish.
	 * @params buttons
	 */
	function _superfishToggle( buttons ) {
		var _superfish = $( '.' + responsiveMenuClass + ' .js-superfish' ),
			$args      = 'destroy';
		if ( typeof _superfish.superfish !== 'function' ) {
			return;
		}
		if ( 'none' === _getDisplayValue( buttons ) ) {
			$args = {
				'delay': 100,
				'animation': {'opacity': 'show', 'height': 'show'},
				'dropShadows': false,
				'speed': 'fast'
			};
		}
		_superfish.superfish( $args );
	}

	/**
	 * Modify skip link to match mobile buttons.
	 * @param buttons
	 */
	function _changeSkipLink( buttons ) {

		// Start with an empty array.
		var menuToggleList = _getAllMenusArray();

		// Exit out if there are no menu items to update.
		if ( ! $( menuToggleList ).length > 0 ) {
			return;
		}

		$.each( menuToggleList, function ( key, value ) {
			
			var newValue  = value.replace( '.', '' ),
				startLink = 'genesis-' + newValue,
				endLink   = 'genesis-mobile-' + newValue;

			if ( 'none' == _getDisplayValue( buttons ) ) {
				startLink = 'genesis-mobile-' + newValue;
				endLink   = 'genesis-' + newValue;
			}

			var $item = $( '.genesis-skip-link a[href="#' + startLink + '"]' );

			if ( menusToCombine !== null && value !== menusToCombine[0] ) {
				$item.toggleClass( 'skip-link-hidden' );
			}

			if ( $item.length > 0 ) {
				var link  = $item.attr( 'href' );
					link  = link.replace( startLink, endLink );

				$item.attr( 'href', link );
			} else {
				return;
			}

		});

	}

	/**
	 * Close all the menu toggles if buttons are hidden.
	 * @param buttons
	 */
	function _maybeClose( buttons ) {
		if ( 'none' !== _getDisplayValue( buttons ) ) {
			return true;
		}

		$( '.' + mainMenuButtonClass + ', .' + responsiveMenuClass + ' .sub-menu-toggle' )
			.removeClass( 'activated' )
			.attr( 'aria-expanded', false )
			.attr( 'aria-pressed', false );
		
		$( '.' + responsiveMenuClass + ', ' + responsiveMenuClass + ' .sub-menu' )
			.attr( 'style', '' );
	}

	/**
	 * Generic function to get the display value of an element.
	 * @param  {id} $id ID to check
	 * @return {string}     CSS value of display property
	 */
	function _getDisplayValue( $id ) {
		var element = document.getElementById( $id ),
			style   = window.getComputedStyle( element );
		return style.getPropertyValue( 'display' );
	}

	/**
	 * Toggle aria attributes.
	 * @param  {button} $this     passed through
	 * @param  {aria-xx} attribute aria attribute to toggle
	 * @return {bool}           from _ariaReturn
	 */
	function _toggleAria( $this, attribute ) {
		$this.attr( attribute, function( index, value ) {
			return 'false' === value;
		});
	}

	/**
	 * Helper function to return a comma separated string of menu selectors.
	 * @param {itemArray} Array of menu items to loop through.
	 * @param {ignoreSecondary} boolean of whether to ignore the 'secondary' menu item.
	 * @return {string} Comma-separated string.
	 */
	function _getMenuSelectorString( itemArray ) {

		var itemString = $.map( itemArray, function( value, key ) {
			return value;
		});

		return itemString.join( ',' );

	}

	/**
	 * Helper function to return a group array of all the menus in
	 * both the 'others' and 'combine' arrays.
	 * @return {array} Array of all menu items as class selectors.
	 */
	function _getAllMenusArray() {

		// Start with an empty array.
		var menuList = [];

		// If there are menus in the 'menusToCombine' array, add them to 'menuList'.
		if ( menusToCombine !== null ) {

			$.each( menusToCombine, function( key, value ) {
				menuList.push( value.valueOf() );
			});

		}

		// Add menus in the 'others' array to 'menuList'.
		$.each( genesisMenus.others, function( key, value ) {
			menuList.push( value.valueOf() );
		});

		if ( menuList.length > 0 ) {
			return menuList;
		} else {
			return null;
		}

	}

	$(document).ready(function () {

		if ( _getAllMenusArray() !== null ) {

			genesisMenu.init();
		
		}

	});

})( document, jQuery );
/**
 * This script adds the accessibility-ready responsive menus Genesis Framework child themes.
 *
 * @author StudioPress
 * @link https://github.com/copyblogger/responsive-menus
 * @version 1.1.2
 * @license GPL-2.0+
 */
var genesisMenuParams="undefined"===typeof genesis_responsive_menu?"":genesis_responsive_menu,genesisMenusUnchecked=genesisMenuParams.menuClasses,genesisMenus={},menusToCombine=[];
(function(m,b,w){function n(){var a=b('button[id^="genesis-mobile-"]').attr("id");if("undefined"!==typeof a){"none"===k(a)&&(b(".menu-toggle, .genesis-responsive-menu .sub-menu-toggle").removeClass("activated").attr("aria-expanded",!1).attr("aria-pressed",!1),b(".genesis-responsive-menu, genesis-responsive-menu .sub-menu").attr("style",""));var d=b(".genesis-responsive-menu .js-superfish"),c="destroy";"function"===typeof d.superfish&&("none"===k(a)&&(c={delay:100,animation:{opacity:"show",height:"show"},
dropShadows:!1,speed:"fast"}),d.superfish(c));p(a);q(a)}}function r(){var a=b(this),d=a.next("nav");a.attr("id","genesis-mobile-"+b(d).attr("class").match(/nav-\w*\b/))}function q(a){if(null!=menusToCombine){var d=menusToCombine[0],c=b(menusToCombine).filter(function(a){if(0<a)return a});"none"!==k(a)?(b.each(c,function(a,c){b(c).find(".menu > li").addClass("moved-item-"+c.replace(".","")).appendTo(d+" ul.genesis-nav-menu")}),b(g(c)).hide()):(b(g(c)).show(),b.each(c,function(a,c){b(".moved-item-"+
c.replace(".","")).appendTo(c+" ul.genesis-nav-menu").removeClass("moved-item-"+c.replace(".",""))}))}}function t(){var a=b(this);h(a,"aria-pressed");h(a,"aria-expanded");a.toggleClass("activated");a.next("nav").slideToggle("fast")}function u(){var a=b(this),d=a.closest(".menu-item").siblings();h(a,"aria-pressed");h(a,"aria-expanded");a.toggleClass("activated");a.next(".sub-menu").slideToggle("fast");d.find(".sub-menu-toggle").removeClass("activated").attr("aria-pressed","false");d.find(".sub-menu").slideUp("fast")}
function p(a){var d=l();0< !b(d).length||b.each(d,function(c,d){var e=d.replace(".",""),f="genesis-"+e,g="genesis-mobile-"+e;"none"==k(a)&&(f="genesis-mobile-"+e,g="genesis-"+e);e=b('.genesis-skip-link a[href="#'+f+'"]');null!==menusToCombine&&d!==menusToCombine[0]&&e.toggleClass("skip-link-hidden");if(0<e.length){var h=e.attr("href"),h=h.replace(f,g);e.attr("href",h)}})}function k(a){a=m.getElementById(a);return window.getComputedStyle(a).getPropertyValue("display")}function h(a,b){a.attr(b,function(a,
b){return"false"===b})}function g(a){return b.map(a,function(a,b){return a}).join(",")}function l(){var a=[];null!==menusToCombine&&b.each(menusToCombine,function(b,c){a.push(c.valueOf())});b.each(genesisMenus.others,function(b,c){a.push(c.valueOf())});return 0<a.length?a:null}b.each(genesisMenusUnchecked,function(a){genesisMenus[a]=[];b.each(this,function(d,c){var f=b(c);1<f.length?b.each(f,function(d,f){var e=c+"-"+d;b(this).addClass(e.replace(".",""));genesisMenus[a].push(e);"combine"===a&&menusToCombine.push(e)}):
1==f.length&&(genesisMenus[a].push(c),"combine"===a&&menusToCombine.push(c))})});"undefined"==typeof genesisMenus.others&&(genesisMenus.others=[]);1==menusToCombine.length&&(genesisMenus.others.push(menusToCombine[0]),menusToCombine=genesisMenus.combine=null);var v={init:function(){if(0!=b(l()).length){var a="undefined"!==typeof genesisMenuParams.menuIconClass?genesisMenuParams.menuIconClass:"dashicons-before dashicons-menu",d="undefined"!==typeof genesisMenuParams.subMenuIconClass?genesisMenuParams.subMenuIconClass:
"dashicons-before dashicons-arrow-down-alt2",c=b("<button />",{"class":"menu-toggle","aria-expanded":!1,"aria-pressed":!1,role:"button"}).append(genesisMenuParams.mainMenu),f=b("<button />",{"class":"sub-menu-toggle","aria-expanded":!1,"aria-pressed":!1,role:"button"}).append(b("<span />",{"class":"screen-reader-text",text:genesisMenuParams.subMenu}));b(g(genesisMenus)).addClass("genesis-responsive-menu");b(g(genesisMenus)).find(".sub-menu").before(f);null!==menusToCombine?(f=genesisMenus.others.concat(menusToCombine[0]),
b(g(f)).before(c)):b(g(genesisMenus.others)).before(c);b(".menu-toggle").addClass(a);b(".sub-menu-toggle").addClass(d);b(".menu-toggle").on("click.genesisMenu-mainbutton",t).each(r);b(".sub-menu-toggle").on("click.genesisMenu-subbutton",u);b(window).on("resize.genesisMenu",n).triggerHandler("resize.genesisMenu")}}};b(m).ready(function(){null!==l()&&v.init()})})(document,jQuery);