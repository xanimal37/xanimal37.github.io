import * as THREE from 'http://nmgc.umn.edu/threeJS/three.module.js';

class ThreeD {
    constructor(txt){
        this.txt=txt;
    }

    sayHi(){
        console.log(self.txt);
    }
}
   
    
threed = new ThreeD('Hello World');
threed.sayHi();