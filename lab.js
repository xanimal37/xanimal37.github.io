class Lab {
    constructor(){
      	if ( WEBGL.isWebGLAvailable() === false ) {    document.body.appendChild( WEBGL.getWebGLErrorMessage() );}

          this.createScreen();
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



      this.controls.update();
    }

	animate() {
      const lab = this;
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

    createScreen() {
      var video = document.getElementById('video');
      video.load();
      video.play();
      var texture = new THREE.VideoTexture(video);
      texture.needsUpdate;
      texture.minFilter= THREE.LinearFilter;
      texture.magFilter=THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      texture.crossOrigin='anonymous';

      var screen = new THREE.Mesh(
        new THREE.PlaneGeometry(2,1),
        new THREE.MeshBasicMaterial({map:texture})
      );

      screen.position.set(0,4,0);
      this.scene.add(screen);


    }
}
