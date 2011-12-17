/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Cuddly Demo HTML5 Remake
 *
 **/


var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 640, 400, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
				
		// initialize the "audio"
		//me.audio.init("mp3,ogg");
		this.player = new music("YM");
		
		// get a ref to the canvas
		var ctx = me.video.getScreenFrameBuffer();
		// clear surface
		me.video.clearSurface(ctx, "black");
		// display a centered "please wait"
		var font = new me.Font('courier', 11, 'white');
		var dim  = font.measureText(ctx, 'PLEASE WAIT');
		font.draw(ctx, 'PLEASE WAIT', ((ctx.canvas.width - dim.width) / 2),  (ctx.canvas.height) / 2);
						
		// manually load the background, since we need it to be loaded for the loader...
		me.loader.load({name: "loader", type:"image", src: "data/background/loader.png"}, function() 
		{
			// same for the brown font
			me.loader.load({name: "loader_font_brown", type:"image", src: "data/fonts/fonts15x16_brown.png"}, function() 
			{
				// and for the white font
				me.loader.load({name: "loader_font_white", type:"image", src: "data/fonts/fonts15x16.png"}, function() 
				{
					// set all resources to be loaded
					me.loader.onload = jsApp.loaded.bind(jsApp);
				
					// set all resources to be loaded
					me.loader.preload(g_resources);

					// set our custom loader
					me.state.set(me.state.LOADING, new TCBLoader());
				
					// load everything & display the loading screen
					me.state.change(me.state.LOADING);
				}, null);
			}, null);
		}, null);
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// start the main menu music
		this.player.LoadAndRun('data/music/Cuddly - main menu.ym');
		
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
      
		// start the game 
		me.state.change(me.state.PLAY);
		
		// add our player entity in the entity pool
		me.entityPool.add("MainEntity", MainEntity);
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,		"left");
		me.input.bindKey(me.input.KEY.RIGHT,	"right");
		me.input.bindKey(me.input.KEY.UP,		"fly");

	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

	onResetEvent: function()
	{	
		// load a level
		me.levelDirector.loadLevel("menu");

	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
	
	}

});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
