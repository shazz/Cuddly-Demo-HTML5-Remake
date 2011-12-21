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
			this.mycanvas = new canvas(me.video.getScreenCanvas());

			this.spriteImg = new image(me.loader.getImage("ball"));
			
			this.sprites = new Array();
			this.spritesPosX = new Array();
			this.spritesPosY = new Array();
			this.x_speed = 0.015;
			this.y_speed = 0.015;


			this.nbSprites = 10;
			for(var i=0;i<this.nbSprites;i++)
			{
				this.sprites[i] = this.spriteImg;
				this.spritesPosX[i]=0.3*(i+1);
				this.spritesPosY[i]=0.3*(i+1);
			}
			
			this.x_origin = 305;
			this.y_origin = 86;

			this.x_amplitude = 306;
			this.y_amplitude = 84;

			this.x_angFreq = 1;
			this.y_angFreq = 1.5;

			this.x_phase = 0;
			this.y_phase = 0;

			// END CODEF CODE
		},
		
		update : function() {
			return true;
		},
		
		
		draw: function(context) 
		{
			// CODEF CODE
			for (var counter = 0; counter < 100; counter++)
			{
				this.spritesPosX[counter] += this.x_speed;
				this.spritesPosY[counter] += this.y_speed;

				if(counter < this.nbSprites)
					this.sprites[counter].draw(this.mycanvas, 
											   this.x_origin + this.x_amplitude*Math.sin(this.x_phase + this.spritesPosX[counter]*this.x_angFreq), 
											   this.y_origin + this.y_amplitude*Math.cos(this.y_phase + this.spritesPosY[counter]*this.y_angFreq) );
			}
			// END CODEF CODE
		}
	  
	});


