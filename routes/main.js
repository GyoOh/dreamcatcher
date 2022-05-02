let horizontalUnderline = document.getElementById("horizontal_underline")
let horizontalMenus = document.querySelectorAll("nav a");

horizontalMenus.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));

function horizontalIndicator(e) {
    horizontalUnderline.style.left = e.currentTarget.offsetLeft +"px";
    horizontalUnderline.style.width = e.currentTarget.offsetWidth +"px";
    horizontalUnderline.style.top = e.currentTarget.offsetTop+ e.currentTarget.offsetHeight +"px";

}
horizontalMenus.forEach((menu) =>
  menu.addEventListener("click", (e) =>
    horizontalIndicator(e.currentTarget)
  )
);
