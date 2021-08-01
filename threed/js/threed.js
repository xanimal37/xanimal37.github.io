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

        const geometry = new THREE.BoxGeometry(1,1,1);
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0,20,10);
        const ambient = new THREE.AmbientLight(0x707070);

        const material = new THREE.MeshBasicMaterial({color:0x240210});

        this.cube = new THREE.Mesh(geometry,material);

        this.scene.background=new THREE.Color( 0xff0000 );
        this.scene.add(this.cube);

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