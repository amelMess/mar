/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([ "myJS/ThreeRenderingEnv.js", 
			                              "myJS/ThreeLightingEnv.js", 
			                              "myJS/ThreeLoadingEnv.js", 
			                              "myJS/navZ.js",
			                              "FlyingVehicle.js"]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

function start(){
	//	----------------------------------------------------------------------------
	//	MAR 2014 - nav test
	//	author(s) : Cozot, R. and Lamarche, F.
	//	date : 11/16/2014
	//	last : 11/25/2014
	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	//	keyPressed
	var currentlyPressedKeys = {};
	
	// car Position
	var CARx = -220; 
	var CARy = 0 ; 
	var CARz = 0 ;
	var CARtheta = 0 ; 
	// car speed
	//var dt = 0.05; 
	//var dx = 1.0;
	var cameraMode = 0;
	// Creates the vehicle (handled by physics)
	var vehicle = new FlyingVehicle(
			{
				position: new THREE.Vector3(CARx, CARy, CARz),
				zAngle : CARtheta+Math.PI/2.0,
				firstPlaneName: 'p02',
				lastPlaneName: 'p01'
			}
			) ;


	//	rendering env
	var RC =  new ThreeRenderingEnv();

	
	// tableau des cameras
	var tabCameras = new Array(4);
	
	for(var i=0;i< 4;i++){
		var camera =new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 5000 ); 
		tabCameras[i]=camera;
		tabCameras.push(camera);
	}

	
	
 	      
			 
 	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',RC,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	RC.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	RC.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',RC.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	RC.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	RC.scene,'decors',	-340,-340,0,'front');
		


	//	Car
	// car Translation
	var car0 = new THREE.Object3D(); 
	car0.name = 'car0'; 
	RC.addToScene(car0); 
	// initial POS
	car0.position.x = CARx;
	car0.position.y = CARy;
	car0.position.z = CARz;
	// car Rotation floor slope follow
	var car1 = new THREE.Object3D(); 
	car1.name = 'car1';
	car0.add(car1);
	// car vertical rotation
	var car2 = new THREE.Object3D(); 
	car2.name = 'car2';
	car1.add(car2);
	car2.rotation.z = CARtheta ;
	// the car itself 
	// simple method to load an object
	var car3 = Loader.load({filename: 'assets/car_Zup_01.obj', node: car2, name: 'car3'}) ;
	//car3.position.z= +0.25 ;
	// attach the scene camera to car
	car3.add(RC.camera) ;
	/*RC.camera.position.x = 0.0 ;
	RC.camera.position.z = 10.0 ;
	RC.camera.position.y = -25.0 ;
	RC.camera.rotation.x = 85.0*3.14159/180.0 ;*/
	

	
			
	//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', RC.scene, 'sky',4000);



	//	Planes Set for Navigation 
	// 	z up 
	var NAV = new navPlaneSet(
					new navPlane('p01',	-260, -180,	 -80, 120,	+0,+0,'px')); 		// 01	
	NAV.addPlane(	new navPlane('p02', -260, -180,	 120, 200,	+0,+20,'py')); 		// 02		
	NAV.addPlane(	new navPlane('p03', -260, -240,	 200, 240,	+20,+20,'px')); 	// 03		
	NAV.addPlane(	new navPlane('p04', -240, -160,  200, 260,	+20,+20,'px')); 	// 04		
	NAV.addPlane(	new navPlane('p05', -160,  -80,  200, 260,	+20,+40,'px')); 	// 05		
	NAV.addPlane(	new navPlane('p06',  -80, -20,   200, 260,	+40,+60,'px')); 	// 06		
	NAV.addPlane(	new navPlane('p07',  -20,  +40,  140, 260,	+60,+60,'px')); 	// 07		
	NAV.addPlane(	new navPlane('p08',    0,  +80,  100, 140,	+60,+60,'px')); 	// 08		
	NAV.addPlane(	new navPlane('p09',   20, +100,   60, 100,	+60,+60,'px')); 	// 09		
	NAV.addPlane(	new navPlane('p10',   40, +100,   40,  60,	+60,+60,'px')); 	// 10		
	NAV.addPlane(	new navPlane('p11',  100,  180,   40, 100,	+40,+60,'nx')); 	// 11		
	NAV.addPlane(	new navPlane('p12',  180,  240,   40,  80,	+40,+40,'px')); 	// 12		
	NAV.addPlane(	new navPlane('p13',  180,  240,    0,  40,	+20,+40,'py')); 	// 13 		
	NAV.addPlane(	new navPlane('p14',  200,  260,  -80,   0,	+0,+20,'py')); 		// 14		
	NAV.addPlane(	new navPlane('p15',  180,  240, -160, -80,	+0,+40,'ny')); 		// 15		
	NAV.addPlane(	new navPlane('p16',  160,  220, -220,-160,	+40,+40,'px')); 	// 16	
	NAV.addPlane(	new navPlane('p17',   80,  160, -240,-180,	+40,+40,'px')); 	// 17	
	NAV.addPlane(	new navPlane('p18',   20,   80, -220,-180,	+40,+40,'px')); 	// 18	
	NAV.addPlane(	new navPlane('p19',   20,   80, -180,-140,	+40,+60,'py')); 	// 19	
	NAV.addPlane(	new navPlane('p20',   20,   80, -140,-100,	+60,+80,'py')); 	// 20	
	NAV.addPlane(	new navPlane('p21',   20,   60, -100, -40,	+80,+80,'px')); 	// 21		
	NAV.addPlane(	new navPlane('p22',  -80,   20, -100, -40,	+80,+80,'px')); 	// 22		
	NAV.addPlane(	new navPlane('p23', -140,  -80, -100, -40,	+80,+80,'px')); 	// 23		
	NAV.addPlane(	new navPlane('p24', -140,  -80, -140,-100,	+60,+80,'py')); 	// 24		
	NAV.addPlane(	new navPlane('p25', -140,  -80, -200,-140,	+40,+60,'py')); 	// 25		
	NAV.addPlane(	new navPlane('p26', -100,  -80, -240,-200,	+40,+40,'px')); 	// 26		
	NAV.addPlane(	new navPlane('p27', -220, -100, -260,-200,	+40,+40,'px')); 	// 27	
	NAV.addPlane(	new navPlane('p28', -240, -220, -240,-200,	+40,+40,'px')); 	// 28	
	NAV.addPlane(	new navPlane('p29', -240, -180, -200,-140,	+20,+40,'ny')); 	// 29	
	NAV.addPlane(	new navPlane('p30', -240, -180, -140, -80,	+0,+20,'ny')); 		// 30			
	NAV.setPos(CARx,CARy,CARz); 
	NAV.initActive();
	// DEBUG
	//NAV.debug();
	//var navMesh = NAV.toMesh();
	//RC.addToScene(navMesh);
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;					

	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {
		if (currentlyPressedKeys[80]) // (P) camera
		{
			cameraMode = (cameraMode+1)%3;
		}
		currentlyPressedKeys[event.keyCode] = false;
	}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			RC.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		if (currentlyPressedKeys[68]) // (D) Right
		{
			vehicle.turnRight(1000) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			vehicle.turnLeft(1000) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			vehicle.goFront(1200, 1200) ;
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			vehicle.brake(100) ;
		}
		

	}


	  // Lap display
	var maxLap = 3;
	var lapDisplay = document.createElement('div');
	lapDisplay.style.position = 'absolute';
	lapDisplay.style.top = 10 + 'px';
	lapDisplay.style.right = 10 + 'px';
	lapDisplay.style.width = 100;
	lapDisplay.style.height = 80;
	lapDisplay.style.padding = "10px";
	lapDisplay.style.backgroundColor = "rgba(0,0,0,0.5)";
	lapDisplay.style.color = "white";
	lapDisplay.style.textAlign = "center";
	lapDisplay.style.fontSize = "30px";
	lapDisplay.style.fontFamily = "Ubuntu Medium, FreeSans, Trebuchet MS, sans-serif";
	document.body.appendChild(lapDisplay);
	
	var updateLapDisplay = function() {
		if (vehicle.lapNumber < maxLap) {
			lapDisplay.innerHTML = "Lap "+vehicle.lapNumber+"/"+maxLap;
		} else if (vehicle.lapNumber == maxLap) {
			lapDisplay.innerHTML = "Last lap";
		} else {
			lapDisplay.innerHTML = "You win !";
			
			if (!vehicle.endDate) {
				vehicle.endDate = new Date();
			}
		}
	};

	updateLapDisplay();

	 // Time display
	/*var timeDisplay = document.createElement('div');
	timeDisplay.style.position = 'absolute';
	timeDisplay.style.top = 10 + 'px';
	timeDisplay.style.left = 10 + 'px';
	timeDisplay.style.right = null;
	timeDisplay.style.width = 200;
	timeDisplay.style.height = 35;
	timeDisplay.style.padding = "10px";
	timeDisplay.style.backgroundColor = "rgba(0,0,0,0.5)";
	timeDisplay.style.color = "white";
	timeDisplay.style.textAlign = "center";
	timeDisplay.style.fontSize = "30px";
	timeDisplay.style.fontFamily = "Ubuntu Medium, FreeSans, Trebuchet MS, sans-serif";
	document.body.appendChild(timeDisplay);
	
	var updateTimeDisplay = function() {
		var time = 0;
		
		if (!vehicle.startDate) { 
			time = 0;
		} else if (!vehicle.endDate) { 
			var now = new Date();

			time = now - vehicle.startDate;
		} else { 
			time = vehicle.endDate - vehicle.startDate;
		}
		
		// get values
		var ms = time % 1000;
		time = Math.floor(time / 1000);
		var sec = (time % 60);
		time = Math.floor(time / 60);
		var minutes = time;
		
		// produce output
		var output = ((minutes < 10) ? "0" : "") + minutes;
		output += ":" + ((sec < 10) ? "0" : "") + sec;
		output += "." + ((ms < 100) ? "0" + ((ms < 10) ? "0" : "") : "") + ms;
		timeDisplay.innerHTML = output;
	};
      
	updateTimeDisplay();*/

	//	window resize
	function  onWindowResize() {RC.onWindowResize(window.innerWidth,window.innerHeight);}

	function render() { 
		requestAnimationFrame( render );
		handleKeys();
		// Vehicle stabilization 
		vehicle.goUp(vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0) ;
		vehicle.stopAngularSpeedsXY() ;
		vehicle.stabilizeSkid(50) ; 
		vehicle.stabilizeTurn(1000) ;
		var oldPosition = vehicle.position.clone() ;
		vehicle.update(1.0/60) ;
		var newPosition = vehicle.position.clone() ;
		newPosition.sub(oldPosition) ;
		// NAV
		NAV.move(newPosition.x, newPosition.y, 150,10) ;
		// car0
		car0.position.set(NAV.x, NAV.y, NAV.z) ;
		// Updates the vehicle
		vehicle.position.x = NAV.x ;
		vehicle.position.y = NAV.Y ;
		// Updates car1
		car1.matrixAutoUpdate = false;		
		car1.matrix.copy(NAV.localMatrix(CARx,CARy));
		// Updates car2
		car2.rotation.z = vehicle.angles.z-Math.PI/2.0 ;


       // var activePlaneName = NAV.planeSet[NAV.active].name;
		 var activePlaneName = NAV.planeSet[NAV.active].name;
		vehicle.updateLap(activePlaneName);
        updateLapDisplay();
		//updateTimeDisplay();


		// Camera
        var plane = NAV.findActive(NAV.x,NAV.y);
		//console.log(vehicle.speed.z) ;
		console.log("plane"+plane);
		console.log("camera"+cameraMode)
        if(cameraMode == 0 ){

			tabCameras[0].position.x = 0.0 ;
			tabCameras[0].position.z = 10.0 ;
			tabCameras[0].position.y = -25.0 ;
			tabCameras[0].rotation.x = 85.0*3.14159/180.0 ;
			car3.add(tabCameras[0]);
			RC.renderer.render(RC.scene,tabCameras[0]);	
	    }
        else if (cameraMode == 1){
			tabCameras[1].rotation.z =  55 ;
			//tabCameras[1].rotation.y =  50 ;
			//tabCameras[1].rotation.x =  30 ;
			tabCameras[1].position.x = NAV.x;
			tabCameras[1].position.y = 100;
			tabCameras[1].position.z = 120;
			RC.renderer.render(RC.scene,tabCameras[1]);

        }else if(cameraMode == 2){
        	tabCameras[2].rotation.x = 0;
			tabCameras[2].position.x = NAV.x;
			tabCameras[2].position.y = NAV.y;
			tabCameras[2].position.z = NAV.z+50+vehicle.speed.length()*2;
			RC.renderer.render(RC.scene,tabCameras[2]);
        }
	    else if( true){
		    tabCameras[3].up = new THREE.Vector3(0,0,1);
			tabCameras[3].lookAt (car0.position); 
	        RC.renderer.render(RC.scene,tabCameras[3]);
	    }
           
 
  
		
	};


	
	render(); 
}
