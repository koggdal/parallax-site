# Parallax Site

This is a script that makes it easy for you to set up a site that uses parallax scrolling as its main effect. A parallax site concists of items in different layers that move with different speeds, to give the illusion of depth.




## How it works


The script is controlled mostly from HTML and CSS. You specify layers in your markup and position them in CSS. You set HTML5 data attributes on each layer to let the script know about them. That is also where you specify the speed for the layer.


### About speeds

The illusion is created from the fact that we set different speeds on different elements. This makes an element with a high speed look like it's closer than an element with a lower speed.

Normally on a site, all elements scroll with even speed. When you use this script, an element can scroll either with that speed, or slower. By default, the span is between 0 (the object will not appear to move, no matter how much you scroll) and 10 (normal speed).


### About layers

Most items will be specified as normal layers. They will move by changing the CSS properties `top`/`left`. The second layer type is backgrounds. It is an element where you don't want to move the element itself, but rather the background image. Background layers will change the `background-position` CSS property instead.


### Browser support

This works in every browser I have tested in, except for IE 6. There is also an exception for touch devices. iOS Safari doesn't send any scroll event while scrolling, it only sends the event when you release, which makes it impossible to detect every position while scrolling. I have no Android device to test with, so I haven't confirmed anything there, but I imagine it works similar there. Because of this, the script automatically blocks the effect for iOS and Android. Please tell me if this is not the case for Android. If you don't want the script to block these devices, you can set the option `disableTouchDevices` to `false` when initializing the script (see below).



## Usage


### Include the script into your page
The script depends on jQuery, so you must also include some version of that.

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	<script src="parallax-site.min.js"></script>


### Initialize the script
To enable the script you need to initialize it. This is the simplest way to do that.

	parallaxSite.create();

The `create` method takes an optional object where you can set options for the script. These are the available options:

* `direction`: The direction of the site, possible values: `"x"` or `"y"`. Default: `"y"`
* `normalSpeed`: The speed number which is the max value for any layer. Default: `10`
* `bgPos`: Background layers use background-position, but changes only in one of the axis (specified by `direction`). This is the value for the other axis. Default: `"50%"`
* `disableTouchDevices`: Disables parallax for touch devices (see Browser support above). Default: `true`


### Specify layers in your markup
Layers are specified with normal HTML. Each element you want to have as a layer has two HTML5 data attributes: data-layer and data-speed. The first is just a boolean that tells the script that this is a layer (value must be true for it to work). An example of a specified layer could look like this:

	<div data-layer="true" data-speed="5"></div>

You can add these attributes on any element, add classes for CSS and whatever you want. As long as these attributes are there, the script will find it.

As mentioned before, you might want a background layer as well. Since background layers are treated specially, you need to set a specific data attribute. A background layer could look like this:

	<div data-layer="true" data-background="true" data-speed="5"></div>


### Add some style
You need to add some basic styles to make the effect work. For background layers, you need to set the `background-attachment` property to `fixed`. For regular layers you don't need any special styling just to make it work. But you need to position the elements the way you want to. Since the `top`/`left` CSS properties are used by the script, you need to set the position using margins.

Note that it can be difficult to position the elements exactly the way you want it, especially when using a low speed. An element with a low speed is supposed to look like it's far away, and therefore moves very little, which can make it overlap other parts of your page.

Because of the lacking support on iOS and Android, you might want to make it look good on these devices, even if the parallax effect won't work. To enable this, the script adds a class to the body element. The class `parallax` is added when it's used, and `no-parallax` when it's not used.


### Test and tweak
Hopefully, the parallax effect should now work on your site! You will now have to tweak the speeds and positions to get it perfect.


### Look at the examples
If you get stuck, look at the examples to see if that will help you.



## License


This script was developed by me ([Johannes Koggdal](http://koggdal.com/)) while working at [BombayWorks](http://bombayworks.com/). We open source it under the MIT license to spread the knowledge and make it simpler for other people to make the web more awesome.