var modal;

window.onload = function() { 
  
    if(window.innerWidth>1199){
        modal = document.getElementById("Modal");
        AddAllListeners();
    }
} 

function AddAllListeners(){

    var images = document.getElementsByClassName("art");

    for(var i=0;i<images.length;i++)
        {
            images[i].addEventListener("click",function(e){

                   document.getElementById("displayImage").src=e.target.src;
                   modal.classList.remove('hidden');
                   modal.classList.add('showing');
            });
        }

    document.getElementById("CloseButton").addEventListener("click",function(){

        modal.classList.add('hidden');
        modal.classList.remove('showing');
        
    });

}
