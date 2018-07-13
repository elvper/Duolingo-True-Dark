var startBlack = document.createElement('style')
startBlack.innerHTML = 'body{background: black}.LFfrA._3MLiB,div[id=root],html[dir=ltr]{background:rgb(100,100,100)}._2hEQd._1E3L7,._1E3L7,.a5SW0,._1H-7I._2GJb6._1--zr{background:rgb(0,0,0)}';
var attempt = 0;

function tryQuick(){
	try {
		document.head.appendChild(startBlack);
		console.log("attempt quick " + attempt++);
	} catch(err) {
		setTimeout(function(){
			tryQuick();
		}, 1);
	};
};
tryQuick();
