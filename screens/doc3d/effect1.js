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
// Effect1 Variables
////////////////////////////////////////////////////////////////////////////////
var ef1_displayCanvas;
var ef1_fonts;
var ef1_scrolltext;

////////////////////////////////////////////////////////////////////////////////
// Effect1 Init Function
////////////////////////////////////////////////////////////////////////////////
function effect1_init()
{
	ef1_displayCanvas = sequencer_getDisplayCanvas();
	ef1_fonts = new image('font7.png');
	
	ef1_fonts.initTile(66,52,32);
	ef1_scrolltext = new scrolltext_horizontal();
	ef1_scrolltext.scrtxt="YO, LAMERS!!!   TCB HAVE DONE IT ONCE AGAIN...                  ";
	ef1_scrolltext.init(ef1_displayCanvas,ef1_fonts,7);	
}

////////////////////////////////////////////////////////////////////////////////
// Effect1 PreRender Function
////////////////////////////////////////////////////////////////////////////////
function effect1_prerender()
{

}

////////////////////////////////////////////////////////////////////////////////
// Effect1 PostRender Function
////////////////////////////////////////////////////////////////////////////////
function effect1_postrender()
{

}

////////////////////////////////////////////////////////////////////////////////
// Effect1 Render Function
////////////////////////////////////////////////////////////////////////////////
function effect1_render(currentFrame)
{
	ef1_displayCanvas.fill('#000000');
	ef1_scrolltext.draw(2);
}

////////////////////////////////////////////////////////////////////////////////
// EOF
////////////////////////////////////////////////////////////////////////////////