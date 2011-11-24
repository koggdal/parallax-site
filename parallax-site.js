/*
Parallax Site 1.0
https://github.com/koggdal/parallax-site

Copyright 2011 Johannes Koggdal (http://koggdal.com/)
Developed for BombayWorks (http://bombayworks.com/)

Released under MIT license
*/

window.parallaxSite = (function (window, document, $, undefined) {

	// Private variables
	var layers = [],
		speeds = [],
		direction = "y",
		normalSpeed = 10,
		bgPosOffset = "50%",
		win = $(window),
		callback;
	
	// Private methods
	var scroll = function () {
			var scrollOffset, i, layer, speed, pos,
			obj, bgpos, offset, prop, length, firstSpeed;

			// Skip last layer if it is the normal speed layer
			//  That layer is not touched, since it will scroll normally in the browser
			length = layers.length - 1;
			firstSpeed = layers[0].eq(0).data("speed");
			length = layers.length;
			length = length > 1 ? length - 1 : (firstSpeed !== "normal" && firstSpeed !== normalSpeed ? length : length - 1);

			// Get the scroll offset, whether it's vertically or horizontally
			scrollOffset = (direction === "y") ? win.scrollTop() : win.scrollLeft();

			// Loop through all the layer groups
			for (i = 0; i < length; i++) {
				layer = layers[i];
				speed = layer.data("speed");
				pos = -(scrollOffset / (normalSpeed / speed));

				// Each layer group can have multiple items
				layer.each(function (index) {
					obj = $(this);

					// Background layers are handled separately,
					//  by moving the background instead of the element
					if (obj.data("background") === true) {
						pos += (index === 0) ? 0 : 320;
						if (direction === "y") {
							bgpos = bgPosOffset + " " + pos + "px";
						} else {
							bgpos = pos + "px " + bgPosOffset;
						}
						obj.css({ backgroundPosition: bgpos });
					}

					// Normal layers are moved with top/left properties
					else {
						offset = obj.data("offset" + direction.toUpperCase());
						offset = (offset - scrollOffset) * (speed / normalSpeed);
						prop = (direction === "y") ? "top" : "left";
						obj.css(prop, offset);
					}
				});
			}

			// Trigger the callback
			if (typeof callback === "function") {
				callback();
			}
		};

	// Public API
	return {
		
		create: function (options) {
			var self = this;


			// Extend the default options with user defined
			options = $.extend({
				normalSpeed: 10,
				direction: "y",
				bgPos: "50%",
				disableTouchDevices: true
			}, options || {});

			// Set the direction mode
			direction = options.direction;
			normalSpeed = options.normalSpeed;
			bgPosOffset = options.bgPos;
			callback = options.callback;

			var i, lastZIndex;

			// Sort the elements into layers based on the different speeds
			$('[data-layer="true"]').each(function () {
				var speed = $(this).data("speed"),
					zIndex;

				// Replace normal keyword with set normal speed
				if (speed === "normal") {
					speed = options.normalSpeed;
				}

				// Keep the speed within the allowed range
				speed = speed > options.normalSpeed ? options.normalSpeed : Math.round(speed);


				// Create the jQuery container if it doesn't exist
				if (speeds[speed] === undefined) {
					speeds[speed] = $();
				}

				// Get the zIndex for the object
				zIndex = speeds[speed].length + speed * 100;

				// Set up all elements that are scrolling slower than normal
				if ($(this).data("background") !== true && speed < options.normalSpeed) {
					$(this).data("offsetX", $(this).position().left);
					$(this).data("offsetY", $(this).position().top);
					$(this).css({position: (self.hasSupport ? "fixed" : "absolute"), zIndex: zIndex });
				}

				// Set up all elements that have normal speed
				if (speed === options.normalSpeed) {
					if ($(this).css("position") === "static") {
						$(this).css({ position: "absolute", zIndex: zIndex });
					} else {
						$(this).css({ zIndex: zIndex });
					}
				}

				// Add the element to the list of different speeds
				speeds[speed] = speeds[speed].add(this);
			});

			// Set the layers in order
			for (i = 0; i < speeds.length; i++) {
				if (speeds[i] !== undefined) {
					layers.push(speeds[i]);
				}
			}

			// Add class to the background elements
			$('[data-background="true"]').addClass("active");

			// Set up the scroll events if the parallax effect is supported
			if (this.hasSupport && options.disableTouchDevices) {

				// Add CSS class to enable custom styling for the site in parallax mode
				$("body").addClass("parallax");

				// Event bindings
				$(window).bind("scroll", scroll);

				// Update the layers
				scroll();
			} else {
				
				// Add CSS class to enable custom styling for the site in non-parallax mode
				$("body").addClass("no-parallax");
			}

			// Return public API
			return {
				layers: layers,
				hasSupport: this.hasSupport,
				triggerScroll: scroll
			};
		},

		// Touch devices like iOS and Android have a different scrolling/viewport system,
		//  which is not working nicely with this parallax scrolling
		// We must therefore disable it for these devices
		// This property is an iife and runs and returns the result directly as the value of this property
		hasSupport: (function () {
			var platform = window.navigator.platform,
				ua = window.navigator.userAgent;

			// iOS platforms
			if (platform === "iPad" || platform === "iPhone" || platform === "iPod") {
				return false;
			}

			// Android platforms
			if (~ua.indexOf("android")) {
				return false;
			}

			// We assume it works on other devices
			return true;
		}())
	};
}(window, document, jQuery));