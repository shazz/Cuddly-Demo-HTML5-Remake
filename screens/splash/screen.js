/* -----

	Screen Objects
		
	------	*/

var SplashScreen = me.ScreenObject.extend({
	/*---
	
		constructor
		
		---*/
	init : function() {
		// call the parent constructor
		this.parent(true);
		
		// background image
		this.backgroundImg = null;
		this.loaded = false;
	},
	
	/* ---
		onReset (called by the engine) function
	   ----*/
	
	onResetEvent : function()
	{	
		var self = this;

		// background image
		me.loader.load({name: "amigaga", type:"image", src: "screens/splash/amigaga.png"}, function() 
		{
			// init the background image
			self.backgroundImg = me.loader.getImage("amigaga");
			self.loaded = true;
			
			// fadeout
			me.game.viewport.fadeOut("#000000", 500, function(){
				// wait 1s
				window.setTimeout(function() {
					//fade in
					me.game.viewport.fadeIn("#000000", 500, function(){
						// trick to avoid the splash to be redraw in the mean time
						self.loaded = false; 
						// and preload the rest
						jsApp.preload()
					});
				}, 1000);
			});
			
		}, null);
	},
	
	// make sure the screen is refreshed at every change 
	update : function() {
		return this.loaded;
	},

	/*---
	
		draw function
	  ---*/

	draw : function(context) {
		if (this.loaded) {
			// display the background
			context.drawImage(this.backgroundImg, 0 ,0);
		}
	},
	
	/*---
	
		called by the engine when switching state the loader
	  ---*/
	
	onDestroyEvent : function()
	{
		// "nullify" all objects
		this.backgroundImg = null;
   },

});
