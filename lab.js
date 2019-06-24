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

      // model
  		const loader = new THREE.GLTFLoader();
      const lab = this;
  		loader.load('assets/workstation_1.glb', function (data) {
          var obj = data.scene;
          obj.name = "workbench1";
          obj.position.set(0,0,0);
          lab.scene.add(obj);
          lab.scene.getObjectByName("workbench1").castShadow=true;
      }
    );

      loader.load('assets/walls_floors.glb', function(data) {
         var obj=data.scene;
         obj.name="room";
         obj.position.set(0,0,0);
         lab.scene.add(obj);
         lab.scene.getObjectByName("room").castShadow=true;
      }
    );

    loader.load('assets/wallstation_1.glb', function(data) {
       var obj=data.scene;
       obj.name="wallstation";
       obj.position.set(0,0,0);
       lab.scene.add(obj);
       lab.scene.getObjectByName("wallstation").castShadow=true;
    }
  );

      this.controls.update();
    }

	animate() {
      const lab = this;
        requestAnimationFrame( function(){ lab.animate(); } );
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
}
