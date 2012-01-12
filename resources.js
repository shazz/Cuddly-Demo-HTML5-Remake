/* -----

	ressources
		
	------			*/

var g_resources = [
	
	/////////////////////////
	// main menu stuff
	/////////////////////////
	
	// main tileset
	{
		name: "tileset",	
		type:"image",	
		src: "data/sprites/tileset.png"
	},
	
	// background
	{
		name: "background",	
		type:"image",	
		src: "data/background/back.png"
	},
	
	// main entity
	{
		name: "sprites",	
		type:"image",	
		src: "data/sprites/sprites.png"
	},
	
	// level 1
	{
		name: "menu",
		type: "tmx",	
		src: "data/menu.tmx"
	},
	
	// flying sprites
	{
		name: "sprite_t",	
		type:"image",	
		src: "data/sprites/sprite_t.png"
	},
	{
		name: "sprite_h",	
		type:"image",	
		src: "data/sprites/sprite_h.png"
	},
	{
		name: "sprite_e",	
		type:"image",	
		src: "data/sprites/sprite_e.png"
	},
	{
		name: "sprite_e2",	
		type:"image",	
		src: "data/sprites/sprite_e2.png"
	},	
	{
		name: "sprite_c",	
		type:"image",	
		src: "data/sprites/sprite_c.png"
	},
	{
		name: "sprite_a",	
		type:"image",	
		src: "data/sprites/sprite_a.png"
	},
	{
		name: "sprite_r",	
		type:"image",	
		src: "data/sprites/sprite_r.png"
	},
	{
		name: "sprite_b",	
		type:"image",	
		src: "data/sprites/sprite_b.png"
	},
	{
		name: "sprite_s",	
		type:"image",	
		src: "data/sprites/sprite_s.png"
	},	
	
	{
		name: "fonts",
		type:"image",
		src: "data/fonts/fonts82x80.png"
	},
	
	{
		name: 'main_menu',  
		type:'binary',  
		src: 'data/music/Cuddly - main menu.ym'
	},
	
	/////////////////////////
	// Big Sprite stuff
	/////////////////////////
	
	// 
	{
		name: "bs_fontOut",	
		type:"image",	
		src: "screens/BigSprite/fonts.png"
	},
	// 
	{
		name: "bs_fontIn",	
		type:"image",	
		src: "screens/BigSprite/fonts_rasters.png"
	},
	// 
	{
		name: "bs_logoUnion",	
		type:"image",	
		src: "screens/BigSprite/logo.png"
	},
	// 
	{
		name: "bs_logoUnion2",	
		type:"image",	
		src: "screens/BigSprite/logo2.png"
	},
	// 
	{
		name: "bs_rasters",	
		type:"image",	
		src: "screens/BigSprite/rasters.png"
	},
	// 
	{
		name: "bs_spriteT",	
		type:"image",	
		src: "screens/BigSprite/spriteT.png"
	},
	// 
	{
		name: "bs_spriteH",	
		type:"image",	
		src: "screens/BigSprite/spriteH.png"
	},
	// 
	{
		name: "bs_spriteE",	
		type:"image",	
		src: "screens/BigSprite/spriteE.png"
	},
	// 
	{
		name: "bs_spriteC",	
		type:"image",	
		src: "screens/BigSprite/spriteC.png"
	},
	// 
	{
		name: "bs_spriteA",	
		type:"image",	
		src: "screens/BigSprite/spriteA.png"
	},
	// 
	{
		name: "bs_spriteR",	
		type:"image",	
		src: "screens/BigSprite/spriteR.png"
	},
	// 
	{
		name: "bs_spriteB",	
		type:"image",	
		src: "screens/BigSprite/spriteB.png"
	},
	// 
	{
		name: "bs_spriteS",	
		type:"image",	
		src: "screens/BigSprite/spriteS.png"
	},
	// 
	{
		name: "bs_spriteSpc",	
		type:"image",	
		src: "screens/BigSprite/spriteSpc.png"
	},	
	
	// Big Sprite audio track
	{
		name: "bigsprite_music",		
		type: "binary",
		src:  "screens/BigSprite/Cuddly - Big Sprite.ym"
	},
	
	/////////////////////////
	// Starwars stuff
	/////////////////////////
	// 
	{
		name: "sw_fonts",	
		type:"image",	
		src: "screens/StarwarsDemo/fonts_sw16.png"
	},	
	// 
	{
		name: "sw_fontOut",	
		type:"image",	
		src: "screens/StarwarsDemo/fonts.png"
	},
	// 
	{
		name: "sw_fontIn",	
		type:"image",	
		src: "screens/StarwarsDemo/fonts_rasters.png"
	},	
	// 
	{
		name: "sw_logoUnion",	
		type:"image",	
		src: "screens/StarwarsDemo/logo.png"
	},
	// 
	{
		name: "sw_scrollrasters",	
		type:"image",	
		src: "screens/StarwarsDemo/rasters.png"
	},	
	// 
	{
		name: "sw_rasters1",	
		type:"image",	
		src: "screens/StarwarsDemo/rasters_sc1.png"
	},		
	// 
	{
		name: "sw_rasters2",	
		type:"image",	
		src: "screens/StarwarsDemo/rasters_sc2.png"
	},
	// 
	{
		name: "sw_spriteT",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_t.png"
	},	
	// 
	{
		name: "sw_spriteH",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_h.png"
	},
	// 
	{
		name: "sw_spriteE",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_e.png"
	},
	// 
	{
		name: "sw_spriteSpc",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_spc.png"
	},
	// 
	{
		name: "sw_spriteU",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_u.png"
	},
	// 
	{
		name: "sw_spriteN",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_n.png"
	},
	// 
	{
		name: "sw_spriteI",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_i.png"
	},
	// 
	{
		name: "sw_spriteO",	
		type:"image",	
		src: "screens/StarwarsDemo/sprite_o.png"
	},	
];