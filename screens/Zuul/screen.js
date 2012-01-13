/* -----

	Screen Objects
		
	------	*/

var ZuulScreen = me.ScreenObject.extend({
	/*---
	
	init
		
	---*/
	init : function() 
	{
		// call the parent constructor
		this.parent(true);
		
		this.maincanvas=new canvas(me.video.getScreenCanvas()); // reuse melonJS main canvas
		
		this.font = new image(me.loader.getImage("fonts"));
		this.font.initTile(82,80,32);
		this.scrolltext = new scrolltext_horizontal();
		this.scrolltext.scrtxt="ZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUULZUUL";
		this.scrolltext.init(this.maincanvas,this.font,12);
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
		jsApp.ymPlayer.load(me.loader.getBinary('zuul_screen_music'));
		jsApp.ymPlayer.play();
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
	},
	
	/*---
	
		called by the engine when switching state
	  ---*/
	
	onDestroyEvent : function()
	{
		// stop the current track
		jsApp.ymPlayer.stop();
	}


});
