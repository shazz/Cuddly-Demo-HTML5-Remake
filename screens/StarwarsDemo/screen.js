/* -----

	Screen Objects
		
	------	*/

var StarwarsDemoScreen = me.ScreenObject.extend(
{
	generateGrid : function (vertices, faces, gridWidth, gridHeight, tesselLevelX, tesselLevelY, lightning)
	{
		var DEBUG = false;
		if(DEBUG)document.getElementById("trace").innerHTML += 'Compute vertices<BR>';
		for(y=0;y<tesselLevelY; y++)
		{	
			for(x=0;x<tesselLevelX+1; x++)
			{
				vertices[(y*(2*(tesselLevelX+1))) + (2*x)] 	= 	{x: (-gridWidth/2) + (gridWidth/tesselLevelX)*x, y: (gridHeight/2) - (gridHeight/tesselLevelY)*y, 		z: 0};	
				vertices[(y*(2*(tesselLevelX+1))) + ((2*x)+1)] 	= 	{x: (-gridWidth/2) + (gridWidth/tesselLevelX)*x, y: (gridHeight/2) - (gridHeight/tesselLevelY)*(y+1), 	z: 0};	
			}
		}

		if(DEBUG)
		{
			document.getElementById("trace").innerHTML += 'Show results<BR>';
			for(i=0;i<vertices.length;i++)
			{
				document.getElementById("trace").innerHTML +='[' + i + '] x: ' + vertices[i].x + '\ty: ' + vertices[i].y  +'\tz: ' + vertices[i].z + '<BR>';
			}
			document.getElementById("trace").innerHTML += 'Compute Faces<BR>';
		}



		for(y=0;y<tesselLevelY; y++)
		{	
			for(x=0;x<(tesselLevelX); x++)
			{
				var i = (x + (y*tesselLevelX));
				var j = (x + (y*(tesselLevelX+1)) );
				if(DEBUG)document.getElementById("trace").innerHTML += 'done : y:' + y + ' x: ' + x + ' i: ' + i + ' for elements ' + (2*i) + ' and ' + ((2*i)+1) + '<BR>';

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
		if(DEBUG)
		{
			document.getElementById("trace").innerHTML += 'Show results<BR>';

			for(i=0;i<faces.length;i++)
			{
				document.getElementById("trace").innerHTML +='[' + i + '] p1: ' + faces[i].p1 + '\tp2: ' + faces[i].p2  +'\tp3: ' + faces[i].p3 + '\tu1: ' + faces[i].u1 + '\tv1: ' + faces[i].v1 + '\tu2: ' + faces[i].u2 + '\tv2: ' + faces[i].v2 + '\tu3: ' + faces[i].u3 + '\tv3: ' + faces[i].v3 + '<BR>';
			}	

			document.getElementById("trace").innerHTML += 'Draw 3D<BR>';
		}

	},

	/*---
	
	init
		
	---*/
	init : function() 
	{
		// call the parent constructor
		this.parent(true);
		this.text = "TJA ALLIHOPA (THAT'S SWEDISH, JACKASS), HERE COMES THE CAREBEARS AGAIN, WITH ANOTHER INCREDIBLE DEMO-SCREEN, CALLED THE STARWARS-SCROLLER. YOU HAVE PROBABLY ALREADY FIGURED OUT WHY...       AS WE WRITE THIS, WE'RE OUT IN THE ARCHIPELAGOS OF STOCKHOLM, WHERE AN COOL HAS A SMALL (VERY SMALL) COTTAGE. EVERYBODY IS COMPLAINING ABOUT THEIR ACHING ARMS AND BACKS.  LET'S EXPLAIN WHAT CAUSED THESE UNPLEASENT PAINS      FIRST OF ALL, WE HAD TO TRAVEL BY TRAIN FOR ABOUT ONE HOUR. WE WENT OFF THE TRAIN IN TUMBA, WHERE WE WERE SUPPOSED TO BUY SOME FOOD AND COKE BEFORE WE GOT ON A BUS THAT WOULD DRIVE US CLOSER TO AN COOL'S COTTAGE.  BUT THERE WAS A BIG PROBLEM, WE ONLY HAD ABOUT THREE MINUTES BEFORE THE BUS LEFT, AND THE NEXT BUS WOULD COME IN ABOUT THREE AND A HALF HOUR, SO WE DECIDED TO GET ON THIS BUS AND GO TO ANOTHER SMALL STORE, NEAR THE COTTAGE.   OF COURSE THAT STORE WAS CLOSED WHEN WE GOT THERE.  OKAY, WE GOT OFF THE BUS AND NOW WE HAD A FIVE KILOMETRES WALK TO DO.   REALLY NICE, WITH BAGS FILLED WITH COMPUTERS, MONITORS, CLOTHES AND COKE.    THERE WERE EVEN MORE PROBLEMS TO COME, THE HEAVIEST BAG (WITH A WEIGHT OF ABOUT 50 KILOGRAMS) WAS DESTROYED, AND NOW TANIS AND A.D HAD TO CARRY IT ON THEIR HEADS (AND BACKS).   FINALLY WE REACHED THE COTTAGE, AFTER ABOUT ONE HOUR'S WALK.    OUR ARMS WERE ABOUT TWO METRES LONGER THAN THEY WERE THIS MORNING.  AFTER THIS VERY INTERESTING STORY, YOU CAN UNDERSTAND WHY OUR ARMS ARE ACHING!!        LET'S CHANGE SUBJECT...     TODAY WE GOT THE LOST BOYS DEMO, WHICH WAS QUITE GOOD, BUT NOT NEARLY AS GOOD AS THIS ONE (THIS IS ACTUALLY MORE THAN TEN TIMES BETTER).   WE WERE QUITE DISTURBED WHEN WE SAW THEIR TWIST-SCROLLER, WHICH LOOKED SIMILAR TO OUR DNA-SCROLLER, BUT OF COURSE OURS IS MUCH, MUCH BETTER, AND I THINK THAT WE WROTE IT BEFORE THEY WROTE THEIRS (WE WROTE IT THREE MONTHS AGO).   THEY SAID THAT THEIR DEMO WAS THE BEST \"SINGLE-CREW\"-DEMO EVER, WELL, OUR DEMO IS ALMOST A \"SINGLE-CREW\"-DEMO, AND IF YOU REMOVE THE GUEST APPEARANCES, WE STILL THINK THAT OUR DEMO IS AT LEAST FIVE TIMES BETTER THAN THEIRS.   THE LOST BOYS ALSO WROTE THAT THEIR SOURCE-CODE WAS ABOUT 230 KILOBYTES LONG, WE COUNTED HOW MUCH MEMORY OUR SOURCE-CODE TOOK AND IT WAS ABOUT 1400 KILOBYTES LONG!!!! AND IF YOU WOULD PRINT IT, IT WOULD TAKE 650 A4-PAGES.     NOW YOU PROBABLY THINK THAT WE ARE TALKING BIG.   WELL, WE KNOW WE'RE NOT EXACTLY MODEST, BUT WE CAN'T BE, COZ NOBODY ELSE IS. YOU KNOW, WE HAVE TO BE THE BEST IN EVERYTHING, INCLUDING TALKING BIG.     WE WON'T WRITE ANYTHING MORE, BECAUSE THE ONLY THING WE COULD WRITE NOW IS THE GREETINGS AND WE HAVE GREETINGS ENOUGH IN THE MAIN MENU...   BYE, BYE AND KEEP ON HACKING.......    PUSSELIMUSS!!!    TJA DAUU!!  GOOD NIGHT!! (IT'S TWO O'CLOCK, BUT THE NIGHT IS STILL YOUNG) OKAY, LET'S WRAAAAAAAAAAAAAAAAAAAAAAZ!!!!!!!!!!         ";
		this.swtext = new Array();
		this.swtext[0] = "            ";
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

		this.swtrspText = new Array();
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
		this.starwarscanvas = new canvas(640,800);
		this.a3dcanvas = new canvas(640,170);
		
		this.fonts = new image(me.loader.getImage('sw_fonts'));
		this.fonts.initTile(32,20,65);
		
		this.scrolltextSw = new Array();
		for(var i=0;i<12;i++) 
		{
			this.scrolltextSw[i] = new scrolltext_vertical();
			this.scrolltextSw[i].scrtxt = this.swtrspText[i];
			this.scrolltextSw[i].init(this.starwarscanvas,this.fonts,2, undefined, undefined, 16);
		}
		
		this.fontOut = new image(me.loader.getImage('sw_fontOut'));
		this.fontIn = new image(me.loader.getImage('sw_fontIn'));
		this.scrollrasters = new image(me.loader.getImage('sw_scrollrasters'));

		this.fontIn.initTile(66,52,32);
		this.fontOut.initTile(66,52,32);

		this.scrolltextIn = new scrolltext_horizontal();
		this.scrolltextIn.scrtxt=this.text;
		this.scrolltextIn .init(this.scrollcanvas1,this.fontIn,12);
		
		this.scrolltextOut = new scrolltext_horizontal();
		this.scrolltextOut.scrtxt=this.text;
		this.scrolltextOut.init(this.scrollcanvas2,this.fontOut,12);
		
		this.scrolltextfxparam=
		[
			{value: 0, amp: 60, inc:0.007, offset: -0.03},
	      	];				
		this.scrolltextInfx  = new FX(this.scrollcanvas1,this.scrollrastercanvas,this.scrolltextfxparam);;
		this.scrolltextOutfx = new FX(this.scrollcanvas2,this.scrollrastercanvas,this.scrolltextfxparam);;

		
		this.starfield=new starfield3D(this.maincanvas, 160, 3, 640,400, 320, 200,'#BBBBBB', 40,0,0, true, 1);		
		
		this.swrasters1 = new image(me.loader.getImage('sw_rasters1'));
		this.swrasters2 = new image(me.loader.getImage('sw_rasters2'));
		
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
		this.spritesPosX = new Array();
		this.spritesPosY = new Array();		
		for(var i=0;i<9;i++)
		{
			this.spritesPosX[i]=0.3*(i+1);
			this.spritesPosY[i]=0.3*(i+1);
		}		
		
		this.raster1showed = true;
		
		this.planeFaces = new Array();
		this.planeVerts = new Array();
				
		//this.scrollrasters.draw(this.starwarscanvas, 0 , 0);
		
		this.swtext = new THREE.Texture( this.starwarscanvas.canvas );
		//this.swtext = new THREE.Texture( this.scrollrasters.img );
    		this.swtext.needsUpdate = true;
 		 
   		this.generateGrid(this.planeVerts, this.planeFaces, 360, 400, 10, 20, new MeshBasicMaterial({ map: this.swtext, overdraw: true  }) );
   		
   		this.plane3d = new codef3D(this.a3dcanvas, 35, 90, 10, 500 );
		this.plane3d.faces(this.planeVerts,this.planeFaces, false, true );		
		this.plane3d.group.rotation.x = -0.7;
		this.plane3d.group.position.z = -65;
		this.plane3d.group.position.y = 20;
				
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
		if(this.logoAlpha >= 1.0) this.logoIncr = -0.01;
		else if(this.logoAlpha <= 0.01) this.logoIncr = +0.01;
		
		
		// sprites
		for(var i=9-1; i>=0; i--)
		{
			this.spritesPosX[i] += 0.04;
			this.spritesPosY[i] += 0.07;
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
		me.video.getScreenCanvas().height = 400;
		this.maincanvas.fill('#000000');
		this.scrollcanvas1.clear();
		this.scrollcanvas2.clear();
		this.scrollrastercanvas.clear();
		this.starwarscanvas.clear();
		this.a3dcanvas.clear();

		// draw logo
		this.showLogo();
		
		// draw 3D dot starfield
		this.starfield.draw();			
		
		// draw 2 scrollers : outside and raster inside
		this.scrolltextIn.draw( 0);
		this.scrolltextInfx.siny(0,60);
		this.scrollrastercanvas.contex.globalCompositeOperation='source-atop';
		this.scrollrasters.draw(this.scrollrastercanvas, 0, 0);
		
		this.scrollrastercanvas.contex.globalCompositeOperation='source-over';
		this.scrolltextOut.draw(0);	
		this.scrolltextOutfx.siny(0,60);
		
		// draw resulting buffer on scroll canvas
		this.scrollrastercanvas.draw(this.maincanvas, 0, 0)			
		
		// scroller
		for(var i=0;i<12;i++) 
		{
			this.scrolltextSw[i].draw(((640-(32+14)*12)/2) + (i*(32+14)));
		}
		
		//this.starwarscanvas.draw(this.maincanvas, 0, 280);	
		this.swtext.needsUpdate = true;
		
		this.plane3d.draw();
		this.a3dcanvas.contex.globalCompositeOperation='source-atop';
		
		if(this.raster1showed)
		{
			this.swrasters1.draw(this.a3dcanvas, 0, 10);
			this.raster1showed = false;
		}
		else
		{
			this.swrasters2.draw(this.a3dcanvas, 0, 10);
			this.raster1showed = true;
		}
		this.a3dcanvas.contex.globalCompositeOperation='source-over';	
		
		
		this.a3dcanvas.draw(this.maincanvas,0,230);
		
		// draw sprites
		for(var i=9-1; i>=0; i--)
		{
			this.sprites[i].draw(this.maincanvas, 320 + 280*Math.sin(this.spritesPosX[i]), 250 + 100*Math.cos(this.spritesPosY[i]));

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
