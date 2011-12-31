/* -----

	Screen Objects
		
	------	*/

var TCBLoader = me.ScreenObject.extend({
	/*---
	
		constructor
		
		---*/
	init : function() {
		// call the parent constructor
		this.parent(true);
		
		this.scroller_text = 
			"YOU'RE LOADING THE CUDDLY MAIN MENU, " +
			"CODED BY THE CAREBEARS. MUZEXX BY MAD, THE MAX. " +
			"MOST GRAPHIXX BY TCB, BUT SOME BY TANIS AND AD. " +
			"FONT BY TRISTAR";
			
		this.scroller_pos = 600;
		
		// background image
		this.backgroundImg = me.loader.getImage("loader");
		
		// font
		this.loader_font_brown = new me.BitmapFont("loader_font_brown", {x:15,y:16});
		this.loader_font_white = new me.BitmapFont("loader_font_white", {x:15,y:16});
        this.loader_font_brown.set("left");
		this.loader_font_white.set("left");

		// setup a callback
		me.loader.onProgress = this.onProgressUpdate.bind(this);

	},
	
	/* ---
		onReset (called by the engine) function
	   ----*/
	
	onResetEvent : function()
	{
		// flag to know if we need to refresh the display
		this.invalidate = false;

		// load progress in percent
		this.loadPercent = 0;

		
		// a cheap way to make a scroller....
		this.scroller_pos = 640;
		this.scroller_tween = new me.Tween(this).to({scroller_pos: -4000 }, 20000).onComplete(this.scrollover.bind(this)).start();
	},
	
	// reset the scroller
	scrollover : function()
	{
		// reset to default value
		this.scroller_pos = 640;
		this.scroller_tween.to({scroller_pos: -4000 }, 20000).onComplete(this.scrollover.bind(this)).start();
	},

	
	// make sure the screen is refreshed every frame 
	onProgressUpdate : function(progress) {
		this.loadPercent = progress;
		this.invalidate = true;
	},

	// make sure the screen is refreshed at every change 
	update : function() {
		if (this.invalidate === true) {
			// clear the flag
			this.invalidate = false;
			// and return true
			return true;
		}
		// else return false
		return false;
	},

	/*---
	
		draw function
	  ---*/

	draw : function(context) {
		
		// display the background
		context.drawImage(this.backgroundImg, 0 ,0);
		
		// display the "please wait text"
		this.loader_font_brown.draw(context, "PLEASE WAIT",	450, 16);
		this.loader_font_brown.draw(context, "WHILE LOADING", 430, 32);
		
		this.loader_font_brown.draw(context, "THE",			510, 64);
		this.loader_font_brown.draw(context, "MAIN MENU",		470, 80);
		this.loader_font_brown.draw(context, "SECTORS TO G0", 430, 134);
		var width = Math.floor(this.loadPercent * 110);
		this.loader_font_brown.draw(context, (110-width)+'', 	530, 158);
		
		
		// scroller
		this.loader_font_white.draw(context, this.scroller_text, this.scroller_pos, 384);
	},
	
	/*---
	
		called by the engine when switching state the loader
	  ---*/
	
	onDestroyEvent : function()
	{
		// just in case
		this.scroller_tween.stop();
		// "nullify" all objects
		this.backgroundImg = this.loader_font_brown = this.loader_font_white = null;

   },


});
