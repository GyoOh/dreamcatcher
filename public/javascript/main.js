let horizontalUnderline = document.getElementsByClassName("horizontal-underline")[0]
let horizontalMenus = document.querySelectorAll("nav");

horizontalMenus.forEach(menu=>menu.addEventListener("mouseover",(e)=>horizontalIndicator(e)));

function horizontalIndicator(e) {
  console.log("it's working!")
    horizontalUnderline.style.left = e.target.offsetLeft +"px";
    horizontalUnderline.style.width = e.target.offsetWidth +"px";
    horizontalUnderline.style.top = e.target.offsetTop+ e.currentTarget.offsetHeight +"px";

}
// horizontalMenus.forEach((menu) =>
//   menu.addEventListener("click", (e) =>
//     horizontalIndicator(e)
//   )
// );
