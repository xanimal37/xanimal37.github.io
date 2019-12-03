var items;
var modal;

window.onload = function picLoad() {

    modal=document.getElementById("modalWindow");

    items = document.getElementsByClassName("thumb");
    for(var i=0;i<items.length;i++){
      items[i].addEventListener("click",ShowImage);
    }  
}

function ShowImage() {
  console.log("Showed image");
  modal.classList.add("showIt");
  modal.classList.remove("hideIt");
}
