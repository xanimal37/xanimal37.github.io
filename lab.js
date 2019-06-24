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
    const pathstr="assets/";
    var modelsToLoad=[
      "screen.glb",
      "tall_Shelf.glb",
      "walls_floors.glb",
      "wallstation_1.glb",
      "workstation_1.glb"
    ];

    const loader = new THREE.GLTFLoader();

    while(modelsToLoad.length>0){
    loader.load(pathstr+modelsToLoad[0]', function(data) {
       var obj=data.scene;
       obj.position.set(0,0,0);
       lab.scene.add(obj);
       modelsToLoad.shift();
    }
  );
  }
}
