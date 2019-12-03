var items;

window.onload = function picLoad() {
    console.log("Hello world");
    items = document.getElementsByClassName("item");
    for(var i=0;i<items.length;i++){
      console.log(items[i].innerHTML);
    }
}
