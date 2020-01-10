var items;
var modal;
var imageToShow;

window.onload = function picLoad() {

    modal=document.getElementById("modalWindow");
    imageToShow=document.getElementById("selectedImage");

    items = document.getElementsByClassName("thumb");
    for(var i=0;i<items.length;i++){
      items[i].addEventListener("click",ShowImage);
    }
}

function ShowImage(event) {
  modal.classList.remove("hideIt");
  modal.classList.add("showIt");
  selectedImage.src=event.target.src;
}

function HideImage() {
  modal.classList.remove("showIt");
  modal.classList.add("hideIt");
}
