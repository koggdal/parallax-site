(function () {


	/*
		Intitialization of the parallax effect
	*/
	parallaxSite.create({
		direction: "x"
	});




	/*
		Other stuff to toggle the scrolling conversion using another script
	*/
	scrollConverter.activate();
	scrollConversion = "on";


	var bindEvent = function (elem, type, callback) {
		if (elem.addEventListener) {
			elem.addEventListener(type, callback, false);
		} else {
			elem.attachEvent(type, callback);
		}
	};


	bindEvent(document.getElementById("toggle-scroll-button"), "click", function () {
		if (scrollConversion === "off") {
			scrollConverter.activate();
			scrollConversion = "on";
		} else {
			scrollConverter.deactivate();
			scrollConversion = "off";
		}
	});
	
}());