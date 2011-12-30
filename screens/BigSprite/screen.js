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
		
	
		this.text = "   HI, YOU'RE LOOKING AT THE -BIG SPRITE DEMO-.  I WAS CODED BY THE CAREBEARS.  THE MUZEXX WAS DONE BY -MAD MAX- OF THE EXCEPTIONS.  THE \"WHERE-HAVE-I-SEEN-THAT-BEDORE?\"-LOGO WAS DESIGNED BY -ES- OF TEX.   THAT WAS THE CREDITS, NOW WHAT ARE WE GOING TO WRITE ABOUT?   WELL, I CANT HELP IT, I JUST HAVE TO SAY A FEW WORDS ABOUT THE DEFINITIVE DEMO, BY THE LOST BOYS (WE WERE QUITE UPSET WHEN WE GOT IT, AND WE SILL ARE).  IT IS NOT AS BIG AS THIS DEMO, NEITHER IS IT AS GOOD, BUT THEY MANAGED TO RELEASE A FEW FUNNY EFFECTS, THAT HAS NEVER BEEN SEEN ON ON ST BEFORE.  THE MOST IRRITATING ONE IS THEIR TWISTSCROLLER, WHICH IS LOOKS VERY MUSCH LIKE OUR DNA-SCROLLER.   THE PROBLEM WITH CODING DEMOS OF THIS SIZE IS THERE'S A VERY LONG TIME BETWEEN WHEN YOU CODE A SCREEN AND WHEN YOU FINALLY RELEASE IT.  SOME OF THE SCREENS IN THE CUDDLY DEMOS ARE MORE THAN A YEAR OLD.  IF WE WOULD HAVE RELEASED WHEN WE CODED THEM, SAY AS IN INTRO, THEY WOULD HAVE BEEN NEW AND REVOLUTIONARY.  ON THE NO-CREW-COPY-PARTY (WHERE WE CODED THE WHATTAHECK DEMO)  ALL SWEDISH CREWS OF ANY IMPORTANCE SAW ALMOST ALL OUR SCREENS,  SO IF YOU THINK THAT WE'RE STOLEN IDEAS WHEN YOU SEE SIMILARITIES BETWEEN OTHER SWEDISH DEMOS AND THIS DEMO, I'D RATHER SAY IT'S THE OTHER WAY AROUND.  THEY HAVE STOLEN IDEAS FROM OUR DEMO.     NOW, LET'S TALK ABOUT SOMETHING ELSE.  TODAY WE FINALLY GOT MUZEXX FROM MAD MAX OF TEX.  PEOPLE (ESPECIALLY OMEGA) ARE SAYING THAT THERE IS NO UNION.  WE AGREE TO SOME EXTENT - THERE4S NO INTENSIVE COOPERATION BETWEEN THE MEMBERS OF THE UNION. WE DON4T EVEN KNOW THE DELTA FORCE, TNT CREW OR LEVEL 16, EVEN THOUGH WE'D LIKE TO. NEITHER I HAVE SEEN CRACKS BY ANY MEMBER EXCEPT FOR THE REPLICANTS LATELY.  ON THE OTHER HAND, TEX ARE ONE OF THE BEST CODERS, THE REPLICANTS ARE THE BEST CRACKERS AND WE ARE THE ONE OF THEZ BEST (NO, LET'S NOT BE MODEST) THE BEST DEMO-CODERS.  WE GET MUZEXX FROM TEX, AND THEY GET TO KNOW OUR NEW SCROLL-TECHNIQUES.    A FEW MOMENTS AGO, TFE OF OMEGA CALLED AND THAT HE HAD \"BULLSHITTED\" US IN SOME OF THEUR SCROLLTEXTS, BECAUSE WE HAVEN'T SEND OUR LOADER YET (WE TRADED IT FOR THEIR PACKER).  FIRST OF ALL, YOU MUST NOT BELEIVE ANY OF THE BULLSHIT-TCB-TEXTS IN THE OMEGA DEMO.       ";
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
		this.scrolltextOut.init(this.scrollcanvas,this.fontOut,8, undefined, undefined, 32);
		
		this.scrolltextIn = new scrolltext_horizontal();
		this.scrolltextIn.scrtxt=this.text;
		this.scrolltextIn .init(this.scrollcanvas,this.fontIn,8, undefined, undefined, 32);	
		
		this.logoAngle = 0;
		this.rastPos = 0;
		
		this.logoZoom = 1.0;
		this.logoZoomIncr = -0.05;
		
		this.showTop = true;
		this.framecounter = 0;
	},
	
	setRotSpeed : function(val)
	{
		if(this.logoZoom >= 1.0)
		{
			this.logoZoomIncr = -val;
		}
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
	update : function() 
	{
		// update rasters
		this.rastPos += 1.5;
		if(this.rastPos >= 119) this.rastPos = 0; 
		
		this.logoZoom += this.logoZoomIncr;
		if(this.logoZoom <= -1.0) this.logoZoomIncr = -this.logoZoomIncr;
		if(this.logoZoom >= 1.0) this.logoZoomIncr = -this.logoZoomIncr;

		
		if(this.logoZoom <= 0.0)
		{
			this.showTop = false;
		}
		else
		{
			this.showTop = true;
		}
		
		if(this.framecounter >= 72 && this.framecounter < 600)
		{	
			this.setRotSpeed(0.0);
		}
		else if(this.framecounter >= 600 && this.framecounter < 1000)
		{
			this.setRotSpeed(0.08);
		}
		else if(this.framecounter >= 1000 && this.framecounter < 1300)
		{
			this.setRotSpeed(0.0);
		}
		else if(this.framecounter >= 1300 && this.framecounter < 1500)
		{
			this.setRotSpeed(0.15);
		}
		else if(this.framecounter >= 1500 && this.framecounter < 1800)
		{
			this.setRotSpeed(0.0);
		}
		else if(this.framecounter >= 1800) 
		{ 
			this.framecounter = 0; 
			this.setRotSpeed(0.09); 
		}
	
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
		me.video.getScreenCanvas().height = 400+52;
		this.maincanvas.fill('#000000');
		this.scrollcanvas.clear();
		
		// draw 3D dot starfield
		this.starfield.draw();		
		
		if(this.showTop)
			this.logoUnion.draw(this.maincanvas, 320 + 120*Math.cos(this.logoAngle), 200 + 80*Math.sin(this.logoAngle*2), 1.0, 0, 1.0, this.logoZoom);
		else
			this.logoUnion2.draw(this.maincanvas, 320 + 120*Math.cos(this.logoAngle), 200 + 80*Math.sin(this.logoAngle*2), 1.0, 0, 1.0, this.logoZoom);
		
		// draw sprites
		for(var i=0; i<11; i++)
		{
			this.sprites[i].draw(this.maincanvas, 320 + 300*Math.sin(this.logoAngle*1.3 - (i*0.2)), 180 + 180*Math.cos(this.logoAngle/2  - (i*0.2)));
		}
		
		this.scrolltextIn.draw( 0);
		this.scrollcanvas.contex.globalCompositeOperation='source-in';
		// function(dst,x,y,partx,party,partw,parth,alpha, rot,zx,zy){
		this.rasters.drawPart(this.scrollcanvas, 0, 0, 0, Math.round(this.rastPos), 640, 52);
		this.scrollcanvas.contex.globalCompositeOperation='source-over';
		this.scrolltextOut.draw(0);	
		
		// draw resulting buffer on screen canvas
		this.scrollcanvas.draw(this.maincanvas, 34, 400)			
		this.fontOut.drawTile(this.maincanvas, 28, -32,400);
		this.fontOut.drawTile(this.maincanvas, 30, 640-34,400);
		
		this.logoAngle += 0.04;
		
		this.framecounter++;
	},
	
	/*---
	
		called by the engine when switching state
	  ---*/
	
	onDestroyEvent : function()
	{
		// stop the current track

	}


});
