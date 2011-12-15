/* -----

	game object
		
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
			this.parent(x, y , settings);
			
			// set the walking & jumping speed
			this.setVelocity(5, 16);
			
			// add friction
			this.setFriction(0.5);
			
			// adjust the bounding box
			//this.updateColRect(1,14, -1,0);
						
			// set the display to follow our position on both axis
			me.game.viewport.follow(this.pos);
         
			// adjust the deadzone
			//me.game.viewport.setDeadzone( me.game.viewport.width/6,  me.game.viewport.height/4);
			
			// walking animation
			this.addAnimation ("walk",  [4,5,6,7]);
			
			// walking animation
			this.addAnimation ("jump",  [10]);
			
			// set default one
			this.setCurrentAnimation("walk");
			
			this.animationspeed = me.sys.fps / 40;
			
		},
	
		
		/* -----

			update the player pos
			
		------			*/
		update : function ()
		{
				
			if (me.input.isKeyPressed('left'))
			{
				this.doWalk(true);
			}
			else if (me.input.isKeyPressed('right'))
			{
				this.doWalk(false);
			}
			
			if (me.input.isKeyPressed('jump'))
			{	
				this.doJump();
			}
			
			// check & update player movement
			this.updateMovement();
			
					
			if (this.jumping || this.falling)
			{	
				if (!this.isCurrentAnimation("jump"))
				 this.setCurrentAnimation("jump");
			}
			else if (!this.isCurrentAnimation("walk")) {
				this.setCurrentAnimation("walk");
			}
			
			// update animation
			if (this.vel.x!=0 ||this.vel.y!=0)
			{
				// update objet animation
				this.parent(this);
				return true;
			}
			return false;
		}

	});