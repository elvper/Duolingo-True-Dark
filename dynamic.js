// to do
// - dropdown profile stories
// - keep wrong color in stories
// - cog icon for pages without the resource

var goBack;
var sunPosition = null;
var storedSettings;

(function constructHTML(){
	// create overlay for darkening
	var overlaydiv = document.createElement('div');
		overlaydiv.id = 'TurnDownLights';
	document.getElementsByTagName('body')[0].appendChild(overlaydiv);

	// settings pop-up html
	var settingsdiv = document.createElement('div');
		settingsdiv.id = 'TrueDarkSettings';

	// cog icon settings
	var cogdiv = document.createElement('div');
		cogdiv.id = "TDcog";
		cogdiv.className = "cCL9P";
		cogdiv.setAttribute("onmouseover", "javascript:void(document.getElementById('TDpop').className=(''),hidePop())");

	// settings popup window
	var popdiv = document.createElement('div');
		popdiv.id = "TDpop";
		popdiv.className = "hideEle";
		popdiv.innerHTML = '<div class="popExpl">Session brightness</div>' +
		'<input type="text" id="sessionDarknessValue" class="dv" disabled>' +
		'<input id="sessionDarkness" oninput="updateDarkness(this)" type="range" min="-70" max="70" value="0" class="dslider adj">' +
		
		'<div class="popExpl">Daytime brightness</div>' +
		'<input type="text" id="dayDarknessValue" class="dv" disabled>' +
		'<input id="dayDarkness" oninput="updateDarkness(this)" type="range" min="0" max="70" value="0" class="dslider">' +
		
		'<hr class="popSplit">' +
		
		'<div class="popExpl">Location for dynamic brightness</div>' +
		'<div class="locContainer">' +
		'<div class="popRef">Lat </div>' +
		'<input id="latitudeDarkness" type="text" class="geoLoc" oninput="updateDarkness(this)">' +
		'<div class="popRef">Long </div>' +
		'<input id="longitudeDarkness" type="text" class="geoLoc" oninput="updateDarkness(this)">' +
		'</div>' +
		
		'<div class="locContainer">' +
		'<input type="checkbox" class="popCheck" id="locationBasedDarkness" oninput="updateDarkness(this)">' +
		'<label for="locationBasedDarkness">Enable dynamic day-night brightness?</label>' +
		'</div>' +
		
		'<div class="popExpl">Nighttime brightness</div>' +
		'<input type="text" id="nightDarknessValue" class="dv" disabled>' +
		'<input id="nightDarkness" oninput="updateDarkness(this)" type="range" min="0" max="70" value="0" class="dslider">';
		
	// add settings html to the page
	settingsdiv.appendChild(cogdiv);
	settingsdiv.appendChild(popdiv);
	document.body.appendChild(settingsdiv);
})();

// return to normal settings after change
for (var i = 0; i < 3; i++) {
	document.getElementsByClassName("dslider")[i].addEventListener('mouseup', function() {
		// cancel previous call
		clearTimeout(goBack);
		
		// go back from preview to apply settings
		goBack = setTimeout(function(){
			initiateFuncs();
		}, 2000);
	});
};

// add the necessary functions to the page
(function elementFuncs(){
	// update settings to changes
	function updateDarkness(ele) {
		clearTimeout(updateSettings);
		updateSettings = setTimeout(function(){
			storeSettings();
		}, 2000);
		var sliders = document.getElementsByClassName("dslider"),
			applyNight = document.getElementById("locationBasedDarkness").checked;
			sessionVal = parseInt(sliders[0].value),
			dayVal = parseInt(sliders[1].value),
			nightVal = parseInt(sliders[2].value),
			[largeVal, smallVal] = dayVal > nightVal ?
				[dayVal, dayVal] : [nightVal, dayVal];
		if (ele.className == "dslider"){
			document.getElementById(ele.id + "Value").value = (100 - parseInt(ele.value)) + "%";
			document.getElementById("TurnDownLights").setAttribute("style", "background-color: rgba(0, 0, 0, " + (parseInt(ele.value) / 100) + ");");
				
			// set session adjustment range
			sliders[0].setAttribute("min", 0 - largeVal);
			sliders[0].setAttribute("max", 70 - smallVal);
			sliders[0].value = 0;
			document.getElementById(sliders[0].id + "Value").value = 0;
			newSetting.session = 0;
		};
		if (ele.id == "locationBasedDarkness"){
			newSetting[ele.id.replace("Darkness", "")] = ele.checked;
		} else {
			newSetting[ele.id.replace("Darkness", "")] = parseInt(ele.value);
		};
		if (ele.id == "sessionDarkness"){
			var eleVal = parseInt(ele.value) < 0 ? "+" + (-parseInt(ele.value)) : (-parseInt(ele.value));
			document.getElementById(ele.id + "Value").value = eleVal;
			document.getElementById("TurnDownLights").setAttribute("style", "background-color: rgba(0, 0, 0, " + ((dayVal + sessionVal) / 100) + ");");
			newSetting.sessionLast = new Date() - 0;
		};
	};

	// hide the settings menu
	function hidePop(){
		if (popOpen == 0){
			popOpen = 1;
			document.addEventListener("mousemove", setOpacity = function calcOpacity(e) {
				function removeListener(){
					storeSettings();
					document.getElementById("TDcog").setAttribute("style", "");
					popOpen = 0;
					document.removeEventListener("mousemove", setOpacity);
				};
				if (document.getElementById("TDpop").className == ""){
					document.getElementById("TDcog").setAttribute("style", "opacity:1;");
					var mouse = {},
						opacity = 1,
						ratio = 200,
						popEle = document.getElementById("TDpop"),
						ele = popEle.getBoundingClientRect();
					
					mouse.x = e.clientX;
					mouse.y = e.clientY;
					
					ele.xp = mouse.x < ele.left ?
						ele.left : mouse.x < ele.right ?
							mouse.x: ele.right;
					ele.yp = mouse.y > ele.bottom ?
						ele.bottom : mouse.y > ele.top ?
							mouse.y : ele.top;
							
					if (Math.abs(ele.xp - mouse.x) > opacity * ratio || Math.abs(ele.yp - mouse.y) > opacity * ratio){
						document.getElementById("TDpop").className = "hideEle";
						ele.opacity = opacity;
						popEle.setAttribute("style", "opacity:" + ele.opacity);
						removeListener();
					} else if (ele.xp == mouse.x && ele.yp == mouse.y){
						ele.opacity = opacity;
					} else if (ele.xp == mouse.x){
						ele.opacity = opacity - (Math.abs(ele.yp - mouse.y)/ratio);
					} else if (ele.yp == mouse.y){
						ele.opacity = opacity - (Math.abs(ele.xp - mouse.x)/ratio);
					} else {
						ele.opacity = opacity -	Math.sqrt((ele.xp - mouse.x) ** 2 + (ele.yp - mouse.y) ** 2) / ratio;
					};
					
					popEle.setAttribute("style", "opacity:" + ele.opacity);
				} else {
					removeListener();
					alert("event listener failed to stop #1");
				};
			});
		};
	};

	// save changes to the settings in local storage
	function storeSettings(){
		try {
			var interSS = JSON.parse(localStorage.getItem('TrueDarkSettings'));
			storedSettings = interSS ? interSS : {};
		} catch(err) {};
		
		newSetting.latitude = typeof newSetting.latitude != "number" ?
			null : newSetting.latitude > 90 ?
				null : newSetting.latitude < -90 ?
					null : newSetting.latitude;
		newSetting.longitude = typeof newSetting.longitude != "number" ?
			null : newSetting.longitude > 180 ?
				null : newSetting.longitude < -180 ?
					null : newSetting.longitude;
					
		var TDsettings = {};
			TDsettings.session = newSetting.session != null ?
				newSetting.session : storedSettings.session != null ?
					storedSettings.session : 0;
			TDsettings.sessionLast = newSetting.sessionLast != null ?
				newSetting.sessionLast : storedSettings.sessionLast != null ?
					storedSettings.sessionLast : 0;
			TDsettings.day = newSetting.day != null ?
				newSetting.day : storedSettings.day != null ?
					storedSettings.day : 0;
			TDsettings.night = newSetting.night != null ?
				newSetting.night : storedSettings.night != null ?
					storedSettings.night : 0;
			TDsettings.latitude = newSetting.latitude != null ?
				newSetting.latitude : storedSettings.latitude != null ?
					storedSettings.latitude : null;
			TDsettings.longitude = newSetting.longitude != null ?
				newSetting.longitude : storedSettings.longitude != null ?
					storedSettings.longitude : null;
			TDsettings.locationBased = newSetting.locationBased != null ?
				newSetting.locationBased : storedSettings.locationBased != null ?
					storedSettings.locationBased : false;
		
		localStorage.setItem('TrueDarkSettings', JSON.stringify(TDsettings));
	};

	// add element functions to the page
	var scriptEle = document.createElement('script');
		scriptEle.type = "text/javascript";
		scriptEle.appendChild(document.createTextNode(hidePop + updateDarkness + storeSettings + "var newSetting = {};newSetting.session = null;newSetting.sessionLast = null;newSetting.day = null;newSetting.night = null;newSetting.latitude = null;newSetting.longitude = null;newSetting.locationBased = null;var popOpen = 0;var goBack;var updateSettings;"));
	document.getElementsByTagName('head')[0].appendChild(scriptEle);
})();

// get stored settings
function initiateFuncs(){
	try {
		var interSS = JSON.parse(localStorage.getItem('TrueDarkSettings'));
		storedSettings = interSS ?
			interSS : {};
		interSS ?
			applySettings(storedSettings) : null;
	} catch(err) {};
}

// apply stored settings
function applySettings(as){
	var lightAdj = false;
	var dateNow = new Date() - 0;
	function setOverlay(){
		var applyAdj;
		if (dateNow - as.sessionLast < 21600000){
			applyAdj = (as.day + as.session) / 100;
		} else {
			applyAdj = as.day / 100;
		};
		document.getElementById("TurnDownLights").setAttribute("style", "background-color: rgba(0, 0, 0, " + applyAdj + ");");
	};
	document.getElementById("sessionDarknessValue").value = as.session < 0 ? "+" + (0 - as.session) : (0 - as.session);
	document.getElementById("sessionDarkness").value = as.session;
	document.getElementById("sessionDarkness").setAttribute("min", 0 - (as.day > as.night ? as.day : as.night));
	document.getElementById("sessionDarkness").setAttribute("max", 70 - as.day);
	document.getElementById("dayDarknessValue").value = (100 - as.day) + "%";
	document.getElementById("dayDarkness").value = as.day;
	document.getElementById("nightDarknessValue").value = (100 - as.night) + "%";
	document.getElementById("nightDarkness").value = as.night;
	document.getElementById("latitudeDarkness").value = as.latitude;
	document.getElementById("longitudeDarkness").value = as.longitude;
	document.getElementById("locationBasedDarkness").checked = as.locationBased ? true : false;
	setOverlay();
		
	sunPosition = sunPosition != null ?
		sunPosition : as.locationBased == true ?
			SunCalc.getTimes(new Date(), as.latitude, as.longitude) : null;
	
	sunPosition ?
		adjustActive ?
			null : lightAdj = true :
		null;
		
	console.log(sunPosition);
		
	if (lightAdj){
		console.log("cancelled timeout");
		clearTimeout(adjTimeout);
		lightAdjust(as);
	};
};

// apply ratio
function lightTransition(darkRatio, as){
	var darkRef;
	darkRef = (new Date().getTime() - as.sessionLast) < 21600000 ?
		(as.day + as.session) : as.day;
	if (as.night > as.day){
		var darkScale = as.night - as.day,
			newAdj = (darkRef + (darkScale * darkRatio))  / 100;
		if (newAdj > 0.7) newAdj = 0.7;
		document.getElementById("TurnDownLights").setAttribute("style", "background-color: rgba(0, 0, 0, " + newAdj + ");");
	};
};

// add the svg radial definitions
(function checkSVG(){
	var loopDelay = 1000;
	if (document.getElementById("goldRadial")){
		loopDelay = 3000;
	} else if (document.getElementsByClassName("_2xGPj").length > 0) {
		document.getElementsByClassName("_2xGPj")[0].getElementsByTagName("defs")[0].innerHTML += '<radialGradient id="goldRadial" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="rgb(255,176,84)"></stop><stop offset="80%" stop-color="rgb(255,176,84)"></stop><stop offset="85%" stop-color="rgb(50,50,50)"></stop><stop offset="95%" stop-color="rgb(50,50,50)"></stop><stop offset="100%" stop-color="rgb(255,176,84)"></stop></radialGradient><radialGradient id="grayRadial" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="rgb(75,75,75)"></stop><stop offset="90%" stop-color="rgb(75,75,75)"></stop><stop offset="100%" stop-color="rgb(90,90,90)"></stop></radialGradient>';
	};
	setTimeout(function(){
		checkSVG();
	}, loopDelay);
})();

// ask pos x and y.
var adjustActive = 0,
	adjTimeout;
function lightAdjust(as){
	adjustActive++;
	function lightModifier(x){
		return ((10 * x) - 5) / (4 + (12 * Math.abs(x - 0.5))) + 0.5;
	};
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
		var sp5 = sp1 + 86100000;
		darkRatio = 1;
		loopDelay = sp5 - now;
	} else if (now < (sp1 - 300000)){
		darkRatio = 1;
		loopDelay = sp1 - now;
	} else if (now > sp3 && now < sp4){
		darkRatio = 1 - lightModifier(((sp4 - now) / dif2));
	} else if (now > sp1 && now < sp2){
		darkRatio = lightModifier(((sp2 - now) / dif1));
	};
	loopDelay = loopDelay < 1000 ? 1000 : loopDelay;
	lightTransition(darkRatio, as);
	console.log("adjusting brightness, " + Math.round(darkRatio * 10000) / 100 + " % progression. Waiting " + loopDelay / 1000 + "s till next check");
	if (adjustActive > 1){
		adjustActive--;
	} else {
		adjustActive--;
		adjTimeout = setTimeout(function(){
			lightAdjust(as);
		}, loopDelay);
	};
};

// keep style last
(function toLast(){
	var headStyles = document.head.getElementsByTagName("style");
	if (headStyles[headStyles.length - 1].id != "TrueDarkStyle"){
		document.head.appendChild(document.getElementById("TrueDarkStyle"));
	};
	setTimeout(function(){
		toLast();
	}, 1000);
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

// #############################################################
// #############################################################
// #############################################################

initiateFuncs();
