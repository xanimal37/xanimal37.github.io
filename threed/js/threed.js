import * as THREE from 'library/three.module.js';

class ThreeD {
    constructor(txt){
        self.txt=txt;
    }

    //method
    sayHi(){
        console.log(self.txt);
    }
}

threed = new ThreeD('Hello World');
threed.sayHi();