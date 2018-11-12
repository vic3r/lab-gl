// Code by Kevin Cabrera and Victor Garcia
// Architecture based on the Bjorn Sandvik - thematicmapping.org

(function () {
	let webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	 	var width  = window.innerWidth,
		height = window.innerHeight;

	// Earth params
		var radius   = 1,
		segments = 32,
		rotation = 6;

		// Stars
		var radiusGalaxy  = 300;
		var radiusMercury = .4;
		var radiusVenus   = .948;
		var radiusMars    = .53;
		var radiusJupiter = 11;
		var radiusSaturn  = 9;
		var radiusUranus  = 4;
		var radiusNeptune = 4;
		var radiusSun 		= 109;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 10.5;

	let renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	let light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(-100,0,0);
	scene.add(light);

	//SUN
	var sun = createSun(radiusSun, segments);
	sun.translateX(-200);
	sun.translateY(-10);
	sun.name = "Sun";
	sun.callback = sunClickHandler;
	scene.add(sun);

 // 'FREDDIE' MERCURY
	var mercury = createMercury(radiusMercury, segments);
	mercury.rotation.y = rotation;
	mercury.translateX(-48.569);
	mercury.name = "Mercury";
	mercury.callback = mercuryClickHandler;
	scene.add(mercury);

	// VENUS
	var venus = createVenus(radiusVenus, segments);
	venus.rotation.y = rotation;
	venus.translateX(-30.112);
	venus.name = "Venus";
	venus.callback = venusClickHandler;
	scene.add(venus);

	// EARTH
	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	sphere.translateX(0);
	sphere.name = "Earth";
	sphere.callback = earthClickHandler;
	scene.add(sphere);

	// MARS
	var mars = createMars(radiusMars, segments);
	mars.rotation.y = rotation;
	mars.translateX(21.87);
	mars.name = "Mars";
	mars.callback = marsClickHandler;
	scene.add(mars);

	// JUPITER
	var jupiter = createJupiter(radiusJupiter, segments);
	jupiter.rotation.y = rotation;
	jupiter.translateX(100);
	jupiter.name = "Jupiter";
	jupiter.callback = jupiterClickHandler;
	scene.add(jupiter);

	// Saturn ring
	var saturnRing = new THREE.RingGeometry(11.5, 15.5, 24 );
	var material = new THREE.MeshBasicMaterial( {
		side: THREE.DoubleSide,
		map:         THREE.ImageUtils.loadTexture('images/saturnringcolor.jpg'),
		bumpMap:     THREE.ImageUtils.loadTexture('images/saturnringpattern.gif'),
		bumpScale:   0.005
	} );

	var saturnRingMesh = new THREE.Mesh( saturnRing, material );
	saturnRingMesh.rotation.x=(1.37); // angle rotation in radians
	saturnRingMesh.translateX(142);
	saturnRingMesh.translateZ(7);
	saturnRingMesh.translateY(41.5);
	scene.add(saturnRingMesh);

	// SATURN
	var saturn = createSaturn(radiusSaturn, segments);
	saturn.rotation.y = rotation;
	saturn.translateX(149);
	saturn.name = "Saturn";
	saturn.callback = saturnClickHandler;
	scene.add(saturn);

	// URANUS
	var uranus = createUranus(radiusUranus, segments);
	uranus.rotation.y = rotation;
	uranus.translateX(180);
	uranus.name = "Uranus";
	uranus.callback = uranusClickHandler;
	scene.add(uranus);

	// Uranus ring
	var uranusRing = new THREE.RingGeometry(5.3, 5.5, 24 );
	var material = new THREE.MeshBasicMaterial( {
		side:        THREE.DoubleSide,
		map:         THREE.ImageUtils.loadTexture('images/uranusringcolour.jpg'),
		bumpMap:     THREE.ImageUtils.loadTexture('images/uranusringstrans.gif'),
	} );

	var uranusRingMesh = new THREE.Mesh(uranusRing, material);
	uranusRingMesh.translateX(172.7);
	uranusRingMesh.translateZ(50);
	scene.add(uranusRingMesh);

	// NEPTUNE
	var neptune = createNeptune(radiusNeptune, segments);
	neptune.rotation.y = rotation;
	neptune.translateX(210);
	neptune.name = "Neptune";
	neptune.callback = neptuneClickHandler;
	scene.add(neptune);

	// CLOUDS EARTH
  var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	scene.add(clouds)

	// STARS
	var stars = createStars(90, 64);
	scene.add(stars);

	let controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y  += 0.0005;
		clouds.rotation.y  += 0.0005;
		mercury.rotation.y += 0.0000852;
		venus.rotation.y   -= 0.000005;
		mars.rotation.y    += 0.000513889;
		jupiter.rotation.y += 0.000487805;
		uranus.rotation.y  += 0.00120919;
		neptune.rotation.y -= 0.00112605;
		saturn.rotation.y  += 0.00069606;
		sun.rotation.y     += 0.000744849;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map        :     THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
				bumpMap    :     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale  :     0.005,
				specularMap:     THREE.ImageUtils.loadTexture('images/water_4k.png')
			})
		);
	}

	function createMercury(radiusMercury, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusMercury, segments, segments),
			new THREE.MeshPhongMaterial({
				map      :   THREE.ImageUtils.loadTexture('images/mercurymap.jpg'),
				bumpMap  :   THREE.ImageUtils.loadTexture('images/mercurybump.jpg'),
				bumpScale:   0.005,
				specular :   new THREE.Color('gray')
			})
		);
	}

	function createVenus(radiusVenus, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusVenus, segments, segments),
			new THREE.MeshPhongMaterial({
				map      :     THREE.ImageUtils.loadTexture('images/venusmap.jpg'),
				bumpMap  :     THREE.ImageUtils.loadTexture('images/venusbump.jpg'),
				bumpScale:     0.005,
				specular :     new THREE.Color('orange')
			})
		);
	}

	function createMars(radiusMars, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusMars, segments, segments),
			new THREE.MeshPhongMaterial({
				map      :     THREE.ImageUtils.loadTexture('images/marsmap.jpg'),
				bumpMap  :     THREE.ImageUtils.loadTexture('images/marsbump.jpg'),
				bumpScale:    0.005
			})
		);
	}

	function createJupiter(radiusJupiter, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusJupiter, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture('images/jupitermap.jpg')
			})
		);
	}

	function createUranus(radiusUranus, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusUranus, segments, segments),
			new THREE.MeshPhongMaterial({
				map			:    THREE.ImageUtils.loadTexture('images/uranusmap.jpg'),
				bumpMap	:    THREE.ImageUtils.loadTexture('images/uranusbump.jpg'),
				bumpScale:   0.005
			})
		);
	}

	function createSaturn(radiusSaturn, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusSaturn, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture('images/saturnmap.jpg')
			})
		);
	}

	function createNeptune(radiusNeptune, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusNeptune, segments, segments),
			new THREE.MeshPhongMaterial({
				map			:    THREE.ImageUtils.loadTexture('images/neptunemap.jpg'),
				bumpMap	:    THREE.ImageUtils.loadTexture('images/neptunebump.jpg'),
				bumpScale:   0.005
			})
		);
	}

	function createSun(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map			 :   THREE.ImageUtils.loadTexture('images/sunmap.jpg'),
				bumpScale:   0.7
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
				map				 : THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusGalaxy, segments, segments),
			new THREE.MeshBasicMaterial({
				map :  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
				side:  THREE.BackSide
			})
		);
	}

	let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
    function onDocumentMouseDown(event) {
        event.preventDefault();

        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y =  - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        meshObjects = [sun, mercury, venus, sphere, mars, jupiter, saturn, uranus, neptune];
				let intersects = raycaster.intersectObjects(meshObjects);
				intersects.forEach((intersect) => {intersect.object.callback()});
		}

		function sunClickHandler() {
			console.log("Sun");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			x.innerHTML = "Sol";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function mercuryClickHandler() {
			console.log("Mercury");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");
			x.innerHTML = "Mercurio";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function venusClickHandler() {
			console.log("Venus");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");
			x.innerHTML = "Venus";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function earthClickHandler() {
			console.log("Earth");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");
			x.innerHTML = "Tierra";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function marsClickHandler() {
			console.log("Mars");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");
			x.innerHTML = "Marte";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function jupiterClickHandler() {
			console.log("Jupiter");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
		  var x = document.getElementById("planet-name");
			x.innerHTML = "Jupiter";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function uranusClickHandler() {
			console.log("Uranus");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");   // Get the element with id="demo"
			x.innerHTML = "Urano";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function saturnClickHandler() {
			console.log("Saturn");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");   // Get the element with id="demo"
			x.innerHTML = "Saturno";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

		function neptuneClickHandler() {
			console.log("Neptune");
			var x = document.getElementById("planet-name");
			var xsize = document.getElementById("tSize");
			var xmass = document.getElementById("tMass");
			var xgravity = document.getElementById("tGravity");
			var xmoon = document.getElementById("tMoon");
			var xstar = document.getElementById("tStar");
			var xphase = document.getElementById("tPhase");
			var xorder = document.getElementById("tSunOrder");
			var xsundis = document.getElementById("tSunDistance");
			var xearthdis = document.getElementById("tEarthDistance");
			var x = document.getElementById("planet-name");   // Get the element with id="demo"
			x.innerHTML = "Neptuno";
			xsize.innerHTML=1;
			xmass.innerHTML=1;
			xgravity.innerHTML=1;
			xmoon.innerHTML=1;
			xstar.innerHTML=1;
			xphase.innerHTML=1;
			xorder.innerHTML=1;
			xsundis.innerHTML=1;
			xearthdis.innerHTML=1;
		}

	webglEl.addEventListener('mousedown', onDocumentMouseDown, false);

}());
