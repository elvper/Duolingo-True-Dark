// ==UserScript==
// @name        Duolingo True Dark
// @description Turn off the lights on Duolingo
// @include     https://www.duolingo.com/*
// @version     0
// @author      elvper
// ==/UserScript==

var brightness = 0.75; // between 0 and 1, 1 is no adjustment while 0 is completely black.

var bodydiv = document.createElement('div');
	bodydiv.id = 'TurnDownLights';
	document.getElementsByTagName('body')[0].appendChild(bodydiv);

document.head.innerHTML += '<style type="text/css">'+

// ##### overlay to darken #####
'#TurnDownLights{position:fixed;width:100%;height:100%;background-color:#000;top:0;left:0;z-index:9001;opacity:' + (1 - brightness) + ';pointer-events:none}' +

'</style>';
