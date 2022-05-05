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

const comments = document
  .querySelectorAll(".add_comment")
comments.forEach(comment => {
  comment.addEventListener("click", e => {
    e.preventDefault()
    const comment = document.querySelector("input.add_comment").value
    if (e.target.classList.contains("upload_btn")) {
      const header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        comment
      });
      const request = {
        method: "GET",
        headers: header,
        body: body,
      };
      const response = fetch("/posts", request);
      const jsonResponse = response.then((resp) => resp.json());
      jsonResponse.then((jResp) => {
        console.log(jResp)

      });
    }
  })
})

// const comment = document.querySelector("#feed1")
// comment.addEventListener("click", e => {
//   console.log(e)
// })










