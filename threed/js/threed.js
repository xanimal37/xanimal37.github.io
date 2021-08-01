import * as THREE from 'https://xanimal37.github.io/threed/js/library/three-module.js';

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