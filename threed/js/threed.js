console.log('Update 333'); //debug

class Molecule {
    constructor(canvas){
        //get the window to put the rending in and get its dimensions
		var canvas = document.getElementById("Canvas");
		var w = canvas.scrollWidth;
		var h = canvas.scrollHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);
        this.camera.position.z=3;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(w,h);
        this.renderer.setPixelRatio(canvas.devicePixelRatio );

        //this.displayCase.appendChild(this.renderer.domElement); //append to document

        const ambient = new THREE.AmbientLight(0x707070);
        const light = new THREE.DirectionalLight();

        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshPhongMaterial({color:0x240210});

        this.cube = new THREE.Mesh(geometry,material);

        this.scene.background=new THREE.Color( 0xff0000 );

        this.scene.add(this.cube);
        this.scene.add(light);
        this.scene.add(ambient);

        //add the scene to the cofWindow div of the html file
		canvas.appendChild(this.renderer.domElement);

        this.animate();
    }

    animate() {
        const molecule=this;
        requestAnimationFrame(function() {
            molecule.animate();}
            );

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene,this.camera);
    }

    

}    