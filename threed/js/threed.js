class Molecule {
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth,window.innerHeight);

        this.displayCase = document.getElementById('Canvas');
        this.displayCase.appendChild(this.renderer.domElement); //append to document

        const geometry = new THREE.BoxGeometry(1,1,1);
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0,20,10);
        const ambient = new THREE.AmbientLight(0x707070);

        const material = new THREE.MeshPhongMaterial({color:0x240210});

        this.cube = new THREE.Mesh(geometry,material);

        this.scene.add(this.cube);
        this.scene.add(light);
        this.scene.add(ambient);

        this.camera.position.z=3;

        this.animate();
    }

    animate(){
        const molecule=this;
        requestAnimationFrame(function() {
                molecule.animate();
            });

        this.renderer.render(this.scene,this.camera);
    }

 
}
   
    