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
      document.body.appendChild( this.renderer.domElement );

      const light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 20, 10 );
      const ambient = new THREE.AmbientLight( 0x707070 ); // soft white light

      this.scene.add( light );
      this.scene.add( ambient );

      // ground
  		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20, 20), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  		mesh.rotation.x = - Math.PI / 2;
  		mesh.receiveShadow = true;
  		this.scene.add( mesh );

  		var grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  		grid.material.opacity = 0.2;
  		grid.material.transparent = true;
  		this.scene.add( grid );

      this.camera.position.z = 3;
    }

	animate() {
        //for now, just render the scene
        this.renderer.render( this.scene, this.camera );
    }
}
