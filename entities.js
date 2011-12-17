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