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

      const ambient = new THREE.AmbientLight( 0xffffff,2);
      this.scene.add( ambient );
      const dlight = new THREE.DirectionalLight(0xffffff);
      this.scene.add(dlight);

      this.camera.position.set(3,3,3);
      this.ogCamPosition = this.camera.position;
      this.ogCamLookAt = new THREE.Vector3(0,0,0);

      //video
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
      this.movieScreen = new THREE.Mesh(movieGeometry,movieMaterial);
      this.movieScreen.position.set(-2.05,1.87,.43);
      this.movieScreen.rotateY(Math.PI/2);
      this.movieScreen.rotateX(0.15);

      //use for click detection
      this.movieScreen.name = "Screen";
      this.scene.add(this.movieScreen);
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
        break;
      case true:
        this.isMoviePlaying=false;
        this.video.pause();
        break;
      default:
        break;
    }
  }

  //orient the camera via the orbital controls to look at a specific object while
  //also possibly triggering an animation or movie
  cameraTargetObject(obj) {
      this.scene.updateMatrixWorld(); //need or will get coordinates for the whole model
      let test = new THREE.Vector3();
      obj.getWorldPosition(test); //world position of object is put into 'test'
      this.controls.target=test;
      console.log("move camera target "+ obj.name);
      //place the camera differntly depending on the intersectObjects
      switch(obj.name){
        case "Screen":
          this.camera.position.set(-1.6,1.80,.43);
          this.toggleMovie();
          break;
        case "CTC_Poster":
          this.camera.position.set(-0.88,1.93,3.75);
          break;
        case "GloveBox_0":
          this.camera.position.set(-0.51,1.93,5.47);
          var clip = THREE.AnimationClip.findByName( this.clips, 'Cr_AtomAction' );
          var action = this.mixer.clipAction( clip );
          action.play();
          break;
        case "ICDC_Poster":
          this.camera.position.set(5.8,1.92,-1.77);
          break;
        default:
          break;
    }
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

    //check for intersection with video screen
    if(intersects[0]!=null){
        this.cameraTargetObject(intersects[0].object);
        console.log(intersects[0].object.name);
        console.log(this.camera.position);
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
        //mixer isn't created until model loads
        if(this.mixer){
          this.mixer.update( delta );
        }
        this.renderer.render( this.scene, this.camera );

    }

  loadModels(){
    const lab = this;
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

          lab.mixer = new THREE.AnimationMixer(gltf.scene);
          lab.clips = gltf.animations;

        //  testMixer.clipAction(gltf.animations[0]).play();
        //  testMixer.clipAction(gltf.animations[1]).play();
          //testMixer.clipAction(gltf.animations[2]).play();
          //testMixer.clipAction(gltf.animations[3]).play();
        //  testMixer.clipAction(gltf.animations[4]).play();
          console.log("There are " + gltf.animations.length + " animations in the scene.");
          for(var i=0;i<gltf.animations.length;i++) {
            console.log(gltf.animations[i].name);
          }
          });
  }
}
}
