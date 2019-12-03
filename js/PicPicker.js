var items;
var modal;

window.onload = function picLoad() {

    modal=document.getElementById("modalWindow");

    items = document.getElementsByClassName("thumb");
    for(var i=0;i<items.length;i++){
      items[i].addEventListener("click",ShowImage);
    }

    document.getElementById("closeModalButton").addEventListener("click",HideImage);
}

function ShowImage() {
  console.log("Showed image");
  modal.classList.add("showIt");
  modal.classList.remove("hideIt");
}

function HideImage() {
  console.log("Hid image");
  modal.classList.remove("showIt");
  modal.classList.add("hideIt");
}
