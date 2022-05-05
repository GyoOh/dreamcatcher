let horizontalUnderline = document.getElementsByClassName("horizontal-underline")[0]
console.log(horizontalUnderline)
let horizontalMenus = document.querySelectorAll("nav a");
console.log(horizontalMenus)

horizontalMenus.forEach(menu => menu.addEventListener("mouseover", (e) => horizontalIndicator(e)));

function horizontalIndicator(e) {
  console.log("it's working!")
  horizontalUnderline.style.left = e.target.offsetLeft + "px";
  horizontalUnderline.style.width = e.target.offsetWidth + "px";
  horizontalUnderline.style.top =
    e.target.offsetTop + e.target.offsetHeight + "px";
}
const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const body = JSON.stringify({
  comments
});
const request = {
  method: "POST",
  headers: header,
  body: body,
};

fetch("/posts", request)
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp)
  });











