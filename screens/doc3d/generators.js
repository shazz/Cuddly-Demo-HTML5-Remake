var DEBUG = false;

function generateGrid(vertices, faces, gridWidth, gridHeight, tesselLevelX, tesselLevelY, lightning)
{
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

}

function generateFloorGrid(vertices, faces, gridWidth, gridHeight, tesselLevelX, tesselLevelY, colorOdd, colorEven)
{
	for(y=0;y<tesselLevelY; y++)
	{	
		for(x=0;x<tesselLevelX+1; x++)
		{
			vertices[(y*(2*(tesselLevelX+1))) + (2*x)] 	= 	{x: (-gridWidth/2) + (gridWidth/tesselLevelX)*x, y: (gridHeight/2) - (gridHeight/tesselLevelY)*y, 		z: 0};	
			vertices[(y*(2*(tesselLevelX+1))) + ((2*x)+1)] 	= 	{x: (-gridWidth/2) + (gridWidth/tesselLevelX)*x, y: (gridHeight/2) - (gridHeight/tesselLevelY)*(y+1), 	z: 0};	
		}
	}
	
	var color = colorOdd;
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
						params:color
			};	
			faces[((2*i)+1)]= 
			{			p1:3+(2*j), p2:2+(2*j), p3:0+(2*j), 
						u1:(1.0/(tesselLevelX))*(x+1),	
						v1:(1.0/tesselLevelY)*(y+1), 	
						u2:(1.0/(tesselLevelX))*(x+1),	
						v2:(1.0/tesselLevelY)*y, 	
						u3:(1.0/(tesselLevelX))*x,
						v3:(1.0/tesselLevelY)*y,
						params:color
			};
			if(color == colorOdd) color = colorEven;
			else color = colorOdd;
		}
		if(color == colorOdd) color = colorEven;
		else color = colorOdd;
	}
}