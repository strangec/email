<script type="text/javascript">

// all code copyright jeff heuer 1999, 2000
// please give me credit if you use this code
// jeff@deconstructor.com
(function(){

	var text = '&hellip;&hellip;&hearts;&hearts;&hearts;&hearts;&bull;LIGHTFEATHER&bull;NET&bull;&hearts;&hearts;&hearts;&hearts;&hellip;&hellip;';

	var displaying = rotating = momentum = 0;
	var lasty, lastx, dy, dx, my, mx;
	var x = [];
	var y = [];
	var z = [];
	var i, scalar, color, rotating, momentum, dxs, dxc, dys, dyc, ztemp, rc, divs, tdivstyle;

	var addEvent = (function(){return window.addEventListener? function(el, ev, f){
			el.addEventListener(ev, f, false);
		}:window.attachEvent? function(el, ev, f){
			el.attachEvent('on' + ev, f);
		}:function(){return;};
	})();

	function init() {
		text = text.match(/(&[^;]{2,8};)|(.)/g);
		for (i = text.length - 1; i > -1; --i) {
			z[i] = Math.sin(i*.524 - 2.6) * 50;
			y[i] = Math.cos(i*.524 - 2.6) * 50;
			x[i] = (text.length * 5) - (i * 10);
		}

		setup();
		display();
		rc.style.top = (divs[0].offsetLeft - divs[divs.length - 1].offsetLeft) / 2 + Math.max(divs[0].offsetWidth, divs[0].offsetHeight) + 'px';

		window.setInterval(rotate, 20);

		addEvent(document, 'mousedown', down);
		addEvent(document, 'mousemove', move);
		addEvent(document, 'mouseup', up);
	}
	addEvent(window, 'load', init);

	function setup() {
		document.body.insertAdjacentHTML('beforeend', '<div id="rotatingcontainer" style="position: relative; margin: auto; width: 0px;"></div>');
		rc = document.getElementById('rotatingcontainer');

		for (i = text.length - 1; i > -1; --i) {
			rc.insertAdjacentHTML('beforeend', '<div style="position: absolute;">' + text[i] + '<\/div>');
		}

		divs = rc.getElementsByTagName('div');
		displaying = 1;
	}

	function down(evt) {
		evt = evt || event;
		rotating = 1;
		dy = dx = momentum = 0;
		evt.returnValue = false;
		if(evt.preventDefault){evt.preventDefault();}
		return false;
	}

	function move(evt) {
		evt = evt || event;
		dy = lasty - evt.clientY;
		dx = lastx - evt.clientX;
		lasty = evt.clientY;
		lastx = evt.clientX;
		return false;
	}

	function up() {
		rotating = 0;
		momentum = 1;
	}

	function rotate() {
		if (rotating) {
			transform(dy, dx);
			my = dy;
			mx = dx;
		} else if (momentum) {
			my *= 0.95;
			mx *= 0.95;
			transform(my, mx);
		}
		dy = dx = 0;
		display();
	}

	function transform(dx, dy) {
		dx *= .0175;
		dy *= .0175;

		for (i = x.length - 1; i > -1; --i) {
			dys = Math.sin(dy);
			dyc = Math.cos(dy);
			dxs = Math.sin(dx);
			dxc = Math.cos(dx);
			ztemp = z[i] * dyc - x[i] * dys;
			x[i] = z[i] * dys + x[i] * dyc;
			z[i] = y[i] * dxs + ztemp * dxc;
			y[i] = y[i] * dxc - ztemp * dxs;
		}
	}

	function display() {
		if (displaying) {
			for (i = x.length - 1; i > -1; --i) {
				scalar = (1.2 / ((z[i] * 1.2) / 500 + 1));

				tdivstyle = divs[i].style;
				tdivstyle.top = -y[i] * scalar + 'px';
				tdivstyle.left = x[i] * scalar + 'px';
				tdivstyle.color = scalar < 0.95? '#cccccc' : scalar < 1.2? '#999999' : scalar < 1.05? '#666666' : '#333333';
				tdivstyle.fontSize = 12 + (scalar - 1) / 0.035 + 'px';
			}
		}
	}
})();
</script>

<script type="text/javascript" src="menu.js"></script>
