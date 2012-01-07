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
	// Screen ID when changing state
	ScreenID : {
		amigarulez			: 99, // splash (amiga starts where he wants!)
		intro				: 100, // start at 100 on purpose, don't use UpperCase !
		doc3d				: 101,
		bigSprite			: 102,
		thecolorshock2 		: 103,
		theehhdemo			: 104,
		themegascroller		: 105,
		spreadpointdemo 	: 106,
		thedigidemo			: 107,
		theledscroller		: 108,
		thefullscreendemo	: 109,
		theknucklebuster 	: 110,
		thestarwarsdemo		: 111,
		thednademo			: 112,
		themegaballdemo		: 113,
		theresetdemo		: 114,
		thehiddenscreen		: 115,
		thezuulhiddenscreen	: 116,
	},
	
	// last entity position
	entityPos : null,
	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	init: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 640, 390+56, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
		
		// force a viewport with a smaller size
		me.game.init(640,288+30);
				
		// initialize the "audio"
		me.audio.init("ogg");
		
		// splash screen
		me.state.set(jsApp.ScreenID.amigarulez, new SplashScreen());
		// DemoIntro
		me.state.set(jsApp.ScreenID.intro, new DemoIntro());
		
		// start the splash 
		me.state.change(jsApp.ScreenID.amigarulez);
			
	},
	
	/* ---
	
		this is temporary		
		---					*/
	preload: function ()
	{
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
		
		// register the various screen;
		me.state.set(jsApp.ScreenID.bigsprite, new BigSpriteScreen());
		me.state.set(jsApp.ScreenID.thecolorshock2, new Colorshock2Screen());
		me.state.set(jsApp.ScreenID.theehhdemo, new EhhDemoScreen());
		me.state.set(jsApp.ScreenID.themegascroller, new MegaScrollerScreen());	
		me.state.set(jsApp.ScreenID.spreadpointdemo, new SpreadpointDemoScreen()); 
		me.state.set(jsApp.ScreenID.thedigidemo, new DigiDemoScreen());	
		me.state.set(jsApp.ScreenID.theledscroller, new LedScrollerScreen());	
		me.state.set(jsApp.ScreenID.thefullscreendemo, new FullscreenDemoScreen());
		me.state.set(jsApp.ScreenID.theknucklebuster, new KnucklebusterScreen()); 
		me.state.set(jsApp.ScreenID.thestarwarsdemo, new StarwarsDemoScreen());	
		me.state.set(jsApp.ScreenID.thednademo, new DNADemoScreen());	
		me.state.set(jsApp.ScreenID.themegaballdemo, new MegaBallScreen());	
		me.state.set(jsApp.ScreenID.theresetdemo, new ResetDemoScreen());	
		me.state.set(jsApp.ScreenID.thehiddenscreen, new HiddenScreen());	
		me.state.set(jsApp.ScreenID.thezuulhiddenscreen, new ZuulScreen());				
		
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
		
		// add our player entity in the entity pool
		me.entityPool.add("MainEntity", MainEntity);
		// add our door entity in the entity pool
		me.entityPool.add("DoorEntity", DoorEntity);
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,    "fly");
		// bind the space key, and avoid key repetition
		me.input.bindKey(me.input.KEY.SPACE, "enter", true);
		// bind the ESC key, to exit demo
		me.input.bindKey(me.input.KEY.ESC, "exit");
		
		// debug stuff
		//me.debug.renderHitBox = true;
		
		// start the game 
		me.state.change(me.state.PLAY);
		
		
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{
	
	init: function()
	{	
		this.parent(false)
		// init the YM Player
		this.YMPlayer = new music("YM");		
	},
	
	onResetEvent: function()
	{	
		// use setInterval
		me.sys.useNativeAnimFrame = false;
		
		// load a level
		me.levelDirector.loadLevel("menu");
		
		// add the main menu object
		me.game.add(new MainMenuObject(1, 1),999);
		me.game.sort();

		
		// start the main menu music 
		// there is no just a Load function ?
		this.YMPlayer.LoadAndRun('data/music/Cuddly - main menu.ym');
		// reconnect if we disconnect previously
		if (this.YMPlayer.player != null) {
			CODEF_AUDIO_NODE.connect(CODEF_AUDIO_CONTEXT.destination);
		}
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
		if (this.YMPlayer.player != null) {
			// stop the menu music
			// is this the right way ?
			CODEF_MUSICPLAYER.stop();
			CODEF_AUDIO_NODE.disconnect();
		}
	}

});


//bootstrap :)
window.onReady(function() 
{
	jsApp.init();
});
