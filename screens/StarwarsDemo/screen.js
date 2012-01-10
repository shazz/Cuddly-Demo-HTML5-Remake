/* -----

	Screen Objects
		
	------	*/

var StarwarsDemoScreen = me.ScreenObject.extend(
{
	generateGrid : function (vertices, faces, gridWidth, gridHeight, tesselLevelX, tesselLevelY, lightning)
	{
		for(y=0;y<tesselLevelY; y++)
		{	
			for(x=0;x<tesselLevelX+1; x++)
			{
				vertices[(y*(2*(tesselLevelX+1))) + (2*x)] 	= 	{x: (-gridWidth/2) + (gridWidth/tesselLevelX)*x, y: (gridHeight/2) - (gridHeight/tesselLevelY)*y, 		z: 0};	
				vertices[(y*(2*(tesselLevelX+1))) + ((2*x)+1)] 	= 	{x: (-gridWidth/2) + (gridWidth/tesselLevelX)*x, y: (gridHeight/2) - (gridHeight/tesselLevelY)*(y+1), 	z: 0};	
			}
		}

		for(y=0;y<tesselLevelY; y++)
		{	
			for(x=0;x<(tesselLevelX); x++)
			{
				var i = (x + (y*tesselLevelX));
				var j = (x + (y*(tesselLevelX+1)) );

				faces[(2*i)] = 
				{			p1:0+(2*j), p2:1+(2*j), p3:3+(2*j), 
							u1:(1.0/(tesselLevelX))*x,	
							v1:(1.0/tesselLevelY)*y, 	
							u2:(1.0/(tesselLevelX))*x,	
							v2:(1.0/tesselLevelY)*(y+1), 	
							u3:(1.0/(tesselLevelX))*(x+1),
							v3:(1.0/tesselLevelY)*(y+1),
							params:lightning
				};	
				faces[((2*i)+1)]= 
				{			p1:3+(2*j), p2:2+(2*j), p3:0+(2*j), 
							u1:(1.0/(tesselLevelX))*(x+1),	
							v1:(1.0/tesselLevelY)*(y+1), 	
							u2:(1.0/(tesselLevelX))*(x+1),	
							v2:(1.0/tesselLevelY)*y, 	
							u3:(1.0/(tesselLevelX))*x,
							v3:(1.0/tesselLevelY)*y,
							params:lightning
				};
			}
		}
	},

	/*---
	
	init
		
	---*/
	init : function() 
	{
		this.USECODEF3D = false;
	
		// call the parent constructor
		this.parent(true);
		
		// -----------------------------------------------------;
		// Generated Javascript by CurveRipper
		// -----------------------------------------------------;
		this.spritePosX = [
		518, 518, 516, 516, 516, 516, 514, 514, 514, 512, 512, 508, 502, 496, 490, 478, 464, 450, 434, 414, 394, 370, 346, 322, 322, 294, 270, 246, 222, 200, 178, 158, 142, 128, 114, 102, 92, 84, 80, 74, 70, 68, 66, 68, 66, 68, 70, 72, 76, 78, 84, 88, 92, 96, 100, 106, 110, 112, 116, 118, 118, 120, 118, 116, 114, 108, 102, 96, 88, 80, 70, 60, 50, 38, 30, 20, 12, 6, 2, 2, 4, 10, 20, 30, 46, 64, 88, 112, 138, 168, 196, 226, 254, 282, 310, 338, 362, 384, 406, 424, 442, 458, 470, 494, 504, 510, 516, 522, 526, 526, 530, 530, 530, 528, 528, 524, 524, 520, 516, 514, 512, 508, 504, 504, 502, 502, 502, 502, 504, 508, 510, 514, 520, 526, 530, 538, 544, 548, 556, 560, 562, 564, 564, 560, 554, 546, 536, 524, 510, 490, 472, 454, 432, 414, 394, 374, 358, 340, 326, 312, 300, 288, 280, 272, 266, 260, 254, 248, 242, 238, 234, 228, 224, 220, 214, 210, 204, 200, 194, 190, 184, 174, 170, 164, 160, 156, 148, 144, 138, 132, 126, 118, 110, 102, 94, 84, 74, 66, 56, 48, 40, 32, 28, 22, 20, 20, 26, 32, 40, 50, 66, 82, 104, 124, 146, 172, 194, 218, 242, 262, 284, 302, 320, 334, 350, 360, 370, 378, 384, 390, 394, 396, 398, 396, 396, 394, 390, 388, 382, 378, 372, 366, 360, 354, 348, 342, 336, 332, 328, 324, 324, 324, 324, 330, 332, 340, 348, 358, 370, 382, 398, 412, 428, 444, 458, 474, 486, 500, 510, 516, 520, 522, 520, 516, 508, 496, 480, 464, 448, 428, 408, 388, 368, 350, 332, 316, 300, 286, 272, 264, 254, 246, 238, 232, 228, 222, 220, 218, 216, 214, 216, 214, 214, 216, 218, 218, 222, 222, 226, 228, 232, 234, 238, 240, 240, 242, 244, 242, 244, 242, 240, 238, 234, 230, 222, 216, 212, 208, 202, 202, 200, 200, 200, 206, 212, 218, 228, 240, 254, 270, 286, 300, 318, 334, 348, 364, 376, 388, 396, 404, 410, 416, 418, 420, 420, 420, 418, 416, 412, 406, 404, 400, 396, 392, 388, 384, 378, 374, 370, 366, 362, 352, 350, 346, 346, 344, 344, 348, 348, 354, 358, 364, 372, 378, 388, 396, 404, 414, 422, 430, 434, 440, 442, 442, 438, 432, 424, 414, 398, 380, 360, 338, 316, 290, 264, 240, 216, 192, 170, 148, 130, 114, 98, 86, 74, 64, 58, 52, 50, 48, 48, 52, 54, 58, 66, 72, 80, 90, 102, 112, 124, 134, 148, 160, 172, 182, 194, 202, 210, 218, 224, 226, 232, 232, 232, 232, 228, 226, 220, 210, 202, 198, 190, 186, 184, 182, 182, 184, 190, 198, 208, 220, 236, 254, 274, 314, 336, 356, 376, 396, 414, 432, 446, 460, 472, 482, 492, 500, 506, 512, 516, 522, 524, 526, 530, 532, 532, 534, 536, 536, 534, 536, 534, 536, 534, 532, 530, 530, 526, 526, 526, 522, 522, 520, 518 
		];
		this.spritePosY = [
		358, 352, 348, 344, 338, 334, 332, 328, 326, 324, 324, 326, 328, 328, 330, 332, 334, 334, 336, 334, 332, 326, 320, 312, 312, 302, 292, 280, 272, 262, 256, 250, 246, 242, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 242, 242, 244, 246, 248, 250, 254, 256, 258, 260, 262, 264, 264, 264, 264, 262, 260, 256, 252, 250, 248, 246, 244, 244, 246, 252, 258, 266, 276, 286, 296, 306, 316, 324, 330, 334, 336, 340, 342, 342, 342, 342, 342, 342, 342, 342, 342, 342, 342, 342, 340, 340, 338, 336, 332, 328, 324, 320, 318, 314, 312, 310, 308, 308, 310, 312, 312, 314, 318, 322, 326, 328, 332, 332, 330, 330, 324, 318, 310, 302, 294, 286, 280, 274, 270, 268, 266, 266, 266, 268, 270, 270, 272, 274, 276, 278, 278, 280, 280, 282, 282, 284, 286, 288, 290, 292, 296, 298, 302, 304, 306, 308, 310, 310, 310, 308, 306, 304, 302, 298, 294, 292, 288, 286, 286, 288, 290, 296, 302, 310, 320, 330, 340, 356, 364, 368, 372, 374, 376, 376, 374, 374, 374, 374, 374, 374, 372, 372, 372, 372, 372, 370, 368, 368, 364, 362, 358, 356, 352, 348, 346, 344, 342, 340, 340, 342, 342, 344, 348, 350, 354, 358, 360, 364, 364, 364, 362, 358, 352, 344, 336, 326, 316, 308, 302, 294, 290, 286, 284, 284, 284, 284, 284, 286, 286, 286, 286, 286, 286, 284, 284, 284, 282, 284, 282, 284, 284, 284, 286, 286, 286, 288, 288, 286, 286, 284, 282, 278, 276, 270, 266, 260, 254, 252, 248, 246, 244, 246, 248, 254, 262, 272, 282, 290, 298, 308, 314, 320, 324, 328, 330, 330, 330, 330, 330, 330, 330, 330, 330, 330, 330, 330, 330, 330, 328, 328, 326, 324, 322, 320, 316, 314, 312, 310, 308, 306, 306, 306, 310, 312, 314, 318, 322, 324, 330, 332, 334, 332, 330, 324, 316, 310, 300, 290, 280, 274, 266, 260, 256, 254, 254, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 252, 250, 250, 252, 254, 254, 256, 258, 262, 264, 264, 266, 268, 266, 266, 264, 262, 258, 256, 252, 248, 242, 242, 242, 244, 254, 264, 272, 284, 296, 308, 318, 328, 336, 342, 348, 352, 356, 358, 360, 360, 362, 364, 366, 368, 368, 370, 370, 372, 372, 374, 372, 370, 368, 366, 366, 364, 360, 358, 356, 354, 352, 352, 352, 354, 356, 358, 360, 364, 368, 370, 374, 376, 376, 374, 372, 366, 360, 352, 342, 332, 322, 314, 306, 298, 294, 290, 288, 286, 286, 284, 284, 284, 284, 284, 284, 282, 282, 282, 282, 280, 282, 282, 282, 284, 288, 290, 290, 294, 296, 298, 300, 298, 298, 296, 294, 290, 288, 284, 280, 278, 274, 274, 274, 280, 284, 290, 298, 310, 320, 330, 338, 348, 356, 364, 368, 370, 374, 374, 374, 374, 376, 376, 376, 376, 376, 376, 374, 374, 374, 372, 370, 368, 366, 362 
		];
		// -----------------------------------------------------;
		// End of Generated Javascript by CurveRipper
		// -----------------------------------------------------;		
		
		this.text = "TJA ALLIHOPA (THAT'S SWEDISH, JACKASS), HERE COMES THE CAREBEARS AGAIN, WITH ANOTHER INCREDIBLE DEMO-SCREEN, CALLED THE STARWARS-SCROLLER. YOU HAVE PROBABLY ALREADY FIGURED OUT WHY...       AS WE WRITE THIS, WE'RE OUT IN THE ARCHIPELAGOS OF STOCKHOLM, WHERE AN COOL HAS A SMALL (VERY SMALL) COTTAGE. EVERYBODY IS COMPLAINING ABOUT THEIR ACHING ARMS AND BACKS.  LET'S EXPLAIN WHAT CAUSED THESE UNPLEASENT PAINS      FIRST OF ALL, WE HAD TO TRAVEL BY TRAIN FOR ABOUT ONE HOUR. WE WENT OFF THE TRAIN IN TUMBA, WHERE WE WERE SUPPOSED TO BUY SOME FOOD AND COKE BEFORE WE GOT ON A BUS THAT WOULD DRIVE US CLOSER TO AN COOL'S COTTAGE.  BUT THERE WAS A BIG PROBLEM, WE ONLY HAD ABOUT THREE MINUTES BEFORE THE BUS LEFT, AND THE NEXT BUS WOULD COME IN ABOUT THREE AND A HALF HOUR, SO WE DECIDED TO GET ON THIS BUS AND GO TO ANOTHER SMALL STORE, NEAR THE COTTAGE.   OF COURSE THAT STORE WAS CLOSED WHEN WE GOT THERE.  OKAY, WE GOT OFF THE BUS AND NOW WE HAD A FIVE KILOMETRES WALK TO DO.   REALLY NICE, WITH BAGS FILLED WITH COMPUTERS, MONITORS, CLOTHES AND COKE.    THERE WERE EVEN MORE PROBLEMS TO COME, THE HEAVIEST BAG (WITH A WEIGHT OF ABOUT 50 KILOGRAMS) WAS DESTROYED, AND NOW TANIS AND A.D HAD TO CARRY IT ON THEIR HEADS (AND BACKS).   FINALLY WE REACHED THE COTTAGE, AFTER ABOUT ONE HOUR'S WALK.    OUR ARMS WERE ABOUT TWO METRES LONGER THAN THEY WERE THIS MORNING.  AFTER THIS VERY INTERESTING STORY, YOU CAN UNDERSTAND WHY OUR ARMS ARE ACHING!!        LET'S CHANGE SUBJECT...     TODAY WE GOT THE LOST BOYS DEMO, WHICH WAS QUITE GOOD, BUT NOT NEARLY AS GOOD AS THIS ONE (THIS IS ACTUALLY MORE THAN TEN TIMES BETTER).   WE WERE QUITE DISTURBED WHEN WE SAW THEIR TWIST-SCROLLER, WHICH LOOKED SIMILAR TO OUR DNA-SCROLLER, BUT OF COURSE OURS IS MUCH, MUCH BETTER, AND I THINK THAT WE WROTE IT BEFORE THEY WROTE THEIRS (WE WROTE IT THREE MONTHS AGO).   THEY SAID THAT THEIR DEMO WAS THE BEST \"SINGLE-CREW\"-DEMO EVER, WELL, OUR DEMO IS ALMOST A \"SINGLE-CREW\"-DEMO, AND IF YOU REMOVE THE GUEST APPEARANCES, WE STILL THINK THAT OUR DEMO IS AT LEAST FIVE TIMES BETTER THAN THEIRS.   THE LOST BOYS ALSO WROTE THAT THEIR SOURCE-CODE WAS ABOUT 230 KILOBYTES LONG, WE COUNTED HOW MUCH MEMORY OUR SOURCE-CODE TOOK AND IT WAS ABOUT 1400 KILOBYTES LONG!!!! AND IF YOU WOULD PRINT IT, IT WOULD TAKE 650 A4-PAGES.     NOW YOU PROBABLY THINK THAT WE ARE TALKING BIG.   WELL, WE KNOW WE'RE NOT EXACTLY MODEST, BUT WE CAN'T BE, COZ NOBODY ELSE IS. YOU KNOW, WE HAVE TO BE THE BEST IN EVERYTHING, INCLUDING TALKING BIG.     WE WON'T WRITE ANYTHING MORE, BECAUSE THE ONLY THING WE COULD WRITE NOW IS THE GREETINGS AND WE HAVE GREETINGS ENOUGH IN THE MAIN MENU...   BYE, BYE AND KEEP ON HACKING.......    PUSSELIMUSS!!!    TJA DAUU!!  GOOD NIGHT!! (IT'S TWO O'CLOCK, BUT THE NIGHT IS STILL YOUNG) OKAY, LET'S WRAAAAAAAAAAAAAAAAAAAAAAZ!!!!!!!!!!         ";
		this.swtext = [];
		this.swtext[0] = "AAAAAAAAAAAA";
		this.swtext[1] = " WELCOME TO ";
		this.swtext[2] = "THE STARWARS";
		this.swtext[3] = "  SCROLLER  ";
		this.swtext[4] = " WRITTEN BY ";
		this.swtext[5] = "    THE     ";
		this.swtext[6] = "   REALLY   ";
		this.swtext[7] = " MEGAMIGHTY "; 
		this.swtext[8] = " CAREBEARS! ";
		this.swtext[9] = "    FROM    ";
		this.swtext[10]= " THE  UNION ";
		this.swtext[11]= "            ";
		this.swtext[12]= "YOU MUST NOT";
		this.swtext[13]= " FORGET OUR ";
		this.swtext[14]= " COPY PARTY ";
		this.swtext[15]= "YOU CAN READ";
		this.swtext[16]= " WHERE  AND ";
		this.swtext[17]= "WHEN IT WILL";
		this.swtext[18]= " BE IN  THE ";
		this.swtext[19]= " MAIN  MENU ";
		this.swtext[20]= "  CURRENT   ";
		this.swtext[21]= "   MEMBER   ";
		this.swtext[22]= " STATUS  OF ";
		this.swtext[23]= " THE  UNION ";
		this.swtext[24]= "    TEX     ";
		this.swtext[25]= "DELTA FORCE ";
		this.swtext[26]= "  TNT CREW  "; 
		this.swtext[27]= "    TCB     ";
		this.swtext[28]= "LEV. SIXTEEN";
		this.swtext[29]= " REPLICANTS ";
		this.swtext[30]= " SOFTRUNNER ";
		this.swtext[31]= "   GROUP    ";
		this.swtext[32]= "            ";
		this.swtext[33]= "  CREDITS   ";
		this.swtext[34]= "            ";
		this.swtext[35]= "    THE     ";
		this.swtext[36]= " CAREBEARS  ";
		this.swtext[37]= "            ";
		this.swtext[38]= " ALL CODING ";
		this.swtext[39]= "    AND     ";
		this.swtext[40]= "MATHEMATICAL";
		this.swtext[41]= "CALCULATIONS";
		this.swtext[42]= "            ";
		this.swtext[43]= "            "; 
		this.swtext[44]= "   TANIS    "; 
		this.swtext[45]= "            ";
		this.swtext[46]= "UNIONSPRITES";
		this.swtext[47]= "            ";
		this.swtext[48]= "            ";
		this.swtext[49]= "KNIGHT HAWKS";
		this.swtext[50]= "   AMIGA    ";
		this.swtext[51]= "            ";
		this.swtext[52]= "    FONT    ";
		this.swtext[53]= "            ";
		this.swtext[54]= "            ";
		this.swtext[55]= "  MAD  MAX  ";
		this.swtext[56]= "            ";
		this.swtext[57]= "    MUSIC   ";
		this.swtext[58]= "            ";
		this.swtext[59]= "  MAY  THE  ";
		this.swtext[60]= "  FORCE BE  ";
		this.swtext[61]= "  WITH YOU  ";
		this.swtext[62]= "            ";
		this.swtext[63]= "            ";

		this.swtrspText = [];
		for(var i=0;i<12;i++)
		{
			this.swtrspText[i] = "";
			for(var j=0;j<this.swtext.length;j++)
			{
				this.swtrspText[i] += this.swtext[j].charAt(i);
			}
		}
		
		this.maincanvas=new canvas(me.video.getScreenCanvas()); // reuse melonJS main canvas
		this.scrollcanvas1 = new canvas(640,200);
		this.scrollcanvas2 = new canvas(640,200);
		this.scrollrastercanvas = new canvas(640,200);
		this.starwarscanvas = new canvas(320,350);
		this.a3dcanvas = new canvas(640,170);
		
		this.fonts = new image(me.loader.getImage('sw_fonts'));
		this.fonts.initTile(32/2,20/2,32);
		
		this.scrolltextSw = new Array();
		for(var i=0;i<12;i++) 
		{
			this.scrolltextSw[i] = new scrolltext_vertical();
			this.scrolltextSw[i].scrtxt = this.swtrspText[i];
			this.scrolltextSw[i].init(this.starwarscanvas,this.fonts,1, undefined, undefined, 16/2);
		}
		
		this.fontOut = new image(me.loader.getImage('sw_fontOut'));
		this.fontIn = new image(me.loader.getImage('sw_fontIn'));
		this.scrollrasters = new image(me.loader.getImage('sw_scrollrasters'));

		this.fontIn.initTile(66,52,32);
		this.fontOut.initTile(66,52,32);

		this.scrolltextIn = new scrolltext_horizontal();
		this.scrolltextIn.scrtxt=this.text;
		this.scrolltextIn .init(this.scrollcanvas1,this.fontIn,16);
		
		this.scrolltextOut = new scrolltext_horizontal();
		this.scrolltextOut.scrtxt=this.text;
		this.scrolltextOut.init(this.scrollcanvas2,this.fontOut,16);
		
		this.scrolltextfxparam=
		[
			{value: 0, amp: 60, inc:0.007, offset: -0.03},
	      	];				
		this.scrolltextInfx  = new FX(this.scrollcanvas1,this.scrollrastercanvas,this.scrolltextfxparam);;
		this.scrolltextOutfx = new FX(this.scrollcanvas2,this.scrollrastercanvas,this.scrolltextfxparam);;

		
		this.starfield=new starfield3D(this.maincanvas, 100, 3, 640,400, 320, 200,'#BBBBBB', 40,0,0, true, 1);		
		
		this.rasterCounter = 0;
		this.swrasters = new Array();
		this.swrasters[0] = new image(me.loader.getImage('sw_rasters1'));
		this.swrasters[1] = new image(me.loader.getImage('sw_rasters2'));
		
		this.logoUnion = new image(me.loader.getImage('sw_logoUnion'));
		this.logoAlpha = 0.00000001;
		this.logoIncr = 0.1;
		
		this.sprites = new Array();
		this.sprites[0] = new image(me.loader.getImage('sw_spriteT'));
		this.sprites[1] = new image(me.loader.getImage('sw_spriteH'));
		this.sprites[2] = new image(me.loader.getImage('sw_spriteE'));
		this.sprites[3] = new image(me.loader.getImage('sw_spriteSpc'));
		this.sprites[4] = new image(me.loader.getImage('sw_spriteU'));
		this.sprites[5] = new image(me.loader.getImage('sw_spriteN'));
		this.sprites[6] = new image(me.loader.getImage('sw_spriteI'));
		this.sprites[7] = new image(me.loader.getImage('sw_spriteO'));
		this.sprites[8] = new image(me.loader.getImage('sw_spriteN'));
		this.spritePos = 0;
			
		//this.scrollrasters.draw(this.starwarscanvas, 0 , 0);

		this.swtext = new THREE.Texture( this.starwarscanvas.canvas );
		//this.swtext = new THREE.Texture( this.scrollrasters.img );
    		this.swtext.needsUpdate = true;
    		
		if(this.USECODEF3D == false)
		{
			this.renderer = new THREE.CanvasRenderer({ canvas: this.a3dcanvas.canvas});
			this.renderer.setSize( this.a3dcanvas.width, this.a3dcanvas.height );
			this.renderer.autoClear=false;		

			this.scene = new THREE.Scene(); 

			this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 280, 8, 12), new THREE.MeshBasicMaterial( { map: this.swtext, overdraw: true } ) );
			this.mesh.rotation.x = - 52 * Math.PI / 180; 
			this.mesh.position.y = 44;

			this.camera = new THREE.Camera( 60, 640 / 400, 1, 10000 );
			this.camera.position.z = 150;
			this.camera.position.y = 0;
			this.camera.lookAt( this.scene.position );	
			this.scene.add( this.mesh );
		}
		else
		{
			this.planeFaces = [];
			this.planeVerts = [];		
		
			this.generateGrid(this.planeVerts, this.planeFaces, 360, 400, 10, 14, new MeshBasicMaterial({ map: this.swtext, overdraw: false  }) );
			this.plane3d = new codef3D(this.a3dcanvas, 35, 90, 10, 500 );

			this.plane3d.faces(this.planeVerts,this.planeFaces, false, true );		
			this.plane3d.group.rotation.x = -0.7;
			this.plane3d.group.position.z = -65;
			this.plane3d.group.position.y = 20;
			
			// if projected on main canvas
			//this.plane3d.group.rotation.x = -1.4;
			//this.plane3d.group.position.z = -280;
			//this.plane3d.group.position.y = -60;		
		}
				
		//Debug
		this.d_showLogo = false; // 0 fps
		this.d_showTopScroller = false; // 30 fps
		this.d_showBottomScroller = true; // 25 fps
		this.d_showSprites = false; // 0 fps
		this.d_showStarfield = true; // 5 fps
				
	},
	
	/* ---
		onReset (called by the engine) function
	   ----*/
	
	onResetEvent : function()
	{	
		// use requestAnimFrame
		me.sys.useNativeAnimFrame = false;
		
		this.maincanvas.fill('#000000');	
		
		if(me.video.getScreenCanvas().height != 400) me.video.getScreenCanvas().height = 400;
		
		// play music
		//me.audio.playTrack("");
	},
	

	showLogo : function()
	{
		this.logoUnion.draw(this.maincanvas, 66,18, this.logoAlpha);
	},

	// make sure the screen is refreshed at every change 
	update : function() 
	{		
					
		// update logo alpha
		this.logoAlpha += this.logoIncr;
		if(this.logoAlpha >= 1.0) this.logoIncr = -0.05;
		else if(this.logoAlpha <= 0.05) this.logoIncr = +0.05;
		
		// rasters
		this.rasterCounter = 1 - this.rasterCounter;		
		
		// sprite		
		this.spritePos++;
		
		// if press ESC
		if (me.input.isKeyPressed('exit'))
		{
			// go back to menu
			me.state.change(me.state.PLAY);
		}
		else if(me.input.isKeyPressed('A')) this.d_showLogo = !this.d_showLogo;
		else if(me.input.isKeyPressed('Z')) this.d_showTopScroller = !this.d_showTopScroller;
		else if(me.input.isKeyPressed('E')) this.d_showBottomScroller = !this.d_showBottomScroller;
		else if(me.input.isKeyPressed('R')) this.d_showSprites = !this.d_showSprites;
		else if(me.input.isKeyPressed('T')) this.d_showStarfield = !this.d_showStarfield;
		
		return true;
	},

	/*---
	
		draw function
	  ---*/

	draw : function(context) 
	{
		
		
		this.maincanvas.fill('#000000');
		
		if(this.d_showTopScroller)
		{
			this.scrollcanvas1.clear();
			this.scrollcanvas2.clear();
			this.scrollrastercanvas.clear();
		}
		if(this.d_showBottomScroller)
		{
			this.starwarscanvas.clear();
			//this.a3dcanvas.fill('#100100');
			this.a3dcanvas.clear();
		}		
		
		if(this.d_showLogo)
		{
			// draw logo
			this.showLogo();
		}
		
		if(this.d_showStarfield)
		{		
			// draw 3D dot starfield
			this.starfield.draw();			
		}
		
		if(this.d_showTopScroller)
		{
			// draw 2 scrollers : outside and raster inside
			this.scrolltextIn.draw(0); 							// draw scrollerIn in scrollcanvas1
			this.scrolltextInfx.siny(0,60); 						// apply fx in scrollrastercanvas
			this.scrollrastercanvas.contex.globalCompositeOperation='source-atop';
			this.scrollrasters.draw(this.scrollrastercanvas, 0, 0);				// draw rasters in scrollrastercanvas

			this.scrollrastercanvas.contex.globalCompositeOperation='source-over';
			this.scrolltextOut.draw(0); 		 					// draw scrollerOut in scrollcanvas2	
			this.scrolltextOutfx.siny(0,60);						// apply same fx in in scrollrastercanvas

			// draw resulting buffer on scroll canvas		
			this.scrollrastercanvas.draw(this.maincanvas, 0, 0)				// draw all in maincanvas
		}
		
		if(this.d_showBottomScroller)
		{
			// scroller
			for(var i=12;i--;) 
			{
				//this.scrolltextSw[i].draw(((320-(16+7)*12)/2) + (i*(16+7)));
				this.scrolltextSw[i].draw(22 + (i*23));
			}
			// update rentertarget texture
			this.swtext.needsUpdate = true;

			if(this.USECODEF3D == false) this.renderer.render( this.scene, this.camera );
			else this.plane3d.draw();
			
			
			this.a3dcanvas.contex.globalCompositeOperation='source-atop';

			// apply 2 raster overlays to fake alpha layer
			this.swrasters[this.rasterCounter].draw(this.a3dcanvas, 0, 170-162);

			this.a3dcanvas.contex.globalCompositeOperation='source-over';	

			// draw 3d canvas
			this.a3dcanvas.draw(this.maincanvas,0,230);
		}
			
		if(this.d_showSprites)
		{
			// draw sprites
			for(var i=8;i--;)
			{
				var index = (this.spritePos - (i*5)) % this.spritePosX.length;
				this.sprites[i].draw(this.maincanvas, this.spritePosX[index], this.spritePosY[index]);
			}		
		}
	},
	
	/*---
	
		called by the engine when switching state
	  ---*/
	
	onDestroyEvent : function()
	{
		// stop the current track
		//me.audio.stopTrack();

	}


});
