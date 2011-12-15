/*------------------------------------------------------------------------------
Copyright (c) 2011 Shazz / TRSi

This File is part of the CODEF project. (http://code.google.com/p/codef/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
------------------------------------------------------------------------------*/

////////////////////////////////////////////////////////////////////////////////
// Effect2 Variables
////////////////////////////////////////////////////////////////////////////////
var ef2_displayCanvas;

var text2 = "YO, THE MEGAMIGHTY CAREBEARS ARE PROUD TO PRESENT THE 3D-DOC DEMO!   IF YOU'VE ALREADY FORGOTTEN WHO CODED WHAT, WE'D BETTER TELL YOU AGAIN.  ALL CODING BY THE CAREBEARS. MUZEXX BY -MAD, THE SLEEPER, MAX- (OF THE EXCEPTIONS, SCHMUCK!).  FONT BY THE NIGHTHAWKS (WHACK OF STARLIGHT SENT ME A INTRO-COLLECTION BY THE BLACK CATS YESTERDAY.  THE AMIGA-FONT-RIPPING-SYNDROME SEEMS TO HAVE HIT THE ST TOO. MORE THAN HALF OF THOSE INTROS USED THIS FONT).  MOUNTAINS BY A.D.   I WRITE THIS TEXT THE DAY AFTER THE -WHATTAHECK- DEMO WAS RELEASED.  EVERYBODY IS COMPLAINING, TELLING US THAT IF WE DON'T RELEASE THIS DEMO SOON, THEY WILL START FUCKING GREET US.    I ACTUALLY HAVE PROCESSOR TIME LEFT IN THIS DEMO, BUT I DON'T HAVE NO MEMORY LEFT. IT'S AGAINST OUR PRINCIPLES NOT TO USE EVERY DARNED ONE OF THOSE 160256 VBL-CYCLES.  BUT IF THIS DEMO IS GOING TO BE RELEASED THIS YEAR, WE SIMPLY HAVE TO BE SATISFIED WITH ALMOST PERFECT SCREENS...    AS WE TOLD YOU BEFORE, WE'RE OUT OF MEMORY, AND WHEN I SAY OUT OF MEMORY, I MEAN SO FUCKING OUT OF MEMORY THAT I WILL HAVE TO STOP WRITING THIS SCROLLTEXT, OR IT WON'T RUN ON A 520ST... ";

var fontOut = new image('fonts6.png');
var fontIn = new image('fonts6_rasters.png');
var mountains = new image('background.png');
var rastersFonts = new image('rastersFonts.png');

var rasterFloorGreen = new image('rastersGreen.png');
var rasterFloorPurple = new image('rastersPurple.png');

var mergecanvas;
var rasterbarscanvas;

var scrolltextIn;
var scrolltextOut;

var sprites = new Array();
sprites[0]=new image('ball.png');

var spriteShadows = new Array();
spriteShadows[0] = new image('shadowBall.png');

var spritesPos = new Array();
spritesPos[0]=0.3*1;
spritesPos[1]=0.3*2;
spritesPos[2]=0.3*3;
spritesPos[3]=0.3*4;

var checkerboard_floor3d;
var checkerboard_floorfaces= new Array();
var checkerboard_floorverts = new Array();
var checkerboard_3Dcanvas;
var checkerboard_floor3Dcanvas;
var checkerboard_angle = 0;

var scrollFSM, vectBallFSM;

var myfxIn, myfxOut;
var myfxparam=[	{value: 0, amp: 25, inc:-0.06, offset: -0.06} ];

var scrollPos = 0;

var sprite1ObjVert = new Array();
sprite1ObjVert=[{x: -0, y:-60, z:-300, img:0}];
var sprite2ObjVert = new Array();
sprite2ObjVert=[{x: 0, y:-60, z:-300, img:0}];
var sprite3ObjVert = new Array();
sprite3ObjVert=[{x: 0, y:-60, z:-300, img:0}];
var sprite4ObjVert = new Array();
sprite4ObjVert=[{x: 0, y:-60, z:-300, img:0}];

var factor = 0.0;
var currentInnerFrame = 0;
////////////////////////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////////////////////////

const NORMAL = 0;
const BOUNCE = 1;
const SYNC 	 = 2;
const RIGHT = 0;
const LEFT = 1;
const SLOWDISTORT = 0;
const FASTDISTORT = 1;

const STEP0 = 400;
const STEP1 = 400+340;
const STEP2 = 400+340+340;
const STEP3 = 400+340+340+340;
const STEP4 = 400+340+340+340+340;
const STEP5 = 400+340+340+340+340+340;
const STEP6 = 400+340+340+340+340+340+340;

////////////////////////////////////////////////////////////////////////////////
// Internal functions
////////////////////////////////////////////////////////////////////////////////

function setTrajectory(angSpeedX, angSpeedY, angSpeedZ, coefX, coefY, coefZ, interVectorBall, tInc, trajType, trajDirection)
{
	spritesPos[1]=spritesPos[0] - (interVectorBall*tInc);
	spritesPos[2]=spritesPos[1] - (interVectorBall*tInc);
	spritesPos[3]=spritesPos[2] - (interVectorBall*tInc);

	var vb, sh;
	for (counter = 0; counter < 4; counter++)
	{
		if(trajDirection == RIGHT) spritesPos[counter] += tInc;
		else spritesPos[counter] -= tInc;

		// draw balls
		vb = vectorBalls3d.group.getChildByName('v' + counter);

		vb.position.x = coefX * Math.cos(angSpeedX*spritesPos[counter]);
		vb.position.z = -200 + coefZ * Math.sin(angSpeedZ*spritesPos[counter]);

		if(trajType == NORMAL) vb.position.y = 30 + coefY * Math.cos(angSpeedY*spritesPos[counter]);
		else if(trajType == SYNC) vb.position.y = 30 + coefY * Math.cos(angSpeedY*spritesPos[0]);
		else if(trajType == BOUNCE) vb.position.y = -70 + coefY * Math.abs(Math.cos(angSpeedY*spritesPos[counter]));

		// draw shadow
		sh = vectorBalls3d.group.getChildByName('s' + counter);
		sh.position.x = vb.position.x ;
		sh.position.z = vb.position.z;
	}
}

function lerp(a, b, f)
{
	return a + f * (b - a);
}

function changeScrollTextDistort(nextType)
{
	if(nextType == SLOWDISTORT)
	{
		if(scrollFSM.current_state == "slowDistort")
		{
			factor = 0.0;
			myfxparam[0].amp = 25;
			myfxparam[0].inc = -0.06;
			myfxparam[0].offset = -0.06;
		}
		else if(scrollFSM.current_state == "changingToSlow")
		{
			factor += 0.01;
			if(factor > 1.0)
				scrollFSM.process("isSlow");
			else
			{
				myfxparam[0].amp = lerp(6, 25, factor);
				myfxparam[0].inc = lerp(0.35, -0.06, factor);
				myfxparam[0].offset = lerp(0.3, -0.06, factor);
			}
		}
		else if(scrollFSM.current_state == "fastDistort")
		{
			scrollFSM.process("dec");
		}
	}
	else if(nextType == FASTDISTORT)
	{
		if(scrollFSM.current_state == "fastDistort")
		{
			factor = 0.0;
			myfxparam[0].amp = 6;
			myfxparam[0].inc = 0.35;
			myfxparam[0].offset = 0.3;
		}
		else if(scrollFSM.current_state == "changingToFast")
		{
			factor += 0.01;
			if(factor > 1.0)
				scrollFSM.process("isFast");
			else
			{
				myfxparam[0].amp = lerp(25, 6, factor);
				myfxparam[0].inc = lerp(-0.06, 0.35, factor);
				myfxparam[0].offset = lerp(-0.06, 0.3, factor);
			}
		}
		else if(scrollFSM.current_state == "slowDistort")
		{
			scrollFSM.process("acc");
		}

	}
}


////////////////////////////////////////////////////////////////////////////////
// Effect2 Init Function
////////////////////////////////////////////////////////////////////////////////
function effect2_init()
{
	ef2_displayCanvas = sequencer_getDisplayCanvas();
	
	mergecanvas  = new canvas(700,150);

	// scrolltext
	fontOut.initTile(66,52,32);
	scrolltextOut = new scrolltext_horizontal();
	scrolltextOut.scrtxt=text2;
	scrolltextOut.init(mergecanvas,fontOut, 7);

	fontIn.initTile(66,52,32);
	scrolltextIn = new scrolltext_horizontal();
	scrolltextIn.scrtxt=text2;
	scrolltextIn.init(mergecanvas,fontIn, 7);

	myfxIn=new FX(mergecanvas,ef2_displayCanvas,myfxparam);
	myfxOut=new FX(mergecanvas,ef2_displayCanvas,myfxparam);

	// floor
	checkerboard_shadow = new image('shadow14.png');
	checkerboard_3Dcanvas = new canvas(640,100);
	checkerboard_floor3Dcanvas = new canvas(640,200);
	generateFloorGrid(checkerboard_floorverts, checkerboard_floorfaces, 1980, 400, 50, 24, new MeshBasicMaterial({ color:0xE0E0E0 }), new MeshBasicMaterial({ color:0x202020 }));
	checkerboard_floor3d=new codef3D(checkerboard_floor3Dcanvas, 35, 90, 1, 480 );
	checkerboard_floor3d.faces(checkerboard_floorverts,checkerboard_floorfaces, false, true );
	checkerboard_floor3d.group.rotation.x = -0.6;
	checkerboard_floor3d.group.position.y = 40;
	checkerboard_floor3d.group.position.x -= 600;
	checkerboard_floor3d.group.position.z = -20;

	// vectorballs 3D
	maincanvas3d=new canvas(640,400);
	canvas3d_shadow=new canvas(640,400);

	vectorBalls3d=new codef3D(maincanvas3d, 400, 0, 1, 1600 );
	vectorBalls3d.vectorball_img(sprite1ObjVert, sprites, 'v0' );
	vectorBalls3d.vectorball_img(sprite2ObjVert, sprites, 'v1' );
	vectorBalls3d.vectorball_img(sprite3ObjVert, sprites, 'v2' );
	vectorBalls3d.vectorball_img(sprite4ObjVert, sprites, 'v3' );
	vectorBalls3d.vectorball_img(sprite1ObjVert, spriteShadows, 's0' );
	vectorBalls3d.vectorball_img(sprite2ObjVert, spriteShadows, 's1' );
	vectorBalls3d.vectorball_img(sprite3ObjVert, spriteShadows, 's2' );
	vectorBalls3d.vectorball_img(sprite4ObjVert, spriteShadows, 's3' );

	for (counter = 0; counter < 4; counter++)
	{
		var vb = vectorBalls3d.group.getChildByName('v' + counter);
		vb.scale = new THREE.Vector3( 0.9, 0.9, 0.9 );

		var sh = vectorBalls3d.group.getChildByName('s' + counter);
		sh.scale = new THREE.Vector3( 0.9, 0.9, 0.9 );
		sh.position.y = -105;
		sh.position.z = -300;
	}

	scrollFSM = new FSM( "slowDistort" );
    	scrollFSM.add_transition( "acc", "slowDistort", null, "changingToFast" );
    	scrollFSM.add_transition( "isFast", "changingToFast", null, "fastDistort" );
    	scrollFSM.add_transition( "dec", "fastDistort", null, "changingToSlow" );
    	scrollFSM.add_transition( "isSlow", "changingToSlow", null, "slowDistort" );

/*
setTrajectory(1.5, 2.0, 1.5, 200, 180, 240, 6, 0.04, BOUNCE, RIGHT);
setTrajectory(1.5, 3.0, 1.5, 200, 100, 240, 10, 0.05, SYNC, RIGHT);
setTrajectory(1.5, 2.0, 1.5, 200, 180, 240, 6, 0.04, BOUNCE, LEFT)
setTrajectory(2.5, 0.6, 2.5, 200, 100, 240, 2, 0.09, NORMAL, RIGHT);
setTrajectory(1.5, 4.0, 1.5, 200, 100, 240, 10, 0.03, NORMAL, RIGHT);
setTrajectory(2.5, 4.6, 2.5, 200, 100, 240, 3, 0.05, NORMAL, RIGHT);
*/

	vectBallFSM = new FSM( "idle" );
	vectBallFSM.add_transition( "t_idleToBounce", "idle", null, "idleToBounce" );
	vectBallFSM.add_transition( "t_isNotIdle", "idleToBounce", null, "bounce" );
	vectBallFSM.add_transition( "t_bounceToSync", "bounce", null, "bounceToSync" );
	vectBallFSM.add_transition( "t_isSyncing", "bounceToSync", null, "sync" );
	vectBallFSM.add_transition( "t_syncToRevBounce", "sync", null, "syncToRevBounce" );
	vectBallFSM.add_transition( "t_isRevBouncing", "syncToRevBounce", null, "revBounce" );
	vectBallFSM.add_transition( "t_revBounceToRace", "revBounce", null, "revBounceToRace" );
	vectBallFSM.add_transition( "t_isRacing", "revBounceToRace", null, "race" );
	vectBallFSM.add_transition( "t_raceToPlate", "race", null, "raceToPlate" );
	vectBallFSM.add_transition( "t_isPlate", "raceToPlate", null, "plate" );
	vectBallFSM.add_transition( "t_plateToSnake", "plate", null, "plateToSnake" );
	vectBallFSM.add_transition( "t_isSnake", "plateToSnake", null, "snake" );
	vectBallFSM.add_transition( "t_snakeToBounce", "snake", null, "snakeToBounce" );
	vectBallFSM.add_transition( "t_isBouncing", "snakeToBounce", null, "bounce" );
	
}

////////////////////////////////////////////////////////////////////////////////
// Effect2 PreRender Function
////////////////////////////////////////////////////////////////////////////////
function effect2_prerender()
{

}

////////////////////////////////////////////////////////////////////////////////
// Effect2 PostRender Function
////////////////////////////////////////////////////////////////////////////////
function effect2_postrender()
{

}

////////////////////////////////////////////////////////////////////////////////
// Effect2 Render Function
////////////////////////////////////////////////////////////////////////////////
function effect2_render(currentFrame)
{
	document.getElementById('lerp').innerHTML = "Scroller State : " + scrollFSM.current_state + " / Factor : " + factor + "<BR>VectorBall State : "  + vectBallFSM.current_state;

	if(currentInnerFrame >= STEP0 && currentInnerFrame < STEP1)
	{
		setTrajectory(1.5, 2.0, 1.5, 200, 180, 240, 6, 0.04, BOUNCE, RIGHT);
		changeScrollTextDistort(FASTDISTORT);

	}
	else if(currentInnerFrame >= STEP1 && currentInnerFrame < STEP2)
	{
		setTrajectory(1.5, 3.0, 1.5, 200, 100, 240, 10, 0.05, SYNC, RIGHT);
		changeScrollTextDistort(SLOWDISTORT);

	}
	else if(currentInnerFrame >= STEP2 && currentInnerFrame < STEP3)
	{
		setTrajectory(1.5, 2.0, 1.5, 200, 180, 240, 6, 0.04, BOUNCE, LEFT);
		changeScrollTextDistort(FASTDISTORT);
	}
	else if(currentInnerFrame >= STEP3 && currentInnerFrame < STEP4)
	{
		setTrajectory(2.5, 0.6, 2.5, 200, 100, 240, 2, 0.09, NORMAL, RIGHT);
		changeScrollTextDistort(SLOWDISTORT);
	}
	else if(currentInnerFrame >= STEP4 && currentInnerFrame < STEP5)
	{
		setTrajectory(1.5, 4.0, 1.5, 200, 100, 240, 10, 0.03, NORMAL, RIGHT);
		changeScrollTextDistort(FASTDISTORT);
	}
	else if(currentInnerFrame >= STEP5 && currentInnerFrame < STEP6)
	{
		setTrajectory(2.5, 4.6, 2.5, 200, 100, 240, 3, 0.05, NORMAL, RIGHT);
		changeScrollTextDistort(SLOWDISTORT);
	}
	else if(currentInnerFrame >= STEP6)
	{
		currentInnerFrame = STEP0;
	}

	mergecanvas.clear();
	checkerboard_3Dcanvas.clear();
	checkerboard_floor3Dcanvas.clear();
	maincanvas3d.clear();
	canvas3d_shadow.clear();

	// draw checkerboard
	checkerboard_floor3d.draw();
	checkerboard_floor3Dcanvas.draw(ef2_displayCanvas, 0, 200, 1.0);

	checkerboard_angle += 0.02;
	checkerboard_floor3d.group.translateX(Math.sin(checkerboard_angle)*8.0);
	checkerboard_floor3d.group.translateY(-Math.cos(checkerboard_angle*2)*5.0);

	mountains.draw(ef2_displayCanvas, 0,0);

	scrollPos = 32 + (30*Math.sin(checkerboard_angle*4.5));

	scrolltextIn.draw(scrollPos);
	mergecanvas.contex.globalCompositeOperation='source-in';
	rastersFonts.draw(mergecanvas, 0, 0);
	mergecanvas.contex.globalCompositeOperation='source-over';
	scrolltextOut.draw(scrollPos);

	myfxIn.sinx(-30,0);
	myfxOut.sinx(-30,0);

	vectorBalls3d.draw();

	if(currentFrame % 4 == 0 || currentFrame % 4 == 1)
		rasterFloorGreen.draw(ef2_displayCanvas, 0,177, 0.8);
	else
		rasterFloorPurple.draw(ef2_displayCanvas, 0,177, 0.8);

	// draw transparent shadow effects
	checkerboard_shadow.draw(ef2_displayCanvas, 0,200, 0.7);

	// draw vectorballs canvas last
	maincanvas3d.draw(ef2_displayCanvas,0,0);

	currentInnerFrame++;
	document.getElementById('trace').innerHTML = "Inner frame : " + currentInnerFrame;

}

////////////////////////////////////////////////////////////////////////////////
// EOF
////////////////////////////////////////////////////////////////////////////////