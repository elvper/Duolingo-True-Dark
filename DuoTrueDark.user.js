// ==UserScript==
// @name        Duolingo True Dark
// @description Turn off the lights on Duolingo
// @include     https://www.duolingo.com/*
// @version     1
// @author      elvper
// ==/UserScript==

var bodydiv = document.createElement('div');
	bodydiv.id = 'TurnDownLights';
	document.getElementsByTagName('body')[0].appendChild(bodydiv);

// To do
// - Labs

//var gray = createGray();

// 0 = black, 1 dark gray to 9 light gray, 10 = white
var gray = (function createGray(){
    var cGray = [];
    for (var i = 0; i < 11; i++) {
        var x = i * 25;
        cGray[i] = 'rgb(' + x + ',' + x + ',' + x + ')';
    }
    return cGray;
})();

//settings

pc = {};
pc.outerbg		= gray[4];
pc.innerbg		= gray[0];
pc.darkerbg		= gray[3];
pc.darkbg		= gray[2];
pc.darkBluebg	= "#256e92";
pc.lightBluebg	= "#1caff6";
pc.accent		= gray[8];
pc.headers		= gray[8];
pc.text			= gray[8];
pc.blacktext	= gray[0];
pc.whitetext	= gray[10];
pc.contrasttext	= "#ffb100";
pc.correct		= "green";
pc.wrong		= "red";
pc.skillcircle	= gray[3];

ex = {};
ex.position		= [ "flex-start"]; // default = center

var darkCrown = chrome.extension.getURL("crown-small-black.svg");
var darkStar = chrome.extension.getURL("star-outlined-dark.svg");
// var goldRadial = chrome.extension.getURL("test.svg") + "#goldRadial";
// console.log(goldRadial);
// var goldRadialHTML = document.createElement("radialGradient");
// goldRadialHTML.id = "goldRadial";
// goldRadialHTML.setAttribute("cx", "50");
// goldRadialHTML.setAttribute("cy", "50");
// goldRadialHTML.setAttribute("r", "50");
// goldRadialHTML.setAttribute("gradientUnits", "userSpaceOnUse");
// goldRadialHTML.innerHTML = '<stop offset="0%" stop-color="rgb(255,176,84)"></stop><stop offset="80%" stop-color="rgb(255,176,84)"></stop><stop offset="85%" stop-color="rgb(75,75,75)"></stop><stop offset="95%" stop-color="rgb(75,75,75)"></stop><stop offset="100%" stop-color="rgb(255,176,84)"></stop>'

var invert = 'filter: invert(1) hue-rotate(180deg);-webkit-filter: invert(1) hue-rotate(180deg);';
var invertBright = 'filter: invert(1) hue-rotate(180deg) brightness(200%);-webkit-filter: invert(1) hue-rotate(180deg) brightness(200%);';
var invertBright2 = 'filter: invert(1) hue-rotate(180deg) brightness(200%);-webkit-filter: invert(1) hue-rotate(180deg) brightness(300%);';
var invertBright4 = 'filter: invert(1) hue-rotate(180deg) brightness(800%);-webkit-filter: invert(1) hue-rotate(180deg) brightness(800%)';

var brightness = 0.5; // between 0 and 1, 1 is no adjustment while 0 is completely black.

var bodydiv = document.createElement('div');
	bodydiv.id = 'TurnDownLights';
	//document.getElementsByTagName('body')[0].appendChild(bodydiv);

var sheet = document.createElement('style')
sheet.innerHTML = '#TurnDownLights{position:fixed;width:100%;height:100%;background-color:rgba(0, 0, 0, 0);top:0;left:0;z-index:9001;pointer-events:none}' +

// ##### topbar #####
'._6t5Uh{opacity:.9}' +
// -webkit-filter:brightness(.9);filter:brightness(.9);

// #################################################################
// ############################### main ############################
// #################################################################

// ##### background #####
	// main background
'.LFfrA._3MLiB,[dir=ltr],div[id=root]' + // front page
'{background:' + pc.outerbg + '}' +

	// secondary backgrounds
'._2hEQd._1E3L7,' + // skills box
'._1E3L7,' + // sidepanel boxes + labs stories
'.a5SW0,' + // leaderboard
'._1H-7I._2GJb6._1--zr' + // bonus skills
'{background:' + pc.innerbg + '}' +

// ##### main text #####
	// headers
'h1,' + // language skills title
'h2,' +
'._2SXd7 span' + 
'{color:' + pc.headers + '}' +

	// text
'._378Tf._3qO9M._33VdW' +
'{color:' + pc.text + '!important' + '}' +

	// crown text
'.qLLbC' +
'{color:' + pc.blacktext + ';font-weight: 900;font-size: 20px;}' +

// ##### main icons #####
	// crown svg
'img._2PyWM' +
'{content: url(' + darkCrown + ');}' +

	// skill circles
'._2xGPj > svg > path:last-of-type' + // 0 progress circle
//'{fill:' + pc.skillcircle + '}' +
//'{fill:url(' + goldRadial + ')}' +
'{fill:url(' + '#goldRadial' + ')}' +
'._2xGPj > svg > circle[fill="#dddddd"]:first-of-type' + // Not progressed
//'{fill:' + pc.skillcircle + '}' +
'{fill:url(' + '#grayRadial' + ')}' +
//'._2xGPj > svg > circle[fill="#ffb020"]:first-of-type' + // Progressed, remove some spilling
//'{fill:url(' + goldRadial + ')}' +

	// locked skills
'._39kLK' + // background
'{background:' + gray[3] + '}' +
'span.yeYoR._9l65a._3aw24' + // icons
'{opacity: 0.8;}' +

	// checkpoint passed
'._1kVHP.NSbuJ.jSpv4._2arQ0._3skMI._--tG3' +
'{' + invert + '}' +

	// leaderboard buttons
'button._1V9bF._1uzK0._3f25b._2arQ0._3skMI' +
'{background:' + pc.outerbg + ';color:' + pc.whitetext + '}' +

	// social buttons
'._1wXHG' +
'{' + invert + '}' +
'._2r9SH a' +
'{background:' + pc.accent + '}' +

	// store button text hover
'.oNqWF:not([disabled]):hover' +
'{color:' + pc.text + '!important' + '}' +

// ##### sidebar #####
	// daily goal
'._3Ttma,' + // goal circle
'.Rbutm > .cCL9P' + // goal icon
'{' + invertBright + '}' +

	// crown text
'.nh1S1' +
'{font-size: 44px;font-weight: 900;color:' + pc.blacktext + '}' +

// ##### topbar dropdown #####
	// background dropdown
'._20LC5._2HujR._1ZY-H,' +
'._3q7Wh.OSaWc._2HujR._1ZY-H' +
'{background:' + pc.innerbg + '}' +

	// dropdown icon
'._20LC5:after,' + // icon user dropdown
'._2HujR:after' + // icon language dropdown
'{' + invert + '}' +

	// active bacground
'._1oVFS._2kNgI._1qBnH{background: ' + pc.outerbg + ';}' +

	// text
'._2kNgI._1qBnH,' +
'._2uBp_._1qBnH,' +
'._3sWvR,' +
'._1fA14' +
'{color:' + pc.text + '}' +

	// separation line
'.qsrrc{border-top: 2px solid ' + pc.outerbg + ';}' +

	// hover dropdown
'._1fA14:hover,._2kNgI._1qBnH:hover > ._1fA14,._2kNgI._1qBnH:hover,._2uBp_._1qBnH:hover,._3sWvR:hover' +
'{color: ' + pc.whitetext + ';}' +

// ##### exercices #####
	// introduction window
'._3giip,' + // main bg
//'._1SfYc._1qCW5,' + // sort exercise question
//'._2T9b4 ._3NfAi' + // sort exercise lines
//'{background:' + pc.darkerbg + '}' +
'{background:radial-gradient(farthest-corner at 50% 40%, ' + pc.darkbg + ', ' + pc.darkerbg + ', ' + pc.outerbg + ', ' + pc.outerbg + ')}' +
'._3GXmV._1sntG' + // bottom bar bg
'{background:' + pc.innerbg + '}' +
'._2LZU-._3VdUV' + // text
'{color:' + pc.text + '}' +
'._1ujec,' + // headers
'.Hb0Y0' +
'{color:' + pc["header"] + '}' +

	// question
'._38VWB,' +
'.KRKEd._2UAIZ._1LyQh,' + // selection exercise
'._3mDrc' + // missing word exercise
'{color:' + pc.whitetext + '}' +

	// question new word
'.MUGWy.XV0Fl' +
'{color:' + pc.contrasttext + ',font-weight: 700;}' +

	// check button
'._1cw2r' +
'{color:' + pc.blacktext + '}' +

	// exercise box y position
'._1Y5M_' + // solution box
'{justify-content:' + ex["position"] + '}' +

	// word choice button selected
'.iNLw3._1mSJd' + // all choice buttons
'{color:' + pc.text + ";" + 'background:' + pc.innerbg + '}' +

	// word choice button disabled
'.iNLw3._1mSJd.jkMDT' + // disabled choice buttons
'{color:' + pc.innerbg + '}' +

	// solution bottom bar
'._3uFh7' + // correct
'{' + invertBright + '}' +
'.svQU_,' + // wrong
'.svQU_ ._1l6NK' +
'{background:#6d0500}' +
'button._3XJPq._2PaNr.ZrFol._3j92s._27uC9._3Lp3y' + // button text wrong
'{color:#820600}' +
'.svQU_ ._1l6NK ._2KMvD' + // contrast wrong
'{background:#f00;}' +
'.m_YKo._23CAe.cCL9P' + // icon wrong
'{filter: brightness(50%);-webkit-filter: brightness(50%);}' +

	// Typing field
'textarea[dir=ltr],' +
'._1Juqt:disabled' + // also when disabled
'{background:' + pc.innerbg + ';color:' + pc.text + '}' +

	// end windows
'._14PRs' + // window count circles
'{border: 6px solid ' + pc.accent + '}' +
'._1EVZm._14PRs' + // not current window
'{background:' + pc.accent + '}' +
'._26pCf' + // xp circle
'{' + invertBright + '}' +

	// picture selection
'.a-Y8L span' + // text
'{color:' + pc.whitetext + '}' +

	// header
'._1Zqmf' +
'{color:' + pc.headers + '}' +

	// choice exercise
'._3EaeX' + // text and background
'{color:' + pc.whitetext + ';background:' + pc.darkerbg + '}' +
'._1-PLN ._3EaeX,' + // selected background text
'._1-PLN' + // selected bar
'{background:' + pc.darkBluebg + '}' +

	// missing word selection
'._386Rr' + // text
'{color:' + pc.whitetext + '}' +

// ##### notification #####
'.ReactModal__Content.ReactModal__Content--after-open._1bYPb._3gvMn._3I5-U._2CNG0._2-QsC' + // background
'{background:' + pc.darkbg + '}' +
'._26XGQ' + // text
'{color:' + pc.whitetext + '}' +

// #################################################################
// ############################## forum ############################
// #################################################################

// frontpage
	// background
'._3RKCq,' + // main
'._3xGp6' + // sidebar
'{background:' + pc.innerbg + '}' +

	// text bubble
'._1z3lM.PvWDw.cCL9P' +
'{' + invertBright4 + '}' +

	// tags
'._2q5mt._3sS14' +
'{' + invertBright4 + '}' +

	// text sidebar
'.cL6o3' +
'{color:' + pc.text + '}' +

	// sidebar hover background
'._7SUuD:hover,' + // text
'.slg8x:hover' + // bar
'{background:' + pc.outerbg + '}' +

	// sidebar hover text
'._7SUuD:hover .cL6o3,' + // text
'.slg8x:hover .cL6o3,' + // bar
'._7SUuD:hover ._2LBIq,' +
'.slg8x:hover ._2LBIq' + // bar
'{color:' + pc.whitetext + '}' +

	// sidebar active
'.K4oWn.slg8x' +
'{background:' + pc.darkBluebg + '}' +

// posts
	// text
'._2povu,' +
'._2povu h4' + // header
'{color:' + pc.text + '}' +

	// code
'._2povu code' +
'{background:' + pc.darkBluebg + '}' +

	// level
'._21PEz' +
'{color:' + pc.text + '}' +

	// comment field
'._1KvMS textarea,' + // top
'.claeN textarea' + // reply
'{background:' + pc.innerbg + ';color:' + pc.text + '}' +

// #################################################################
// ############################ words tab ##########################
// #################################################################

// background
'section#vocabulary-list,' + // main
'.box-colored.bg-white.spaced-rep' + // sidebar
'{background:' + pc.innerbg + '}' +

// sidebar text
'#default-sidebar td,' + // table
'#default-sidebar p' + // normal
'{color:' + pc.text + '}' +

// table
'.table.table-striped.sortable' + // text
'{color:' + pc.text + '}' +
'.table-striped>tbody>tr:nth-child(odd)>td, .table-striped > tbody > tr:nth-child(odd) > th, .table-striped > tbody > tr:nth-child(odd)' + // alt
'{color:' + pc.text + ' !important;background:' + pc.darkbg + ';}' +
'table#vocab-list>tbody>tr.active>td, table#vocab-list>tbody>tr:hover>td' + // hover
'{background-color: ' + pc.outerbg + ';border-top: 2px solid rgb(125,125,125);border-bottom: 2px solid rgb(125,125,125);color:' + pc.whitetext + ' !important;}' +

// pop-up bubble
'.inner > .content' + // text
'{color:' + pc.whitetext + '}' +
'.hint-popover .inner,' + // background
'table#vocab-list .hint-popover.right .inner:before,' +
'table#vocab-list .hint-popover.right .inner:after' +
'{background:' + pc.outerbg + '}' +

// side pop
'.top-hint.left div,' +
'#word-sidebar .word-skill a,' +
'.word-type.right div' +
'{color:' + pc.text + '}' +

// pop-up
'div#word-modal,' + // background
'div#word-modal #example-sentences tbody tr:nth-child(1)' + // also first row
'{background:' + pc.darkbg + '}' +
'div#word-modal #example-sentences td,' + // text
'div#word-modal #example-sentences tr>td:nth-child(1),' +
'.verb-table td span' +
'{color:' + pc.text + '}' +

// #################################################################
// ############################### labs ############################
// #################################################################

// headers
'._3gRs1,' +
'._2gvA1' +
'{color:' + pc.headers + '}' +


// ##### story overview #####
// outer background
'.outer-whole-page,' +
'body' +
'{background:' + pc.outerbg + '}' +

// inner background
'.home-page .story-grid .stories-header,' + // top banner
'.home-page .set' + // story sets
'{background:' + pc.innerbg + '}' +

// headers
'.home-page .story-grid .description h2,' + // top banner header 
'.set-header' + // set headers
'{color:' + pc.headers + '}' +

// text
'.home-page .story-grid .description p,' + // top banner text
'.home-page .story-grid .story .title' + // story title
'{color:' + pc.text + '}' +

// star svg
'.progress-ring-container .completed-star' +
'{background-image: url(' + darkStar + ');}' +

// story complete icon
'.story-circle-illustration.complete' +
'{' + invert + '}' +

// ##### story page #####
// outer bg
'.story-page' +
'{background:' + pc.outerbg + '}' +

// inner bg
'.transcription-container' +
'{background:' + pc.innerbg + '}' +

// progress bar
'.story-header' +
'{background:' + pc.skillcircle + ';box-shadow: 0 0 14px 14px ' + pc.skillcircle + '}' +

// text
'.synced-text.highlighted,' +
'.synced-text,' +
'.phrase.phrase-selector.highlighted .answer,' +
'.phrases-with-hints .phrase,' +
'.challenge-question.match-challenge-header,' +
'.challenge-question,' +
'.story-end-section h2' +
'{color:' + pc.text + '}' +

// continue arrow
'.play-controls .continue::before' +
'{' + invert + '}' +

// dropdown
'.phrase.phrase-selector .phrase-selector-dropdown' + // background
'{background:' + pc.outerbg + '}' +
'li.phrase-selector-option' + // text
'{color:' + pc.whitetext + ' !important;}' +
'.phrase.phrase-selector .phrase-selector-dropdown::before' + // icon
'{border-bottom: 16px solid ' + pc.outerbg + '}' +

// dropdown hover
'.phrase.phrase-selector .phrase-selector-dropdown li:hover' + // background
'{background:' + pc.innerbg + '}' +

// checkbox
'.challenge-answers > li > button' +
'{' + invert + '}' +
'.grade-correct.selected' + // correct checkbox
'{background:' + pc.correct + ';}' +
'pc.correct		= [ "green" 						];' + // wrong checkbox
'{bacground:' + pc.wrong + '}' +

// correct tappable phrase
'.phrase.has-hint.grade-correct.tappable-phrase' +
'{background:' + pc.correct + ';}' +

// tappable phrase option
'.challenge-active.tap-challenge .tappable-phrase' + // background
'{background:' + pc.outerbg + ';}' +
'span.point-to-phrase-synced-text.highlighted.has-time.has-text' + // text
'{color:' + pc.whitetext + '}' +
'.phrase.has-hint.grade-correct.tappable-phrase' +
'{color:' + pc.correct + '}' +

// arrange exercise
'.arrange-challenge-line .phrase-bank .phrase' + // selection
'{background-color:' + pc.outerbg + ';color:' + pc.whitetext + '}' +
'.arrange-challenge-line .selected-phrases li' + // solution bar
'{background-color:' + pc.outerbg + '}' +
'.arrange-challenge-line .phrase-bank .phrase.placed' + // exhausted option
'{background-color:' + pc.darkbg + ';color:' + pc.blacktext + '}' +

// match exercise
'.match-challenge .token.correct' + // used
'{background-color:' + pc.darkbg + '}' +
'.match-challenge .token' + // unused
'{background-color:' + pc.outerbg + ';color:' + pc.whitetext + '}' +

// typing field
'.graded-text-input > textarea' +
'{background-color:' + pc.outerbg + ';color:' + pc.whitetext + '}' +
'.graded-text-input textarea.correct' + // correct
'{background-color:' + pc.outerbg + ';color:' + pc.whitetext + '}' +

// end xp ring-container
'.ring-of-fire' +
'{' + invertBright2 + '}' +

// #################################################################
// ######################### settings tab ##########################
// #################################################################

// text
'._3jbqt,' +
'._5wNXo,' +
'._3-YQ1' +
'{color:' + pc.text + '}' +

// input background
'._3jbqt input,' +
'._3jbqt textarea' +
'{background:' + pc.outerbg + ';color:' + pc.whitetext + '}' +

// checked button background
'._3-hnY, ._3-hnY:checked' +
'{background:' + pc.innerbg + '}' +

// sidepanel
'li._2kA5V._26YU4' + // active
'{background:' + pc.darkBluebg + '}' +
'li._2kA5V._26YU4 a' + // active
'{color:' + pc.whitetext + '}' +
'li._26YU4' + // not active
'{background:' + pc.outerbg + '}' +
'li._26YU4:hover' + // hover
'{background:' + pc.lightBluebg + '}' +
'li._2kA5V._26YU4:hover' + // hover active
'{background:' + pc.darkBluebg + '}' +
'li._2kA5V._26YU4' + // active text
'{color:' + pc.whitetext + '}' +
'li._26YU4 a' + // text
'{color:' + pc.text + '}' +
'li._26YU4:hover a' + // hover text
'{color:' + pc.whitetext + '}' +

// #################################################################
// ########################### profile #############################
// #################################################################

'._2MEyI .W547r,' + // name
'._2GU1P ._1SrQO ._1Cjfg' + // achievements title
'._1JLPg, ._3zECl' + // achievements text
'{color:' + pc.headers + '}' +

'._1eGKg,' + // sidebar language
'._2Cgve' + // sidebar other text
'{color:' + pc.text + '}' +

// #################################################################
// ########################### store ###############################
// #################################################################

// headers
'h4.MYxom,' +
'h4._2ibXl' +
'{color:' + pc.headers + '}' +

// text
'._1wcRC' +
'{color:' + pc.text + '}' +

// #################################################################
// ######################### podcast ###############################
// #################################################################

// background
'body#index section#content' +
'{background:' + pc.innerbg + '}' +

// title
'.duo-title' +
'{' + invert + '}' +

// subtitle
'.subtitle' +
'{color:' + pc.whitetext + '}' +

// text
'.entry-content p,' +
'.entry-content p a' + // also urls
'{color:' + pc.text + '}' +

// pagenumber
'.paginator' +
'{color:' + pc.text + '}' +

// end
'.nothing' +
'{}';

document.head.appendChild(sheet);

function checkSVG(){
	var loopDelay = 100;
	if (document.getElementById("goldRadial")){
		loopDelay = 3000;
	} else if (document.getElementsByClassName("_2xGPj").length > 0) {
		document.getElementsByClassName("_2xGPj")[0].getElementsByTagName("defs")[0].innerHTML += '<radialGradient id="goldRadial" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="rgb(255,176,84)"></stop><stop offset="80%" stop-color="rgb(255,176,84)"></stop><stop offset="85%" stop-color="rgb(50,50,50)"></stop><stop offset="95%" stop-color="rgb(50,50,50)"></stop><stop offset="100%" stop-color="rgb(255,176,84)"></stop></radialGradient><radialGradient id="grayRadial" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="rgb(75,75,75)"></stop><stop offset="90%" stop-color="rgb(75,75,75)"></stop><stop offset="100%" stop-color="rgb(90,90,90)"></stop></radialGradient>'

	}
	setTimeout(function(){
		checkSVG();
	}, loopDelay);
}

checkSVG();













// ask pos x and y.
(function lightAdjust(posX = 50, posY = 0){
	function lightModifier(x){
		return ((10 * x) - 5) / (4 + (12 * Math.abs(x - 0.5))) + 0.5;
	}
	var sunPosition = SunCalc.getTimes(new Date(), posX, posY);
	var now = new Date();
	var loopDelay = 1000;
	var sp1 = sunPosition.dawn,
		sp2 = sunPosition.sunriseEnd,
		sp3 = sunPosition.sunsetStart - 1800000,
		sp4 = sunPosition.dusk,
		dif1 = sp2 - sp1,
		dif2 = sp4 - sp3;
	var timeRatio = 0,
		darkRatio = 0;
	if (now > sp2 && now < sp3){
		darkRatio = 0;
		loopDelay = sp3 - now;
	} else if (now > sp4){
		var sp5 = new Date(sp1.getTime() + 86100000);
		darkRatio = 1;
		loopDelay = sp5 - now;
	} else if (now < (sp1 - 300000)){
		darkRatio = 1;
		loopDelay = sp1 - now;
	} else if (now > sp3 && now < sp4){
		darkRatio = 1 - lightModifier(((sp4 - now) / dif2));
	} else if (now > sp1 && now < sp2){
		darkRatio = lightModifier(((sp2 - now) / dif1));
	}
	console.log(darkRatio);
	console.log(loopDelay);
	setTimeout(function(){
		lightAdjust();
	}, loopDelay);
})();

// #############################################################
// #############################################################
// #############################################################
// #############################################################
// #############################################################

// #############################################################
// ####################### suncalc #############################
// #############################################################

// Github: https://github.com/mourner/suncalc/blob/master/LICENSE

// Copyright (c) 2014, Vladimir Agafonkin
// All rights reserved.

// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:

   // 1. Redistributions of source code must retain the above copyright notice, this list of
      // conditions and the following disclaimer.

   // 2. Redistributions in binary form must reproduce the above copyright notice, this list
      // of conditions and the following disclaimer in the documentation and/or other materials
      // provided with the distribution.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
// TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date and latitude/longitude

SunCalc.getTimes = function (date, lat, lng) {

    var lw = rad * -lng,
        phi = rad * lat,

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];

        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F),     // latitude
        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};


// export as Node module / AMD module / browser variable
if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = SunCalc;
else if (typeof define === 'function' && define.amd) define(SunCalc);
else window.SunCalc = SunCalc;

}());




