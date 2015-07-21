/**
 * @PluginName	nTimeline.js
 * @Requires	jQuery, jQuery-ui, TweenMax( GSAP )
 * @Author		nonoll ( http://usefl.co.kr - hyunkwan Roh )
 * @Version		0.0.1
 * @Date		2015.07.20
 * @description
 * 	TweenMax 의 Timeline 애니메이션을 위한 Timeline 디버깅 화면 구성
 * 	Button : beginning, rewind, play & pause, stop, forward, end, autorun, repeat, align( 'top' / 'bottom' )
 * 	Options : {
 * 	 			timeline 		GSAP - Timeline
 * 	 			autorun 		Timeline Animate Autorun Flag
 * 	 			repeat 			Timeline Animate Repeat Flag
 * 	 			debug 			nTimeline.js Debug log Flag
 * 	 			modulePath 		nTimeline.js Module Path
 * 	 			align 			nTimeline.js Debbuger Display Align ( 'top', 'bottom' )
 * 	}
 */
;(function($, window) {
	'use strict';

	if( 'undefined' === typeof window.nTimeline ) {
		window.nTimeline = {};
	};

	window.nTimeline = (function() {
		var FILE_NAME = 'nTimeline.js'
			, VERSION = '0.0.1'
			, SLIDER_VALUE = { value : 0 };
		return {
			init : function( opt ) {
				this.options = {
					timeline : null
					, autorun : true
					, repeat : true
					, debug : true
					, modulePath : './nTimeline/'
					, align : 'top' // 'bottom'
				};

				this.container = null;
				this.btnAutorun = null;
				this.btnRepeat = null;
				this.btnAlign = null;
				this.slider = null;
				this.duration_cur = null;
				this.duration_total = null;

				$.extend(true, this.options, opt);
				
				this.copyLog();
				this.log( 'window.nTimeline > init this.options : ', this.options );

				if( !this.options.timeline ) {
					alert( '[ ' + FILE_NAME + ' ]\nTimeline 객체를 설정하세요.' );
					return;
				} else if( this.options.timeline._totalDuration === 0 ) {
					alert( '[ ' + FILE_NAME + ' ]\nTimeline Duration이 0초입니다.' );
					return;
				}

				this.plugins.init();

				return this;
			}
			, copyLog : function() {
				if( window.console ) {
					var style = 'font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000;'
						, message = '%c' + FILE_NAME + ' - V ' + VERSION;
					console.log( message, style );
				};
			}
			, templetLog : function() {
				if( window.console ) {
					var style = 'font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #ff0000; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000;'
						, message = '%c' + 'nTimeline.html 로드 실패 - 기본 템플릿 반영';
					console.warn( message, style );
				};
			}
			, templetMarkup : function() {
				var markup = '';

				markup += '<div id="nTimeline_debugger" style="{{ALIGN}}">';
				markup += '	<div data-role="wrap" class="ui-widget-header">';
				markup += '		<div data-role="timeline"></div>';
				markup += '		<div data-role="controller">';
				markup += '			<button data-role="beginning">go to beginning</button>';
				markup += '			<button data-role="rewind">rewind</button>';
				markup += '			<button data-role="play">{{PLAY_MODE}}</button>';
				markup += '			<button data-role="stop">stop</button>';
				markup += '			<button data-role="forward">fast forward</button>';
				markup += '			<button data-role="end">go to end</button>';
				markup += '			<input data-role="autorun" type="checkbox" id="nTimeline_autorun"><label for="nTimeline_autorun">autorun</label>';
				markup += '			<input data-role="repeat" type="checkbox" id="nTimeline_repeat"><label for="nTimeline_repeat">repeat</label>';
				markup += '			<input data-role="align" type="checkbox" id="nTimeline_align"><label for="nTimeline_align">{{BTN_ALIGN}}</label>';
				markup += '		</div>';
				markup += '		<div data-role="duration">';
				markup += '			<span>&nbsp;Duration&nbsp;:&nbsp;&nbsp;</span>';
				markup += '			<span data-role="duration_cur"></span>';
				markup += '			<span data-role="duration_total" style="color: #888;"></span>';
				markup += '		</div>';
				markup += '	</div>';
				markup += '	<div data-role="display" class="ui-widget-header">';
				markup += '		<span data-role="name">{{INFO}}</span>';
				markup += '		<button data-role="btn">close</button>';
				markup += '	</div>';
				markup += '</div>';
				
				return markup;
			}
			, getModulePath : function() {
				return this.options.modulePath;
			}
			, getVersion : function() {
				return VERSION;
			}
			, isAutoRun : function() {
				return this.btnAutorun.is( ':checked' );
			}
			, isRepeat : function() {
				return this.btnRepeat.is( ':checked' );
			}
			, isPlay : function() {
				return this.options.timeline._active;
			}
			, comma : function( num ) {
				return ( '' + num ).split( /(?=(?:\d{3})+(?:\.|$))/g ).join( ',' );
	        }
	        , currencyFormat : function( num, flag ) {
	            flag = flag || false;
	            return flag ? '￦' + this.comma( num, 3 ) : this.comma( num, 3 );
	        }
	        , addZero : function( num ) {
	            return ( parseInt( num ) < 10 ) ? '0' + num : '' + num;
	        }
			, timeToString : function( time ) {
				var cs = time
					, cm = Math.floor( cs/60 )
					, ch = Math.floor( cs/3600 )
					, ss, sm, sh;
				
				if( cs >= 60 ) {
					ss = this.addZero( cs % 60 );
				} else {
					ss = this.addZero( cs );
				};

				if( cm >= 60 ) {
					sm = this.addZero( cm % 60 );
				} else {
					sm = this.addZero( cm );
				}

				sh = this.addZero( ch );
				sh = this.currencyFormat( sh );
				return {
					'hour'		: sh
					, 'minute'	: sm
					, 'second'	: ss
					, 'ms'		: sm + ':' + ss
					, 'hms'		: sh + ':' + sm + ':' + ss
				}
	        }
			, ready : function() {
				var self = this;
				this.log( 'window.nTimeline > ready' );

				switch( this.options.align ) {
					case 'bottom':
						$( 'body' ).append( '<div id=\'nTimeline_area\'>' );
						break;
					case 'top':
					default:
						$( 'body' ).prepend( '<div id=\'nTimeline_area\'>' );		
						break;
				};
				
				$.ajax({
					url: self.getModulePath() + 'nTimeline.html',
					type: 'GET',
					dataType: 'html',
				})
				.done(function( res ) {
					self.log( 'window.nTimeline > ready ajax done', res );
					self.display( res );
				})
				.fail(function( res ) {
					self.log( 'window.nTimeline > ready ajax Error', res );
					self.templetLog();
					self.display( self.templetMarkup() );
				});
			}
			, display : function( html ) {
				this.log( 'window.nTimeline > display html', html );
				html = html.replace( '{{INFO}}', '[ nTimeline DEBUGER - V ' + this.getVersion() + ' ]' );

				if( this.options.autorun ) {
					html = html.replace( '{{PLAY_MODE}}', 'pause' );
				} else {
					html = html.replace( '{{PLAY_MODE}}', 'play' );
				};

				switch( this.options.align ) {
					case 'bottom':
						html = html.replace( '{{ALIGN}}', 'bottom: 0px' );
						html = html.replace( '{{BTN_ALIGN}}', 'top' );
						break;
					case 'top':
					default:
						html = html.replace( '{{ALIGN}}', 'top: 0px' );
						html = html.replace( '{{BTN_ALIGN}}', 'bottom' );
						break;
				};

				$( 'body' ).append( html );

				this.setTimeline();
				this.setUiBtns();

				if( this.options.autorun ) {
					this.options.timeline.play();
				} else {
					setTimeout(function() {
						this.options.timeline.pause();
						this.options.timeline.progress( 0 );
					}, 10);
				}
			}
			, setTimeline : function() {
				var self = this;
				this.log( 'window.nTimeline > setTimeline' );

				this.container = $( 'div#nTimeline_debugger' );
				this.duration_cur = this.container.find( 'div[data-role="duration"] > span[data-role="duration_cur"]' );
				this.duration_total = this.container.find( 'div[data-role="duration"] > span[data-role="duration_total"]' );

				// timeline ui
				this.slider = $( 'div[data-role="timeline"]' ).slider({
					//orientation: "horizontal",
					range: 'min',
					min: 0,
					max: 100,
					value: 0,
					step: 0.1,
					start: function() {
						self.render();
						if( !self.options.autorun ) {
							self.options.timeline.pause();
						};
					}
					, slide: function( event, ui ) {
						self.options.timeline.progress( ui.value / 100 );
					}
					, stop: function() {
						if( self.options.autorun ) {
							self.options.timeline.play();
						};
						self.render();
					}
				});

				// timeline ui seekbar
				$( 'div[data-role="timeline"] span' ).mouseleave(function(event) {
					$(this).blur();
				});

				// timeline update callback
				this.options.timeline.eventCallback( 'onUpdate', function() {
					//self.duration.text( self.timeToString( self.options.timeline._time.toFixed( 1 ) ).ms + 's / ' + self.timeToString( self.options.timeline._totalDuration.toFixed( 1 ) ).ms + 's' );
					self.duration_cur.text( self.timeToString( self.options.timeline._time.toFixed( 0 ) ).ms );
					self.duration_total.text( ' / ' + self.timeToString( self.options.timeline._totalDuration.toFixed( 1 ) ).ms );
					SLIDER_VALUE.value = self.options.timeline.progress() * 100;
					self.slider.slider( SLIDER_VALUE );
				});

				// timeline complete callback
				this.options.timeline.eventCallback( 'onComplete', function() {
					self.log( 'timeline onComplete' );
					if( self.options.repeat ) {
						self.options.timeline.progress( 0 );
						self.options.timeline.play();
						self.log( 'timeline onComplete REPEAT' );
					};
					self.render();
				});

				// timeline
				$( 'div[data-role="timeline"]' ).find( 'div.ui-slider-range' ).css( { 'background' : '#ff6600' } );
			}
			, setUiBtns : function() {
				var self = this;

				this.log( 'window.nTimeline > setUiBtns' );

				// Debugger autorun checkbox;
				this.btnAutorun = this.container.find( 'div[data-role="controller"] input[data-role="autorun"]' );
				this.btnAutorun.button().click(function(event) {
					$(this).blur();
					self.options.autorun = $(this).is( ':checked' );

					if( self.options.autorun ) {
						self.options.timeline.play();
						self.render();
					};

					self.log( 'window.nTimeline > setUiBtns btnAutorun ', self.options.autorun );
				});
				if( this.options.autorun ) {
					this.btnAutorun.prop( 'checked', true );
					this.btnAutorun.button( 'refresh' );
				};

				// Debugger repeat checkbox;
				this.btnRepeat = this.container.find( 'div[data-role="controller"] input[data-role="repeat"]' );
				this.btnRepeat.button().click(function(event) {
					$(this).blur();
					self.options.repeat = $(this).is( ':checked' );

					self.log( 'window.nTimeline > setUiBtns btnRepeat ', self.options.autorun );
				});
				if( this.options.repeat ) {
					this.btnRepeat.prop( 'checked', true );
					this.btnRepeat.button( 'refresh' );
				};

				// Debugger controller btn event
				$.each( this.container.find('div[data-role="controller"] button'), function(index, val) {
					var role = $(this).data( 'role' ),
						options = {
							text: false
							, icons : {
								primary : ''
							}
						};
					switch( role ) {
						case 'beginning':
							options.icons.primary = 'ui-icon-seek-start';
							break;
						case 'rewind':
							options.icons.primary = 'ui-icon-seek-prev';
							break;
						case 'play':
							if( self.options.autorun ) {
								options.icons.primary = 'ui-icon-pause';
							} else {
								options.icons.primary = 'ui-icon-play';	
							}
							break;
						case 'stop':
							options.icons.primary = 'ui-icon-stop';
							break;
						case 'forward':
							options.icons.primary = 'ui-icon-seek-next';
							break;
						case 'end':
							options.icons.primary = 'ui-icon-seek-end';
							break;
						case 'align':
							// Debugger align checkbox;
							//this.btnAlign = this.container.find( 'div[data-role="controller"] button[data-role="align"]' );
							self.btnAlign = $(this);
							break;
					}

					$(this).button( options ).click(function(event) {
						var role = $(this).data( 'role' ),
							duration = 0,
							options = {};

						switch( role ) {
							case 'beginning':
								self.options.timeline.progress( 0 );
								break;
							case 'rewind':
								duration = ( self.options.timeline.progress() - 0.05 <= 0 ) ? 0 : self.options.timeline.progress() - 0.05;
								self.options.timeline.progress( duration );
								break;
							case 'forward':
								duration = ( self.options.timeline.progress() + 0.05 >= 1 ) ? 1 : self.options.timeline.progress() + 0.05;
								self.options.timeline.progress( duration );
								break;
							case 'end':
								self.options.timeline.progress( 1 );
								break;
							case 'play':
								if ( $( this ).text() === 'play' ) {
									options = {
										label: 'pause' , icons: { primary: 'ui-icon-pause' }
									};
									if( self.options.timeline.progress() === 1 ) {
										self.options.timeline.progress( 0 );
									};
									self.options.timeline.play();
								} else {
									options = {
										label: 'play' , icons: { primary: 'ui-icon-play' }
									};
									self.options.timeline.pause();
								}
								$( this ).button( options );
								break;
							case 'stop':
								self.options.timeline.pause();
								self.options.timeline.progress( 0 );

								options = {
											label: 'play', icons: { primary: 'ui-icon-play' }
								};
								self.container.find( 'div[data-role="controller"] button[data-role="play"]').button( options );
								break;
							case 'align':
								if ( $( this ).text() === 'bottom' ) {
									options = {
										label: 'top'
									};
								} else {
									options = {
										label: 'bottom'
									};
								}
								$(this).button( options );
								self.changeAlign( options.label );
								break;
						};

						$(this).blur();
					});
				});

				// Debugger open / close
				$( 'div[data-role="display"] button' ).button({
					text: false
					, icons : {
						primary : ( self.options.align === 'top' ) ? 'ui-icon-circle-triangle-n' : 'ui-icon-circle-triangle-s'
					}
				}).click(function(event) {
					var options;
					if( $(this).text() === 'close' ) {
						options = {
							label : 'open', icons : { primary : ( self.options.align === 'top' ) ? 'ui-icon-circle-triangle-s' : 'ui-icon-circle-triangle-n' }
						};
						$( 'div#nTimeline_area' ).animate({ height: $(this).height() }, 400 );

						if( self.options.align === 'bottom' ) {
							$( 'div#nTimeline_debugger > div[data-role="wrap"]' ).animate({ 'margin-top': $( 'div#nTimeline_debugger > div[data-role="wrap"]' ).height() }, 400, function() {
								$(this).hide();
								$( 'div[data-role="display"]' ).css({ 'margin-top': 84 });
							});
						};
					} else {
						options = {
							label : 'close', icons : { primary : ( self.options.align === 'top' ) ? 'ui-icon-circle-triangle-n' : 'ui-icon-circle-triangle-s' }
						};
						$( 'div#nTimeline_area' ).animate({ height: 115 }, 400 );

						if( self.options.align === 'bottom' ) {
							$( 'div#nTimeline_debugger > div[data-role="wrap"]' ).show();
							$( 'div#nTimeline_debugger > div[data-role="wrap"]' ).animate({ 'margin-top': 0 }, 400, function() {
							});
							$(this).parent().css({ 'margin-top': 0 });
						};
					};

					if( self.options.align !== 'bottom' ) {
						$( 'div#nTimeline_debugger > div[data-role="wrap"]' ).slideToggle();
					};

					$(this).button( options );
					$(this).blur();
				});
			}
			, render : function() {
				var self = this,
					options = {};

				if( this.isPlay() ) {
					options = {
							label: 'pause', icons: { primary: 'ui-icon-pause' }
					};
					self.container.find( 'div[data-role="controller"] button[data-role="play"]').button( options );
				} else {
					options = {
							label: 'play', icons: { primary: 'ui-icon-play' }
					};
					self.container.find( 'div[data-role="controller"] button[data-role="play"]').button( options );
				}
			}
			, changeAlign : function( align ) {
				var self = this;

				switch( align ) {
					case 'bottom':
						this.container.css( { 'top' : '0px', 'bottom' : '' } );
						this.options.align = 'top';
						break;
					case 'top':
					default:
						this.container.css( { 'top' : '', 'bottom' : '0px' } );
						this.options.align = 'bottom';
						break;
				};

				$( 'div[data-role="display"] button' ).button({
					text: false
					, icons : {
						primary : ( this.options.align === 'top' ) ? 'ui-icon-circle-triangle-n' : 'ui-icon-circle-triangle-s'
					}
				});

				this.btnAlign.blur();
			}
			, log : function() {
				if( window.console && this.options.debug ) {
	                console.log( Array.prototype.slice.call(arguments) );
	            }
			}
		}
	})();

	/**
	 * @description
	 * 	Plugin 구성 관리
	 */
	window.nTimeline.plugins = (function() {
		var PLUGIN_LOAD = 0
			, PLUGIN_LOADED = 0;
		return {
			init : function() {
				window.nTimeline.log( 'window.nTimeline.plugins > init' );

				if( 'undefined' === typeof $.fn.slider ) {
					window.nTimeline.log( 'window.nTimeline.plugins > init require jquery ui' );
					this.loadPlugin( 'jquery-ui' );
					this.loadPlugin( 'jquery-ui-css' );
				} else {
					if( !$( "link[href='" + window.nTimeline.getModulePath() + 'jquery-ui.min.css' + "']" ).prop( 'sheet' ) ) {
						this.loadPlugin( 'jquery-ui-css' );
					}
				}

				/*
				if( 'undefined' === typeof TweenMax ) {
					window.nTimeline.log( 'window.nTimeline.plugins > init require TweenMax' );
					this.loadPlugin( 'TweenMax' );
				};
				*/

				this.loadPlugin( 'nTimeline' );

				this.loadedPlugin();
			}
			, loadPlugin : function( module ) {
				var self = this;

				window.nTimeline.log( 'window.nTimeline.plugins > loadPlugin moduel', module );

				switch( module ) {
					case 'jquery-ui':
						PLUGIN_LOAD += 1;
						this.loadJS([ window.nTimeline.getModulePath() + 'jquery-ui.min.js' ], function( res ) {
							window.nTimeline.log( 'window.nTimeline.plugins > loadPlugin moduel jquery-ui.min.js', res );
							self.loadedPlugin();
						});
						break;
					case 'jquery-ui-css':
						PLUGIN_LOAD += 1;
						this.loadCSS([ window.nTimeline.getModulePath() + 'jquery-ui.min.css' ], function( res ) {
							window.nTimeline.log( 'window.nTimeline.plugins > loadPlugin moduel jquery-ui.min.css', res );
							self.loadedPlugin();
						});
						break;
					case 'TweenMax':
						PLUGIN_LOAD += 1;
						this.loadJS([ window.nTimeline.getModulePath() + 'TweenMax.min.js' ], function( res ) {
							window.nTimeline.log( 'window.nTimeline.plugins > loadPlugin moduel TweenMax.min.js', res );
							self.loadedPlugin();
						});
						break;
					case 'nTimeline':
						PLUGIN_LOAD += 1;
						this.loadCSS([ window.nTimeline.getModulePath() + 'nTimeline.css' ], function( res ) {
							window.nTimeline.log( 'window.nTimeline.plugins > loadPlugin moduel nTimeline.css', res );
							self.loadedPlugin();
						});
						break;
				}
			}
			, loadedPlugin : function() {
				PLUGIN_LOADED++;

				window.nTimeline.log( 'window.nTimeline.plugins > loadedPlugin PLUGIN_LOADED', PLUGIN_LOADED );

				if( PLUGIN_LOADED > PLUGIN_LOAD ) {
					window.nTimeline.log( 'window.nTimeline.plugins > loadedPlugin ALL LOAD COMPLETE' );
					window.nTimeline.ready();
				}
			}
		    , loadCSS : function( urls, callback, nocache ) {
		    	if( 'undefined' === typeof nocache ) {
		    		nocache = false;
		    	};

		    	$.each(urls, function(index, url) {
	    			if( nocache ) {
	    				url += '?nocache=' + new Date().getTime();
	    			};

	    			$.get(url, function(data) {
	    				$( '<link>', { rel: 'stylesheet', type: 'text/css', 'href': url } ).appendTo( 'head' );
	    			})
	    			.done(function( res ) {
	    				callback && callback( { 'url' : url, 'statusText' : 'done' } );
	    			})
	    			.fail(function( res ) {
	    				var obj = { 'url' : url };
	    				$.extend(true, obj, res);
	    				callback && callback( obj );
					});
	    		});
		    }
		    , loadJS : function( urls, callback, nocache ) {
		    	if( 'undefined' === typeof nocache ) {
		    		nocache = false;
		    	};

		    	$.each(urls, function(index, url) {
	    			if( nocache ) {
	    				url += '?nocache=' + new Date().getTime();
	    			};

	    			$.get(url, function(data) {
	    				$( '<script>', { type: 'text/javascript', 'src': url } ).appendTo( 'head' );
	    			})
	    			.done(function( res ) {
	    				callback && callback( { 'url' : url, 'statusText' : 'done' } );
	    			})
	    			.fail(function( res ) {
	    				var obj = { 'url' : url };
	    				$.extend(true, obj, res);
	    				callback && callback( obj );
					});
	    		});
		    }
		}
	})();
})(jQuery, window);