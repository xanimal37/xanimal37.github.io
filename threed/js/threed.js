console.log('Update 333'); //debug

class Molecule {
    constructor(canvas){
        //get the window to put the rending in and get its dimensions
		var canvas = document.getElementById("Canvas");
		var w = canvas.scrollWidth;
		var h = canvas.scrollHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);
        this.camera.position.z=10;
        this.renderer = new THREE.WebGLRenderer({alpha:true});
        this.renderer.setSize(w,h);
        this.renderer.setPixelRatio(canvas.devicePixelRatio );
        
        // create light objects
        const ambient = new THREE.AmbientLight(0x707070);
        const light = new THREE.DirectionalLight(0xffffff,2);

        this.scene.background=null;
        this.scene.add(light);
        this.scene.add(ambient);
        //glft binary model
        this.loadmodel();

        //add the scene to the cofWindow div of the html file
		canvas.appendChild(this.renderer.domElement);
        
        this.animate();
    }

    loadmodel() {
        const molecule=this;

        //create a loader
        const loader = new THREE.GLTFLoader();

        loader.load(
            //url
            'threed/model/molecule.glb',
            //functoin called when loaded
            function(glb){
                molecule.scene.add(glb.scene);
            }
        );
    }

    animate() {
        const molecule=this;
        requestAnimationFrame(function() {
            molecule.animate();}
            );

        this.renderer.render(this.scene,this.camera);
    }
}    