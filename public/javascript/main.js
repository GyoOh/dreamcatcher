let horizontalUnderline = document.getElementsByClassName("horizontal-underline")[0]
console.log(horizontalUnderline)
let horizontalMenus = document.querySelectorAll("nav a");
console.log(horizontalMenus)

function horizontalIndicator(e) {
  console.log("it's working!")
  horizontalUnderline.style.left = e.target.offsetLeft +"50px";
  horizontalUnderline.style.width = e.target.offsetWidth +"px";
  horizontalUnderline.style.top = e.target.offsetTop+ e.currentTarget.offsetHeight +"px";
}

horizontalMenus.forEach(menu=>menu.addEventListener("mouseover",(e)=>horizontalIndicator(e)));
// horizontalMenus.forEach((menu) =>
//   menu.addEventListener("click", (e) =>
//     horizontalIndicator(e)
//   )
// );











