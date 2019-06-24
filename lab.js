class Lab {
    constructor(){

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

      const light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 20, 10 );
      const ambient = new THREE.AmbientLight( 0x707070 ); // soft white light

      this.scene.add( light );
      this.scene.add( ambient );

      // ground
  		const groundPlane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20, 20), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  		groundPlane.rotation.x = - Math.PI / 2;
  		groundPlane.receiveShadow = true;
  		this.scene.add( groundPlane );

  		const grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  		grid.material.opacity = 0.2;
  		grid.material.transparent = true;
  		this.scene.add( grid );

      this.camera.position.z = 5;
      this.camera.position.y=3;

      // model
  		const loader = new THREE.GLTFLoader();
      const lab = this;
  		loader.load('assets/workstation_1.gltf', function (data) {
          var obj = data.scene;
          obj.position.set(0,0,0);
          lab.scene.add(obj);
      });
    }

	animate() {
        //for now, just render the scene
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
}
