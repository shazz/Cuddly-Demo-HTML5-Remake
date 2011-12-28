/* -----

	Screen Objects
		
	------	*/

var BigSpriteScreen = me.ScreenObject.extend({
	/*---
	
		constructor
		
		---*/
	init : function() 
	{
		// call the parent constructor
		this.parent(true);
		
		
		this.text = "ABCDEF GHIJKLMNOPQRTSUV PRESENT..... ";
		// init canvas and offscreen canvas
		this.maincanvas=new canvas(me.video.getScreenCanvas()); // reuse melonJS main canvas			
		this.scrollcanvas = new canvas(572,52);
		
		this.logoUnion = new image(me.loader.getImage('bs_logoUnion'));
		this.logoUnion.setmidhandle();
		this.logoUnion2 = new image(me.loader.getImage('bs_logoUnion2'));
		this.logoUnion2.setmidhandle();
		this.fontOut = new image(me.loader.getImage('bs_fontOut'));
		this.fontIn = new image(me.loader.getImage('bs_fontIn'));
		this.rasters = new image(me.loader.getImage('bs_rasters'));

		
		this.fontIn.initTile(66,52,32);
		this.fontOut.initTile(66,52,32);
		
		this.sprites = new Array();
		this.sprites[0] = new image(me.loader.getImage('bs_spriteT'));
		this.sprites[1] = new image(me.loader.getImage('bs_spriteH'));
		this.sprites[2] = new image(me.loader.getImage('bs_spriteE'));
		this.sprites[3] = new image(me.loader.getImage('bs_spriteC'));
		this.sprites[4] = new image(me.loader.getImage('bs_spriteA'));
		this.sprites[5] = new image(me.loader.getImage('bs_spriteR'));
		this.sprites[6] = new image(me.loader.getImage('bs_spriteE'));
		this.sprites[7] = new image(me.loader.getImage('bs_spriteB'));
		this.sprites[8] = new image(me.loader.getImage('bs_spriteE'));
		this.sprites[9] = new image(me.loader.getImage('bs_spriteA'));
		this.sprites[10] = new image(me.loader.getImage('bs_spriteR'));
		this.sprites[11] = new image(me.loader.getImage('bs_spriteS'));
		
		this.starfield=new starfield3D(this.maincanvas, 160, 3, 640,400, 320, 200,'#BBBBBB', 40,0,0, true, 1);		

		this.scrolltextOut = new scrolltext_horizontal();
		this.scrolltextOut.scrtxt=this.text;
		this.scrolltextOut.init(this.scrollcanvas,this.fontOut,6);
		
		this.scrolltextIn = new scrolltext_horizontal();
		this.scrolltextIn.scrtxt=this.text;
		this.scrolltextIn .init(this.scrollcanvas,this.fontIn,6);	
		
		this.logoAngle = 0;
	},
	
	/* ---
		onReset (called by the engine) function
	   ----*/
	
	onResetEvent : function()
	{	
		// use requestAnimFrame
		me.sys.useNativeAnimFrame = false;
		
		this.maincanvas.fill('#000000');	
	},
	

	// make sure the screen is refreshed at every change 
	update : function() {
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

	draw : function(context) {
		
		this.maincanvas.fill('#000000');
		this.scrollcanvas.clear();
		
		// draw 3D dot starfield
		this.starfield.draw();		
		
		// draw the logo in the offscreen canvas
		this.logoUnion.draw(this.maincanvas, 320 + 120*Math.cos(this.logoAngle), 180 + 80*Math.sin(this.logoAngle*2));
		
		// draw sprites
		for(var i=0; i<11; i++)
		{
			this.sprites[i].draw(this.maincanvas, 320 + 300*Math.sin(this.logoAngle*1.3 - (i*0.2)), 180 + 180*Math.cos(this.logoAngle/2  - (i*0.2)));
		}
		
		this.scrolltextIn.draw( 0);
		this.scrollcanvas.contex.globalCompositeOperation='source-in';
		this.rasters.draw(this.scrollcanvas, 0, 0);
		this.scrollcanvas.contex.globalCompositeOperation='source-over';
		this.scrolltextOut.draw(0);	
		
		// draw resulting buffer on screen canvas
		this.scrollcanvas.draw(this.maincanvas, 34, 352)			
		this.fontOut.drawTile(this.maincanvas, 28, -32,352);
		this.fontOut.drawTile(this.maincanvas, 30, 640-34,352);
		
		this.logoAngle += 0.04;
	},
	
	/*---
	
		called by the engine when switching state
	  ---*/
	
	onDestroyEvent : function()
	{
		// stop the current track

	}


});
