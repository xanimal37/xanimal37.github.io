class Lab {
    constructor(){
      	if ( WEBGL.isWebGLAvailable() === false ) {    document.body.appendChild( WEBGL.getWebGLErrorMessage() );}


          this.loadModels();
          this.init();
          this.animate();

    }

  init() {
    this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
      document.body.appendChild( this.renderer.domElement );

      const light = new THREE.DirectionalLight( 0xffffff,2 );
      light.position.set( 3, 3, 2 );
      const light2 = new THREE.DirectionalLight( 0xffffff,1 );
      light2.position.set( 0, 5, 1 );
      const ambient = new THREE.AmbientLight( 0xffffff,10);
      this.scene.add( light );
      this.scene.add(light2);
      this.scene.add( ambient );

  		const grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  		grid.material.opacity = 0.2;
  		grid.material.transparent = true;
  		this.scene.add( grid );

      this.camera.position.z = 5;
      this.camera.position.y=3;

      const video = document.createElement('video');
          video.src="video/test.mp4";
          video.load();
          video.play();

      //make canvas to play on
      var videocanvas = document.createElement('canvas');
      var videocanvasctx = videocanvas.getContext('2d');
      //set setSize
      videocanvas.width=640;
      videocanvas.height=480;

      //add canvas to texture
      var screenTexture = new THREE.Texture(videocanvas);
      //add to material to put on screen
      var material = new THREE.MeshBasicMaterial({map:screenTexture});
      var geometry = new THREE.PlaneGeometry(2,1);
      var screenMesh = new THREE.Mesh(geometry,material);

      this.scene.add(screenMesh);



      this.controls.update();
    }

	animate() {
      const lab = this;
      //check video
      if(this.video.readyState===this.video.HAVE_ENOUGH_DATA){
        videocanvasctx.drawImage(video,0,0);
        screenTexture.needsUpdate=true;
      }
        requestAnimationFrame( function(){ lab.animate(); } );
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }

  loadModels(){
    const lab = this;

    var modelsToLoad=[
      "assets/screen.glb",
      "assets/tall_Shelf.glb",
      "assets/walls_floors.glb",
      "assets/wallstation_1.glb",
      "assets/workstation_1.glb",
      "assets/faucet.glb",
      "assets/wall_cabinets.glb"
    ];

    const loader = new THREE.GLTFLoader();

    while (modelsToLoad.length>0){
        let model = modelsToLoad.pop();
        loader.load( `${model}`, function(data) {
            var obj=data.scene;
            obj.position.set(0,0,0);
            lab.scene.add(obj);
          }
        );
      }
    }
}
