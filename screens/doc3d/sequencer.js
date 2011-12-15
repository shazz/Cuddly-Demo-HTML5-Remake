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
// Sequencer Internal Variables
////////////////////////////////////////////////////////////////////////////////
var main_canvas;
var framesCounter = 0;
var effectsDescriptor;

////////////////////////////////////////////////////////////////////////////////
// Sequencer Functions
////////////////////////////////////////////////////////////////////////////////

// Init all effects and the display canvas
function sequencer_init(displayWidth, displayHeight, effects)
{
	effectsDescriptor = effects;

	// Setup pdisplay canvas
	main_canvas=new canvas(displayWidth,displayHeight,"main");

	for(item=0; item< effectsDescriptor.length; item++)
	{
		document.getElementById("debug").innerHTML = 'init : ' + effectsDescriptor[item].name + ' (' + effectsDescriptor[item].startFrame + ' to ' + effectsDescriptor[item].endFrame + ')';
		eval(effectsDescriptor[item].init + '();');
	}
}

// Start the sequencer and run all effects at the given timeframe
function sequencer_start()
{
	for(item=0; item< effectsDescriptor.length; item++)
	{
		if(effectsDescriptor[item].startFrame <= framesCounter && effectsDescriptor[item].endFrame > framesCounter)
		{
			eval(effectsDescriptor[item].render + '(' + (framesCounter - effectsDescriptor[item].startFrame) + ');');
			document.getElementById("debug").innerHTML = 'effect : ' + effectsDescriptor[item].name + ' (' + effectsDescriptor[item].startFrame + ' to ' + effectsDescriptor[item].endFrame + ') - frame : ' + framesCounter;
		}
	}

	framesCounter++;
	requestAnimFrame( sequencer_start );
}

// Get the display canvas
function sequencer_getDisplayCanvas()
{
	return main_canvas;
}

////////////////////////////////////////////////////////////////////////////////
// EOF
////////////////////////////////////////////////////////////////////////////////