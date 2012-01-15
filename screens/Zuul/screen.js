/* -----

	Screen Objects
		
	------	*/

var ZuulScreen = me.ScreenObject.extend({
	/*---
	
	init
		
	---*/
	init : function() 
	{
		var h, w, ch, cw;
		// call the parent constructor
		this.parent(true);
		
		this.maincanvas=new canvas(me.video.getScreenCanvas()); // reuse melonJS main canvas
		h  = this.maincanvas.height;
		w  = this.maincanvas.width;
		ch = h >> 1;
		cw = w >> 1;

		this.font = new image(me.loader.getImage("fonts"));
		this.font.initTile(82,80,32);
		this.starfield = new starfield3D(this.maincanvas, 500, 2,
						 w, h, cw, ch,
						 '#FFFFFF', 100, 0, 0);
		this.scrolltext = new scrolltext_horizontal();
		this.scrolltext.scrtxt="ZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUUL";
		this.scrolltext.init(this.maincanvas,this.font,12);
		this.no_sound = true;
	},
	
	/* ---
		onReset (called by the engine) function
	   ----*/
	
	onResetEvent : function()
	{	
		// use requestAnimFrame
		me.sys.useNativeAnimFrame = false;
		
		this.maincanvas.fill('#000000');	
		
		// play music
		if (!this.no_sound) {
		jsApp.ymPlayer.load(me.loader.getBinary('zuul_screen_music'));
		jsApp.ymPlayer.play();
		}
	},

	// make sure the screen is refreshed at every change 
	update : function() 
	{			
		// if press ESC
		if (me.input.isKeyPressed('exit'))
		{
			// go back to menu
			me.state.change(me.state.PLAY);
		}
		return true;
	},

	/*---
	
		draw function
	  ---*/

	draw : function(context) 
	{
		this.maincanvas.fill('#000000');
		this.scrolltext.draw(200);
		this.starfield.draw();
	},
	
	/*---
	
		called by the engine when switching state
	  ---*/
	
	onDestroyEvent : function()
	{
		// stop the current track
		if (!this.no_sound) {
			jsApp.ymPlayer.stop();
		}
	}


});
