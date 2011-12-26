/* -----

	Object Entities
		
	------			*/

	/************************************************************************************/
	/*																					*/
	/*			a player entity															*/
	/*																					*/
	/************************************************************************************/
	var MainEntity = me.ObjectEntity.extend(
	{	

		init:function (x, y, settings)
		{
			// define this here, since not defined in tiled
			settings.image = "sprites";
			settings.spritewidth = 64;
			settings.spriteheight = 64;
			
			// call the constructor
			this.parent(x, y, settings);
			
			// set h/v velocity
			this.setVelocity(7, 2);
			this.setMaxVelocity(7, 5);
			
			// add friction
			this.setFriction(0.5);
			
			if (jsApp.entityPos != null) {
				this.pos.x = jsApp.entityPos.x;
				this.pos.y = jsApp.entityPos.y;
			}

			// set the display to follow our position on both axis
			me.game.viewport.follow(this.pos);
			
			// walking animation
			this.addAnimation ("walk",  [4,5,6,7]);
			
			// flying animation
			this.addAnimation ("fly",  [8,9]);
			
			// set default one
			this.setCurrentAnimation("walk");
			
			// adjust animation timing
			this.animationspeed = me.sys.fps / 40;
			
			
			
		},
	
		
		/* -----

			update the player pos
			
		------			*/
		update : function ()
		{
				
			if (me.input.isKeyPressed('left'))
			{
				this.vel.x -= this.accel.x * me.timer.tick;
				// flip the sprite
				this.flipX(true);
			}
			else if (me.input.isKeyPressed('right'))
			{
				this.vel.x += this.accel.x * me.timer.tick;
				// unflip the sprite
				this.flipX(false);
			}
			
			if (me.input.isKeyPressed('fly'))
			{	
				this.vel.y -= this.accel.y * me.timer.tick;
				
				// make sure we stay in the map limit
				if (this.pos.y + this.vel.y < 0) 
				{
					// there is no proper bounciness support yet 
					// in melonJS, so let's just do this for now
					this.vel.y = this.maxVel.y * me.timer.tick;
				}
			
			}
			
			
			// check & update player movement
			this.updateMovement();
			
			// check for collision with sthg
			me.game.collide(this);
			// actually we can also check here when we collide with 
			// doors, by checking the object return by the function.

			
			
			// if flying
			if (me.input.keyStatus('fly'))
			{	
				// change animatiom if necessary
				if (!this.isCurrentAnimation("fly"))
				{
				 	this.setCurrentAnimation("fly");
				}
			}
			//falling / walking
			else if (!this.setCurrentAnimation("walk"))
			{
				this.setCurrentAnimation("walk");	
			}
			
			
			// check if entity is moving
			if (this.vel.x!=0||this.vel.y!=0)
			{
				// update objet animation is necessary
				if (this.isCurrentAnimation("walk") && this.vel.x==0)
				{
					// don't update animation
					return true
				}
				this.parent(this);
				return true;
			}
			return false;
		}

	});

	/*****************************************
	 *										 *
	 *			a door entity				 *
	 *										 *
	 *****************************************/
	var DoorEntity = me.InvisibleEntity.extend(
	{	
		init:function (x, y, settings)
		{
			// call the constructor
			this.parent(x, y, settings);
			
			// settings.demo_name was defined in Tiled
			this.demo_name = settings.demo_name;
		},	

		// collision notification, something (obj) touched the door !
		onCollision : function (res, obj)
		{
			if (me.input.isKeyPressed('enter'))
			{
				// save the player last pos
				
				jsApp.entityPos = obj.pos.clone();
				//console.log("knock knock " + this.demo_name + "!");
				me.state.change(jsApp.ScreenID.INTRO);
			}
		},
		
	});
	
	/*****************************************
	 *										 *
	 *			a door entity				 *
	 *										 *
	 *****************************************/
	var BallObject = me.InvisibleEntity.extend({
    
		init: function(x, y) 
		{
			// call the parent constructor
			this.parent(x, y, {width:me.game.currentLevel.realwidth, height:me.game.currentLevel.realheight});
			
			// CODEF CODE
			
			// reuse melonJS main canvas
			this.maincanvas = new canvas(me.video.getScreenCanvas());
			
			this.sprites = new Array();
			this.spritesPosX = new Array();
			this.spritesPosY = new Array();
			this.x_speed = 0.05;
			this.y_speed = 0.05;


			this.nbSprites = 12;
			for(var i=0;i<3;i++)
			{
				this.spritesPosX[i]=0.3*(i+1);
				this.spritesPosY[i]=0.3*(i+1);
			}
			for(var i=3;i<this.nbSprites;i++)
			{
				this.spritesPosX[i]=0.3*(i+2);
				this.spritesPosY[i]=0.3*(i+2);
			}			
			this.sprites[0] = new image(me.loader.getImage("sprite_t"));
			this.sprites[1] = new image(me.loader.getImage("sprite_h"));
			this.sprites[2] = new image(me.loader.getImage("sprite_e2"));
			this.sprites[3] = new image(me.loader.getImage("sprite_c"));
			this.sprites[4] = new image(me.loader.getImage("sprite_a"));
			this.sprites[5] = new image(me.loader.getImage("sprite_r"));
			this.sprites[6] = new image(me.loader.getImage("sprite_e"));
			this.sprites[7] = new image(me.loader.getImage("sprite_b"));
			this.sprites[8] = new image(me.loader.getImage("sprite_e"));
			this.sprites[9] = new image(me.loader.getImage("sprite_a"));
			this.sprites[10] = new image(me.loader.getImage("sprite_r"));
			this.sprites[11] = new image(me.loader.getImage("sprite_s"));
			
			
			this.x_origin = 305;
			this.y_origin = 110;

			this.x_amplitude = 306;
			this.y_amplitude = 74;

			this.x_angFreq = 1;
			this.y_angFreq = 1.5;

			this.x_phase = 0;
			this.y_phase = 0;
			
			this.font = new image(me.loader.getImage("fonts"));
			this.font.initTile(82,80,32);
			this.scrolltext = new scrolltext_horizontal();
			this.scrolltext.scrtxt="              BOY, DO YOU THINK YOU CAN BEAT DIS?  GO AHEAD, MAKE OUR DAY!        THE CAREBEARS OF THE UNION VERY PROUDLY PRESENT   -THE CUDDLY DEMOS- !    AFTER SIX MONTHS OF HARD WORK, WE FINALLY FINISHED THIS MEGADEMO, ON THE 2ND OF JULY.    BEFORE WE SAY ANYTHING ELSE, WE MUST EXPLAIN WHO THE CAREBEARS, OR -TCB- ARE.  WE ARE A SWEDISH THREE-MEMBER-CREW AND THE THREE MEMBERS ARE NICK, JAS & AN COOL.       LET'S TELL YOU HOW TO OPERATE THIS MAIN MENU.  YOU CONTROL THE LITTLE CUSTODIAN-GUY WITH EITHER THE ARROW KEYS OR THE JOYSTICK.  PRESS FUNCTIONKEY NUMBER TWO IF YOU DON'T WANT HIM TO ENTER DEMO-MODE, WHERE HE WILL RUN BETWEEN ALL THE DOORS AUTOMATICALLY -  PERFECT FOR THE SHOP-WINDOW OF YOUR LOCAL ST-DEALER.   PRESS F1 TO TURN IT ON AGAIN...             HERE ARE THE CREDITS FOR THE BIGGEST DEMO EVER.....      ALL CODING IN ALL SCREENS WAS DONE BY NICK, JAS & AN COOL OF THE MEGAMIGHTY CAREBEARS.    GRAPHIXX BY   TANIS, AD, NICK, AN COOL, JAS AND OF COURSE -ES- OF THE EXCEPTIONS (& THE CALVIN & HOBBES-PICCY WAS DONE BY MAD BUTHER OF 2 LIFE CREW).    SOME GRAPHIXX WAS ALSO RIPPED FROM THE AMIGACREWS   TRISTAR & THE KNIGHTHAWKS.    LOTSA MUZEXX BY -MAD MAX- OF THE EXCEPTIONS.  MUZEXX IN DIGI-DEMO COMPOSED BY -KARSVALL-.  MUZEXX IN SPREADPOINT WAS  DONE BY THE CAREBEARS.    WE ALSO HAVE A GUEST APPERANCE, A SCREEN CODED BY THE EXCEPTIONS, CALLED KNUCKLEBUSTER.                           THE PURPOSE OF CODING THIS DEMO IS MAINLY TO TRY TO GET US JOBS AS GAME-PROGRAMMERS.  WE HAVE THE FASTEST SCROLLROUTS (STEVE BAK CAN FLUSH HIMSELF DOWN IN A TOILET), THE BEST SPRITEROUTS, THE QUICKEST DIGI-SYNTH-ROUTS AND LOTSA EXPERIENCE IN CODING 68000 MACHINE CODE.  WE HAVE ALSO CODED GAMES BEFORE, BUT NOT ON THE ST, SO IF YOU'RE THE BOSS OF A SOFTWAREHOUSE, PLEASE CONTACT US!!!!!         THE SECOND REASON IS THAT WE WANT DONATIONS (HEHE).  WE RECENTLY GOT THE MONEY EARNED FOR THE UNION DEMO.  IT WAS BARELY ENOUGH FOR 2 PIZZAS - WE RECEIVED 20 DM, WHICH IS ABOUT 6 POUNDS OR 70 SEK.   THAT WAS RIDICULOUS COMPARED TO HOW MANY HOURS WE HAD WORKED, SO PLEASE SEND US SOME MONEY IF YOU THINK WE DESERVE IT (WE DO, DON'T WE?).   FINALLY, WE WOULD ALSO LIKE TO GET IN TOUCH WITH ALL THE GREAT CREWS OUT THERE.  SEND US ALL NEW DEMOS AND INTROS.  IF YOU WANT TO WRITE TO US, FOR THE JUST MENTIONED REASONS, OR FOR SOME OTHER REASON, HERE ARE SOME ADDRESSES:               T H E   C A R E B E A R S ,    F A G E L V .   6 B ,       S - 1 7 5 6 4   J A R F A L L A ,      S W E D E N                       OR      T H E   C A R E B E A R S ,    S J O B J O R N S V .   1 0    3 T R ,    S - 1 1 7 4 7   S T O C K H O L M ,      S W E D E N                    OR      T H E   C A R E B E A R S ,    G R A N S V .   2 1  ,    S - 1 7 5 4 6   J A R F A L L A ,    S W E D E N                 WE HAVE ANSWERED ALL LETTERS SO FAR, SO IF YOU DON'T GET A RESPONSE, TRY THE OTHER ADDRESSES.....                                NOW FOR THE GREETINGS.  YOU MUST EXCUSE US, BUT NOT ONLY ARE WE OUT OF TIME IN ALMOST ALL SCREENS, NEITHER ARE WE ONLY OUT OF MEMORY IN ALL SCREENS, WE ARE ALSO OUT OF MEMORY ON THE DISK.  THERE ARE ONLY ABOUT 10 SECTORS LEFT ON THE DISK WITHOUT THIS SCROLLTEXT, SO IT WILL HAVE TO BE QUITE SHORT, EVEN THOUGH WE WOULD LIKE TO MAKE LONG COMMENTS ON ALMOST EVERYBODY WE GREET.   MEGAGREETINGS GO TO:   ALL THE OTHER MEMBERS OF THE UNION - THE EXCEPTIONS (MANY MANY THANKS TO -MAD MAX- FOR ALL THE MUZEXX, MANY THANKS TO -ES- FOR GRAPHIXX AND ALSO MANY THANKS TO 6719 FOR INTERRUPT LOADER, AMONG OTHER THINGS.  ALSO A HI TO BOTH -ME- AND -DARYL-(NICE SCROLLER)),  THE REPLICANTS (WE WOULD HAVE LOVED TO INCLUDE YOUR SCREEN, BUT OBVIOUSLY NONE OF OUR LETTERS GOT TO YOU IN TIME. ALSO MANY THANKS FOR NEW SOFTWARE. FINALLY: YOUR MOUNTAIN-INTRO IS REALLY GREAT!), TNT CREW (PLEASE WRITE US!), DELTA FORCE (PLEASE WRITE US!), LEVEL 16 (PLEASE WRITE US!), SOFTRUNNERGROUP INT. (HI THERE!).  ALSO A HI TO XXX-INTERNATIONAL AND HOWDY!  HOW ARE YOU?         NORMAL GREETINGS TO:    OMEGA (WE STILL THINK YOU ARE THE SECOND BEST SWEDISH CREW, EVEN THOUGH YOUR DEMO WON'T BE WHAT IT WAS SUPPOSED TO BE), FLEXIBLE FRONT (GOOD LUCK WITH YOUR GAME!), SYNC (WE'RE REALLY LOOKING FORWARD TO GETTING YOUR DEMO), GHOST (HI THERE), VECTOR (THE MOVEP-BYTE-BENDER WAS PRETTY SMART), ZAE (THANKS FOR THE COKE% AND ALL THE GAMES. HERE'S A SENTENCE:  JE TROUVER MON DIERE DANS MON FROMAGE), STARLIGHT (ESPECIALLY WHACK), FASHION (SEE YA', GUYS! AND THANKS FOR THE DONATION, YOU GAVE US MORE THAN WE GOT FOR THE UNION DEMO),  NYARLATHOTEP'S ADEPTS (HOPE I GOT YOUR NAME RIGHT), GROWTWIG (THANKS FOR ALL THE MUZEXX YOU'VE SENT US. SORRY WE COULDN'T USE IT. ALSO THANKS FOR BEING A GREAT SOFTWARE-SOURCE), RED DEVIL, LORD MADNESS, BEAR OF BLOCKBUSTERS, COCA COLA COMPANY (GREAT STUFF), ATARI CORP. (GREAT MACHINE!), M.A.R.K.U.S. (SORRY FOR NOT HAVING SENT YOU ANYTHING FOR SUCH A LONG TIME), THE KREATORS (ESPECIALLY CHUD!), ALIEN CRACKING FORMATION (ESPECIALLY DESIRE! THANKS FOR THE GAMES), HACKATARIMAN (WHAT DO YOU THINK ABOUT THIS DEMO?), BIRDY (SORRY, BUT WE DON'T HAVE VERY NEW GAMES), THE LOST BOYS (GREAT DEMO. IT WAS (!) THE BEST), ANTI AMIGA CREW (YOUR SCREEN WAS 60HZ!), NO CREW (GREAT PARTY! BUT YOUR SCROLLTEXT DIDN'T LOOP), 2 LIFE CREW (HI THERE, MEGACRIBB & MAD BUTCHER! SEEN ANY TOILETS LATELY?), LEGEND (EVEN THOUGH THOU ART NO LONGER), CRUSH CREW (FINALLY, YOU HAVE BEEN GREETED), CORPSE (THANKS FOR GETTING US A PLACE TO HAVE OUR COPY-PARTY IN!), LAPERLA PIZZERIA (BEST PIZZAS IN TOWN), EQUINOX (HI THERE), HCC (REMEMBER US? WE SENT YOU THE JUNK DEMO!), OVERLANDERS (HI THERE), GIGABYTE CREW (WE'RE SORRY THAT WE COULDN'T INCLUDE YOUR COOPERATION WITH TEX, WE'RE EXTREMELY OUT OF SECTORS), LINKAN (YOU'RE LOUSY AT TABLE TENNIS!), KARSVALL (THANKS FOR THE MUZEXX IN THE DIGIDEMO), IQ 2 CREW (SORRY FOR BEING RUDE IN THE JUNK DEMO) AND SPREADPOINT (WE THINK YOU'RE THE BEST AMIGA CREW).     FINALLY, WE'D LIKE TO GREET THE TWO GRAPHIXXMEN -  TANIS AND AD. HI THERE!!!!!                                   THE EXCEPTIONS TOLD YOU WHAT AND HOW MUCH OF EVERYTHING THEY HAD USED FOR THEIR BIG DEMO.   LET'S DO THE SAME.   FIRST OF ALL, THE PROGRAMMES:     K-SEKA (GREAT ASSEMBLER AND DEBUGGER, BUT LOUSY EDITOR),   DEVPAC ST 2 (GREAT EDITOR, GREAT \"INCBIN\", BUT FULL OF IRRITATING \"BUGS\"),   NEOCHROME (THE BEST), DEGAS ELITE (AN COOL USES IT, EVEN THOUGH IT'S TRASH), GFA-BASIC (DON'T WORRY, NONE OF THE CODE ON THE DISK IS BASIC),   TEMPUS (THE BEST EDITOR!),   FASTCOPY (FAST) AND SPACE QUEST III (WHEN WE DON'T FEEL LIKE CODING).       LITTERATURE:       DOCUMENTATION FOR SEKA AND DEVPAC,     ST INTERNALS,      THE CONSICE ATARI ST 68000 PROGRAMMERS REFERENCE GUIDE,        TJOFLOJT - FLUTEPLAYING FOR ABSOLUTE BEGINNERS (FOR THE SPREADPOINT DEMO)      AND 68000 MACHINE CODE PROGRAMMING BY DAVID BARROW (FOR CLOCK-CYCLE-COUNTING, EVEN THOUGH THERE ARE SOME CYCLE-ERRORS IN IT).        HARDWARE:     7 ATARI 1040ST,    1 AMIGA 500,    1 AMIGA 2000,    2 CASIO FX-6000P (FOR HEX CONVERSION (YOU DON'T NEED THEM WHEN YOU'RE IN K-SEKA))     AND ONE PING PONG TABLE...               FOOD:          COKE%:      1 LITRE A DAY PLUS 4 LITRES A WEEKEND, PER MEMBER PLUS AD AND TANIS, FOR 6 MONTHS MAKES:               1134 LITRES OF COKE%.             ABOUT 3 PIZZAS A WEEK TIMES THREE (THE NUMBER OF MEMBERS) FOR 6 MONTHS: 227 PIZZAS.               PLUS LOTSA HAMBURGERS AND CHICKEN MCNUGGETS AT MCDONALDS              .         FINALLY, WE WILL ARRANGE A COPY PARTY IN STOCKHOLM ON THE 4TH OF AUGUST.  PLEASE WRITE US IF YOU'RE INTERRESTED (WE WILL MAKE A COPY-PARTY DEMO, AS USUAL AND EVERYBODY MAY PARTICIPATE)..........          BYE, BYE FOR THIS TIME AND LET'S WRAP.......               SHORT WASN'T IT?       AND FAST...               ";
			this.scrolltext.init(this.maincanvas,this.font,12);

			// END CODEF CODE
		},
		
		update : function() 
		{
			return true;
		},
		
		
		draw: function(context) 
		{
			// CODEF CODE
			for (var counter = 0; counter < this.nbSprites; counter++)
			{
				this.spritesPosX[counter] += this.x_speed;
				this.spritesPosY[counter] += this.y_speed;

				this.sprites[counter].draw(
					this.maincanvas, 
					this.x_origin + this.x_amplitude*Math.sin(this.x_phase + this.spritesPosX[counter]*this.x_angFreq), 
					this.y_origin + this.y_amplitude*Math.cos(this.y_phase + this.spritesPosY[counter]*this.y_angFreq) );
			}
			
			
			
			this.maincanvas.contex.fillStyle = "#000000";
			this.maincanvas.contex.fillRect (0, 0, 640, 30);  
			this.maincanvas.contex.fillRect (0, 318, 640, 390+56);  
			this.scrolltext.draw(356);
			
			// END CODEF CODE
		}
	  
	});


