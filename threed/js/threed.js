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