(function(){

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
var pc = {};
pc.outerbg			= 	gray[4];
pc.innerbg			= 	gray[0];
pc.darkerbg			= 	gray[3];
pc.darkbg			=	gray[2];
pc.darkestbg		=	gray[1];
pc.darkBluebg		= 	"#256e92";
pc.lightBluebg		= 	"#1caff6";
pc.transparantbg	=	"rgba(0,0,0,0)";
pc.accent			= 	gray[8];
pc.headers			= 	gray[8];
pc.text				= 	gray[8];
pc.blacktext		= 	gray[0];
pc.whitetext		= 	gray[10];
pc.contrasttext		= 	"#ffb100";
pc.correct			= 	"green";
pc.wrong			= 	"red";
pc.skillcircle		= 	gray[3];
pc.carouselWidth	= 	2000;
pc.itemWidth		= 	1.2;
pc.translate		= 	(5000 / pc.carouselWidth) - (0.5 * pc.itemWidth);

var ex = {};
ex.position		= [ "flex-start"]; // default = center

var darkicons = {};
darkicons.crown = "data:image/svg+xml;utf8,<svg width='34' height='30' viewBox='0 0 34 30' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><path d='M1.49 4.538l6.632 2.365a1 1 0 0 0 1.16-.376L13.175.85a1 1 0 0 1 1.65 0l3.893 5.676a1 1 0 0 0 1.16.376l6.633-2.365a1 1 0 0 1 1.317 1.137l-3.484 17.52a1 1 0 0 1-.98.805H4.636a1 1 0 0 1-.98-.805L.172 5.675a1 1 0 0 1 1.316-1.137z' id='a'/></defs><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g><g><g><g transform='translate(3 3)'><mask id='b' fill='%23fff'><use xlink:href='%23a'/></mask><g><use fill='%23FFB500' fill-rule='evenodd' xlink:href='%23a'/><path stroke='%23000' stroke-width='3' d='M8.263 5.36L11.938.004a2.5 2.5 0 0 1 4.124 0l3.675 5.358 6.27-2.236A2.5 2.5 0 0 1 29.3 5.968l-3.484 17.52a2.5 2.5 0 0 1-2.452 2.012H4.637a2.5 2.5 0 0 1-2.452-2.012l-3.484-17.52a2.5 2.5 0 0 1 3.292-2.843l6.27 2.236z'/></g><path fill='%23FFCC29' opacity='.7' mask='url(%23b)' d='M8 0h6v25H8z'/></g></g></g></g></g></svg>";
darkicons.star = "data:image/svg+xml;utf8,<svg width='49' height='47' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><path d='M94.56 94.585l-10.267 5.311a2 2 0 0 1-2.89-2.12l1.953-11.201-8.241-7.905a2 2 0 0 1 1.101-3.423l11.42-1.633 5.137-10.242a2 2 0 0 1 3.575 0l5.137 10.242 11.42 1.633a2 2 0 0 1 1.101 3.423l-8.241 7.905 1.952 11.201a2 2 0 0 1-2.889 2.12L94.56 94.585z' id='a'/></defs><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g><g><g transform='translate(-70 -58)'><use fill='%23FFC800' fill-rule='evenodd' xlink:href='%23a'/><path stroke='%23000' stroke-width='4' d='M94.56 96.836l-9.348 4.837a4 4 0 0 1-5.779-4.24l1.77-10.152-7.473-7.168a4 4 0 0 1 2.203-6.846l10.384-1.485 4.668-9.307a4 4 0 0 1 7.15 0l4.669 9.307 10.384 1.485a4 4 0 0 1 2.202 6.846l-7.472 7.168 1.77 10.152a4 4 0 0 1-5.779 4.24l-9.349-4.837z'/></g></g></g></g></svg>";
darkicons.slider = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'><defs><linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' style='stop-color:rgb(255,255,255);stop-opacity:1'/><stop offset='10%' style='stop-color:rgb(255,255,255);stop-opacity:1'/><stop offset='90%' style='stop-color:rgb(0,0,0);stop-opacity:1'/><stop offset='100%' style='stop-color:rgb(0,0,0);stop-opacity:1'/></linearGradient></defs><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><ellipse xmlns='http://www.w3.org/2000/svg' stroke='%23000' ry='10' rx='10' id='svg_2' cy='12' cx='12' stroke-width='5' fill='%23fff'/><circle cx='12' cy='12' r='10' fill='url(%23grad1)'/></g></svg>";

var invert = 'filter: invert(1) hue-rotate(180deg);-webkit-filter: invert(1) hue-rotate(180deg);',
	invertBright = 'filter: invert(1) hue-rotate(180deg) brightness(200%);-webkit-filter: invert(1) hue-rotate(180deg) brightness(200%);',
	invertBright2 = 'filter: invert(1) hue-rotate(180deg) brightness(200%);-webkit-filter: invert(1) hue-rotate(180deg) brightness(300%);',
	invertBright4 = 'filter: invert(1) hue-rotate(180deg) brightness(800%);-webkit-filter: invert(1) hue-rotate(180deg) brightness(800%)';

// var carousel = {};
// carousel.items = ["_2Zhvi", "_1bxGV", "egA16", "_1V-iw", "_39mwD", "_3Z4AA", "_1ceyl", "_1A-DM", "_2NEYB", "xUhKc", "_2-Fht", "VOhoZ", "GUh7N", "_22b6y", "_3tlqI", "_3c5uV", "_1ubw5", "_1iUq9"];
// carousel.opacity = [1, 0.7, 0.2, 0];
// carousel.speed = 1;

var carouselCSS = "";
// for (i = 0; i < 10; i++) {
	// var ia = "." + carousel.items[i],
		// ib = ' ._1iUq9:nth-of-type(',
		// ic = '){opacity:',
		// id = pc.translate - (i * pc.itemWidth),
		// ie = ';transition: opacity ' + carousel.speed + 's;}';
    // var iCSS = ia;
	// iCSS += '{-webkit-transform: translateX(' + id + '%);-ms-transform: translateX(' + id + '%);transform: translateX(' + id + '%);}';
	// iCSS += ia + ib + (i + 1) + ic + carousel.opacity[0] + ie;		// current item
	// iCSS += i > 0 ?
		// ia + ib + i + ic + carousel.opacity[1] + ie : "";			// previous item
	// iCSS += ia + ib + (i + 2) + ic + carousel.opacity[1] + ie;		// next item
	// iCSS += i > 1 ?
		// ia + ib + (i - 1) + ic + carousel.opacity[2] + ie : "";	// in front of previous item
	// iCSS += ia + ib + (i + 3) + ic + carousel.opacity[2] + ie;		// next after next item
	// iCSS += ia + ' ._1iUq9{opacity:' + carousel.opacity[3] + ie;	// others
	// carouselCSS += iCSS;
// };

var sheet = document.createElement('style');
sheet.id = "TrueDarkStyle";
sheetCSS = 'body{background: black}' +
'#TurnDownLights' +
'{position:fixed;width:100%;height:100%;background-color:rgba(0, 0, 0, 0);top:0;left:0;z-index:9000;pointer-events:none;transition: background-color 1s;}' +

'#TrueDarkSettings' +
'{position: fixed;top: -5px;right: -5px;z-index: 9001;color:' + pc.whitetext + ';}' +

'#TDcog' +
'{background-position: -147px -70px;height: 20px;width: 20px;cursor: pointer;-moz-transform: scale(1.5);-ms-transform: scale(1.5);-o-transform: scale(1.5);-webkit-transform: scale(1.5);transform: scale(1.5);float: right;opacity: 0.8;}' +

'#TDcog:hover' +
'{opacity:1}' +

'#TDpop' +
'{width:360px;height:auto;min-height:330px;position:absolute;background:' + pc.innerbg + ';top:10px;right:10px;opacity:1;border-radius:20px;border-style: solid;border-color: gray;z-index:300;}' +

'.hideEle' +
'{display: none;}' +

'.dslider' + // darkness slider
'{width:80%;margin-left:10px;-webkit-appearance:none;appearance:none;background:rgb(200,200,200);transition:opacity .2s;-webkit-transition:.2s;height:7px;opacity:1;display: inline;}' +
'.dslider::-webkit-slider-thumb' +
'{-webkit-appearance:none;appearance:none;width:25px;height:25px;background:url("' + darkicons.slider + '");cursor:pointer;border:0}' +
'.dslider::-moz-range-thumb' +
'{-webkit-appearance:none;appearance:none;width:25px;height:25px;background:("' + darkicons.slider + '");cursor:pointer;border:0}' +
'.dslider:hover' +
'{background:rgb(210,210,210);}' +

'.popExpl' +
'{text-align:center;width:100%;margin-top:10px;margin-bottom:5px;}' +

'.dv' +
'{display:inline;margin-left:10px;margin-top: 1px;float:left;width:30px;height:20px;text-align:right;border:none;background:' + pc.innerbg + ';color:' + pc.whitetext + '}' +

'.geoLoc' +
'{width: 75px;display: inline;text-align: center;background:' + pc.darkbg + ';color:' + pc.whitetext + '}' +

'.popRef' +
'{display: inline;margin-left: 15px;margin-right: 5px;}' +

'.locContainer' +
'{text-align: center;}' +

'input[type=checkbox].popCheck' +
'{-webkit-appearance: checkbox;top: 5px;margin-right: 5px;margin-top: 10px;}' +

'hr.popSplit' +
'{margin: 25px 0;}' +

// don't display dropdowns if settings window is open
//'ul._3q7Wh.OSaWc._2HujR._1ZY-H' +
//'{display: none;}' +
//'ul._20LC5._2HujR._1ZY-H' +
//'{display: none;}' +

// ##### topbar #####
'._6t5Uh{opacity:.9}' +
// -webkit-filter:brightness(.9);filter:brightness(.9);

// #################################################################
// ############################### main ############################
// #################################################################

// ##### background #####
	// main background
'.LFfrA._3MLiB,' +
'div[id=root],' + // front page
'html[dir=ltr]' + // topspace
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
'{background-image: url("' + darkicons.crown + '");background-repeat: no-repeat;background-size: 100%;background-position: center;padding: 43px 43px 0 0;overflow: hidden;}' +
//'{content: url("' + darkicons.crown + '");}' +

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
'._3q7Wh.OSaWc._2HujR._1ZY-H,' +
'.PfiUE._3EXnD' + // forum drops
'{background:' + pc.innerbg + '}' +

	// dropdown icon
'._20LC5:after,' + // icon user dropdown
'._2HujR:after,' + // icon language dropdown
'span.EBhnz._3i3xv' + // forum icon
'{' + invert + '}' +

	// active bacground
'._1oVFS._2kNgI._1qBnH{background: ' + pc.outerbg + ';}' +

	// text
'._2kNgI._1qBnH,' +
'._2uBp_._1qBnH,' +
'._3sWvR,' +
'._1fA14,' +
'a._23Nu6.jTtG3 span,' + // forum language
'._2-0SI' + // forum profile
'{color:' + pc.text + '}' +

	// separation line
'.qsrrc{border-top: 2px solid ' + pc.outerbg + ';}' +

	// hover dropdown
'._1fA14:hover,' +
'._2kNgI._1qBnH:hover > ._1fA14,' +
'._2kNgI._1qBnH:hover,' +
'._2uBp_._1qBnH:hover,' +
'._3sWvR:hover,' +
'._23Nu6:hover span,' + // forum language
'._3Utz6:hover span' + // forum profile
'{color: ' + pc.whitetext + ' !important;}' +

// #################################################################
// ########################### exercises ###########################
// #################################################################

	// introduction window
'._3giip' + // main bg
'{background:radial-gradient(farthest-corner at 50% 40%, ' + pc.innerbg + ', ' + pc.darkestbg + ', ' + pc.darkbg + ', ' + pc.darkerbg + ')}' +
'._1SfYc._1qCW5,' + // sort exercise question
'._2T9b4' + // sort exercise lines
'{background:' + pc.transparantbg + '}' +
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
'{color:' + pc.contrasttext + ';font-weight: 700;}' +

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
'._2GNNM._3F380 .a-Y8L span' + // selected
'{color: rgb(0,0,0);font-weight: 900;}' +

	// header
'._1Zqmf' +
'{color:' + pc.headers + '}' +

	// choice exercise
'._3EaeX' + // text and background
'{color:' + pc.whitetext + ';background:' + pc.transparant + '}' +
'._1-PLN ._3EaeX,' + // selected background text
'._1-PLN' + // selected bar
'{background:' + pc.darkBluebg + '}' +

	// missing word selection
'._386Rr' + // text
'{color:' + pc.whitetext + '}' +

	// object name
'._1XKSx > input' +
'{background:' + pc.innerbg + ';color:' + pc.text + '}' +

	// wrong selected
'.challenge .challenge-answers li.grade-incorrect' +
'{background:' + pc.wrong + '}' +

	// exercise end carousel
// '._2HMBY' + // container
// '{width: ' + pc.carouselWidth + '%}' +
// '._1iUq9' + // carousel item
// '{width:' + pc.itemWidth + '%;opacity:' + carousel.opacity[1] + ';}' +
// '._20PKJ' + // stories text
// '{color:' + pc.whitetext + '}' +

	// report text
'._3A0q- span' +
'{color:' + pc.whitetext + '}' +

// #################################################################
// ########################### tips pages ##########################
// #################################################################

// headers
'h2._21sXl' +
'{color:' + pc.headertext + '}' +

// all tips text
'._3Fb9m._2f1i5 p,' +
'._3Fb9m._2f1i5 li,' +
'._3Fb9m._2f1i5 td' +
'{color:' + pc.text + ' !important}' +

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
'.K4oWn.slg8x,' +
'.K4oWn.slg8x ._7SUuD:hover' +
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

	// new post
'.Q3ue-._2yvtl.gFN2J,' + // title
'.dVGCn._2yvtl.gFN2J' + // content
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
'{background-image: url("' + darkicons.star + '");}' +

// story complete icon
'.story-circle-illustration.complete' +
'{' + invert + '}' +

// update message
'.home-page-notification' +
'{color:' + pc.text + '}' +

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
'.xxxxxxxxxxxxxxxxxxx' + // wrong checkbox
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

// completed all stories message
'.completed-all-sets-notification h2, .completed-all-sets-notification p' +
'{color:' + pc.whitetext + '}' +

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
'._2GU1P ._1SrQO ._1Cjfg,' + // achievements title
'._1JLPg,' +
'._3zECl' + // achievements text
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

// #################################################################
// ####################### carousel CSS ############################
// #################################################################
carouselCSS;

var styleList = document.createTextNode(sheetCSS);
sheet.appendChild(styleList);

// try adding the css as soon as head exists
var attempt = 0;
function tryQuick(){
	try {
		document.head.appendChild(sheet);
		console.log("attempt quick " + attempt++);
	} catch(err) {
		setTimeout(function(){
			tryQuick();
		}, 10);
	};
};
tryQuick();

})();