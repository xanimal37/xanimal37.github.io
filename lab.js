class Lab {
    constructor(){
      	if ( WEBGL.isWebGLAvailable() === false ) {    document.body.appendChild( WEBGL.getWebGLErrorMessage() );}

      this.init();
      this.loadModels();
      this.animate();
    }

  init() {
    //vectors used to detect mouse click location and intesersec object
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    //set up scnee
    this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();

      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      this.renderer = new THREE.WebGLRenderer({antialias:true});
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.physicallyCorrectLights = true;
      this.renderer.shadowMap.enabled=true; //shadow test
      this.renderer.shadowMap.type=THREE.PCFShadowMap;
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
      document.body.appendChild( this.renderer.domElement );

      const spotlight = new THREE.SpotLight( 0xffffff,1 );
      //spotlight.position.set( 2, 2, 2 );
      spotlight.castShadow=true;
      spotlight.shadow.mapSize.height = 1024;
      spotlight.shadow.mapSize.width=1024;
      //const light2 = new THREE.DirectionalLight(0xffffff,1);
      //light2.position.set(-3,2,-1);
      //light AxesHelpe
      const lightHelper = new THREE.DirectionalLightHelper(spotlight,3);
      const ambient = new THREE.AmbientLight( 0xffffff,2);
      this.scene.add( spotlight );
      //this.scene.add(light2);
      this.scene.add(lightHelper);
      this.scene.add( ambient );

      this.camera.position.set(0,3,5);
      const ogCamPosition = this.camera.position;
      const moviePosition = new THREE.Vector3(0,2,0);

      //video test
      this.video = document.createElement('video');
      this.video.src = "video/ICDC.mp4";
      this.video.load;
      //video.play(); --autoplay forbidden by most browsers use click event

      const videoImage = document.createElement('canvas');
      videoImage.width = 854;
      videoImage.height= 480;

      this.videoImageContext = videoImage.getContext('2d');
      this.videoImageContext.fillStyle="#000000";
      this.videoImageContext.fillRect(0,0,videoImage.width,videoImage.height);

      this.videoTexture = new THREE.Texture(videoImage);
      this.videoTexture.minFilter = THREE.LinearFilter;
      this.videoTexture.magFilter = THREE.LinearFilter;

      var movieMaterial = new THREE.MeshBasicMaterial({map:this.videoTexture});
      const movieGeometry = new THREE.PlaneGeometry(1,.56);
      const movieScreen = new THREE.Mesh(movieGeometry,movieMaterial);
      movieScreen.position.set(-2.05,1.87,.43);
      movieScreen.rotateY(Math.PI/2);
      movieScreen.rotateX(0.15);
      //animation mixers
      this.mixers=[];

      //use for click detection
      movieScreen.name = "Screen";
      this.scene.add(movieScreen);
      this.isMoviePlaying =false; //initialize movie as not playing

      //window.addEventListener('mousemove',function(){lab.onMouseMove(event);},false);
      window.addEventListener('mousedown',function(){lab.onMouseDown(event);},false);

      this.controls.update();

    }

  toggleMovie() {
    switch(this.isMoviePlaying){
      case false:
        this.isMoviePlaying =true;
        this.video.play();
        this.moveCamera(this.ogCamPosition,this.moviePosition);
        break;
      case true:
        this.isMoviePlaying=false;
        this.video.pause();
        this.moveCamera(this.moviePosition,this.ogCamPosition);
        break;
      default:
        break;
    }
  }

  moveCamera(loc1,loc2) {
    this.camera.position.set(loc2);
  }

  onMouseMove(event) {
    //this.mouse.x = (event.clientX/window.innerWidth)*2-1;
    //this.mouse.y = (event.clientY/window.innerHeight)*2+1;
  }

  onMouseDown(event){
    //if we need to use mousemove, then update raycaster in aniamtion lop
    this.mouse.x = (event.clientX/window.innerWidth)*2-1;
    this.mouse.y = -(event.clientY/window.innerHeight)*2+1;
    //for mouse interaction
    this.raycaster.setFromCamera(this.mouse,this.camera);
    var intersects = this.raycaster.intersectObjects(this.scene.children,true);//recurseive(gets children)
    console.log(intersects[0].object);
    //check for intersection with video screen
    if(intersects[0].object.name=="Screen"){
      this.toggleMovie();
    }
  }

	animate() {
        const lab = this;
        requestAnimationFrame( function(){ lab.animate(); } );
        var delta = this.clock.getDelta();
        this.controls.update();
          if(this.video.readyState === this.video.HAVE_ENOUGH_DATA){
          this.videoImageContext.drawImage(this.video,0,0);
          if(this.videoTexture) {
            this.videoTexture.needsUpdate = true;
          }
        }

        this.mixers.forEach( ( mixer ) => { mixer.update( delta ); } );


        this.renderer.render( this.scene, this.camera );

    }

  loadModels(){
    const lab = this;
    lab.mixers =[];
    var assetsToLoad=[
      "assets/test3.glb"
      //"assets/room.glb",
      //"assets/fixtures.glb",
      //"assets/equipment.glb",
      //"assets/furniture.glb",
      //"assets/tv.glb",
      //"assets/stations.glb",
      //"assets/shelving.glb",
      //"assets/extras.glb"
    ];

    const loader = new THREE.GLTFLoader();

    while (assetsToLoad.length>0){
        let asset = assetsToLoad.pop();
        loader.load( `${asset}`, function(gltf) {
          gltf.scene.traverse(function(node) {
            if(node instanceof THREE.Mesh) {node.castShadow=true; node.receiveShadow=true;}
          });

          lab.scene.add(gltf.scene);

          var testMixer = new THREE.AnimationMixer(gltf.scene);
          testMixer.clipAction(gltf.animations[0]).play();
          testMixer.clipAction(gltf.animations[1]).play();
          testMixer.clipAction(gltf.animations[2]).play();
          testMixer.clipAction(gltf.animations[3]).play();
          testMixer.clipAction(gltf.animations[4]).play();

          lab.mixers.push(testMixer);
          console.log("There are " + gltf.animations.length + " animations in the scene.");
          for(var i=0;i<gltf.animations.length;i++) {
            console.log(gltf.animations[i].name);
          }
          });
  }
}
}
