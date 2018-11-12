// Code by Kevin Cabrera and Victor Garcia
// Architecture based on the Bjorn Sandvik - thematicmapping.org

(function () {

	var webglEl = document.getElementById('webgl');

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
		var radiusGalaxy = 300;
		var radiusMercury = .4;
		var radiusVenus = .948;
		var radiusMars = .53;
		var radiusJupiter = 11;
		var radiusSaturn = 9;
		var radiusUranus = 4;
		var radiusNeptune = 4;
		var radiusSun = 109;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 10.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(-100,0,0);
	scene.add(light);

	//SUN
	var sun = createSun(radiusSun, segments);
	sun.translateX(-200);
	scene.add(sun);

 // 'FREDDIE' MERCURY
	var mercury = createMercury(radiusMercury, segments);
	mercury.rotation.y = rotation;
	mercury.translateX(-70);
	scene.add(mercury);

	// VENUS
	var venus = createVenus(radiusVenus, segments);
	venus.rotation.y = rotation;
	venus.translateX(-30);
	scene.add(venus);

	// EARTH
	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	sphere.translateX(0);
	scene.add(sphere);

	// MARS
	var mars = createMars(radiusMars, segments);
	mars.rotation.y = rotation;
	mars.translateX(20);
	scene.add(mars);

	// JUPITER
	var jupiter = createJupiter(radiusJupiter, segments);
	jupiter.rotation.y = rotation;
	jupiter.translateX(50);
	scene.add(jupiter);

	// Saturn ring
	var saturnRing = new THREE.RingGeometry(11.5, 13.5, 24 );
	var material = new THREE.MeshBasicMaterial( {
		side: THREE.DoubleSide,
		map:         THREE.ImageUtils.loadTexture('images/saturnringcolor.jpg'),
		bumpMap:     THREE.ImageUtils.loadTexture('images/saturnringpattern.jpg'),
		bumpScale:   0.005
	} );
	var saturnRingMesh = new THREE.Mesh( saturnRing, material );
	saturnRingMesh.rotation.x=(1.3701);
	saturnRingMesh.translateX(67.5);
	saturnRingMesh.translateZ(4.5);
	saturnRingMesh.translateY(20)
	scene.add( saturnRingMesh );

	// SATURN
	var saturn = createSaturn(radiusSaturn, segments);
	saturn.rotation.y = rotation;
	saturn.translateX(70);
	scene.add(saturn);

	// URANUS
	var uranus = createUranus(radiusUranus, segments);
	uranus.rotation.y = rotation;
	uranus.translateX(90);
	scene.add(uranus);

	// NEPTUNE
	var neptune = createNeptune(radiusNeptune, segments);
	neptune.rotation.y = rotation;
	neptune.translateX(100);
	scene.add(neptune);

	// CLOUDS EARTH
  var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	scene.add(clouds)

	// STARS
	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.0005;
		mercury.rotation.y +=0.0005;
		venus.rotation.y +=0.0005;
		mars.rotation.y +=0.0005;
		jupiter.rotation.y +=0.0005;
		uranus.rotation.y +=0.0005;
		neptune.rotation.y +=0.0005;
		saturn.rotation.y +=0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')
			})
		);
	}

	function createMercury(radiusMercury, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusMercury, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/mercurymap.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/mercurybump.jpg'),
				bumpScale:   0.005,
				specular:    new THREE.Color('gray')
			})
		);
	}

	function createVenus(radiusVenus, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusVenus, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/venusmap.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/venusbump.jpg'),
				bumpScale:   0.005,
				specular:    new THREE.Color('orange')
			})
		);
	}

	function createMars(radiusMars, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusMars, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/marsmap.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/marsbump.jpg'),
				bumpScale:   0.005,
				specular:    new THREE.Color('red')
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
				map:         THREE.ImageUtils.loadTexture('images/uranusmap.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/uranusbump.jpg'),
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
				map:         THREE.ImageUtils.loadTexture('images/neptunemap.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/neptunebump.jpg'),
				bumpScale:   0.005
			})
		);
	}

	function createSun(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map:         THREE.ImageUtils.loadTexture('images/sunmap.jpg'),
				bumpScale:   0.7,
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radiusGalaxy, segments, segments),
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
				side: THREE.BackSide
			})
		);
	}

}());
