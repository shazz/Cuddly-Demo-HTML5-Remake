/* -----

	Screen Objects
		
	------	*/

var DemoIntro = me.ScreenObject.extend({
	/*---
	
		constructor
		
		---*/
	init : function() {
		// call the parent constructor
		this.parent(true);
		
		this.logoUnion = new image(me.loader.getImage('logoUnion'));
		this.logoCarebears = new image(me.loader.getImage('logoCarebears'));
		this.logoCuddly = new image(me.loader.getImage('logoCuddly'));

		// init canvas and offscreen canvas
		this.maincanvas=new canvas(me.video.getScreenCanvas()); // reuse melonJS main canvas
		this.logoUnionDistcanvas=new canvas(256,122);
		this.logoCarebearsDistcanvas=new canvas(640,80);
		this.logoCarebearsDistcanvas2=new canvas(640,140);
		
		this.logoUnionfx = null;
		this.logoUnionfxparam=[
				{value: 0, amp: 10, inc:0.2, offset: -0.5},
				  ];

		this.logoCarebearsfx = null;
		this.logoCarebearsfxparam=[
				{value: 0, amp: 20, inc:0.01, offset: 0.105},
				];
		this.logoCarebearsfx2 = null;
		this.logoCarebearsfxparam2=[
				{value: 0, amp: 8, inc:0.08, offset: 0.08},
				];
		
		this.frameCounter = 0;

		this.currentAnim = 0;
		this.animSpeed = 0.6;
		this.anims=[
				{img: new image(me.loader.getImage('star1')), dir: 1, nb: 7,  val: 0, x: 464, y: 306, rev:true},
				{img: new image(me.loader.getImage('star2')), dir: 1, nb: 12, val: 0, x: 592, y: 372, rev:false},
				{img: new image(me.loader.getImage('star3')), dir: 1, nb: 7,  val: 0, x: 433, y: 342, rev:true},
				{img: new image(me.loader.getImage('star2')), dir: 1, nb: 12, val: 0, x: 528, y: 342, rev:false},
				{img: new image(me.loader.getImage('star3')), dir: 1, nb: 7,  val: 0, x: 560, y: 350, rev:true},
				{img: new image(me.loader.getImage('star1')), dir: 1, nb: 7,  val: 0, x: 40,  y: 320, rev:true},
				{img: new image(me.loader.getImage('star2')), dir: 1, nb: 12, val: 0, x: 368, y: 340, rev:false},
				{img: new image(me.loader.getImage('star3')), dir: 1, nb: 7,  val: 0, x: 244, y: 344, rev:true},
				{img: new image(me.loader.getImage('star1')), dir: 1, nb: 7,  val: 0, x: 490, y: 340, rev:true},
				{img: new image(me.loader.getImage('star3')), dir: 1, nb: 7,  val: 0, x: 274, y: 344, rev:true},
				{img: new image(me.loader.getImage('star2')), dir: 1, nb: 12, val: 0, x: 336, y: 314, rev:false},
				{img: new image(me.loader.getImage('star2')), dir: 1, nb: 12, val: 0, x: 176, y: 310, rev:false},
				{img: new image(me.loader.getImage('star3')), dir: 1, nb: 7,  val: 0, x: 80,  y: 332, rev:true},
				{img: new image(me.loader.getImage('star1')), dir: 1, nb: 7,  val: 0, x: 304, y: 310, rev:true},
				{img: new image(me.loader.getImage('star3')), dir: 1, nb: 7,  val: 0, x: 208, y: 350, rev:true},
				{img: new image(me.loader.getImage('star1')), dir: 1, nb: 7,  val: 0, x: 114, y: 326, rev:true}
		];

		
	},
	
	/* ---
		onReset (called by the engine) function
	   ----*/
	
	onResetEvent : function()
	{
		
		// use requestAnimFrame
		me.sys.useNativeAnimFrame = false;
		
		this.maincanvas.fill('#000000');
		// draw the logo in the offscreen canvas
		this.logoUnion.draw(this.logoUnionDistcanvas,0,0);
		this.logoCarebears.draw(this.logoCarebearsDistcanvas2,0,0);

		// apply an FX on the offscreen canvas
		this.logoUnionfx=new FX(this.logoUnionDistcanvas,this.maincanvas,this.logoUnionfxparam);
		this.logoCarebearsfx=new FX(this.logoCarebearsDistcanvas,this.maincanvas,this.logoCarebearsfxparam);
		this.logoCarebearsfx2=new FX(this.logoCarebearsDistcanvas2,this.logoCarebearsDistcanvas,this.logoCarebearsfxparam2);

		// stars
		for(i=0;i<this.anims.length;i++)
		{
			this.anims[i].img.setmidhandle();
			this.anims[i].img.initTile(30,30);
		}
		
		// play menu song
		me.audio.playTrack("cuddly");
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
		this.logoCarebearsDistcanvas.clear();

		// draw non moving logo
		this.logoCuddly.draw(this.maincanvas,0,0);

		// Display effects on the main canvas
		this.logoUnionfx.sinx(192,146);

		this.logoCarebearsfx2.sinx(0,0);
		this.logoCarebearsfx.siny(10,30);

		// stars
		this.anims[this.currentAnim].img.drawTile(this.maincanvas,this.anims[this.currentAnim].val, this.anims[this.currentAnim].x,this.anims[this.currentAnim].y, 1.0, 1.0, 1.0, 1.0);

		if(this.anims[this.currentAnim].val>=this.anims[this.currentAnim].nb)
		{
			if(this.anims[this.currentAnim].rev == true) this.anims[this.currentAnim].dir = -1;
			else
			{
				this.anims[this.currentAnim].dir = 1;
				this.anims[this.currentAnim].val = 0;
				this.currentAnim = (this.currentAnim+1) % this.anims.length;
			}
		}
		this.anims[this.currentAnim].val += Math.round((this.anims[this.currentAnim].dir * this.animSpeed));
		if(this.anims[this.currentAnim].val<=0 && this.anims[this.currentAnim].dir == -1)
		{
			this.anims[this.currentAnim].dir = 1;
			this.anims[this.currentAnim].val = 0;
			this.currentAnim = (this.currentAnim+1) % this.anims.length;
			
		}

		if((this.frameCounter % 200) == 0)
		{
			this.logoUnionfxparam[0].amp = 250;
			this.logoUnionfxparam[0].inc =0.03,
			this.logoUnionfxparam[0].offset = -0.05;
		}
		if((this.frameCounter % 400) == 0)
		{
			this.logoUnionfxparam[0].amp = 10;
			this.logoUnionfxparam[0].inc =0.2,
			this.logoUnionfxparam[0].offset = -0.5;
		}
		this.frameCounter++;
			
	},
	
	/*---
	
		called by the engine when switching state
	  ---*/
	
	onDestroyEvent : function()
	{
		// stop the current track
		me.audio.stopTrack();
	}


});
