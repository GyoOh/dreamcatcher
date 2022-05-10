let horizontalUnderline = document.getElementsByClassName("horizontal-underline")[0]
let horizontalMenus = document.querySelectorAll("nav a");

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

const allComments = document.querySelector(".total")
const commentDiv = document.querySelectorAll(".commentDiv")
let currentItem = 0;
allComments.addEventListener("click", makeTotalComment)
function makeTotalComment(e) {
  e.preventDefault()
  console.log(e)

  commentDiv[0].classList.remove('displayNone')
}

function likePost(post_id) {
  console.log("like post ", post_id)
}

//edit mode
const moreIcons = document.querySelectorAll('#user');
moreIcons.forEach(icon => {
  icon.parentNode.children[1].classList.add('displayNone');
});
moreIcons.forEach(a => {
  a.addEventListener("click", btnToggle)
  function btnToggle(e) {
    let section = e.target.parentNode
    let buttons = section.children[1]
    buttons.classList.toggle('displayNone')
  }
});

const allCancels = document.querySelectorAll('#cancelBtn');
allCancels.forEach(cancel => {
  cancel.addEventListener("click", cancelBtn)
  function cancelBtn(e) {
    let clickAll = e.target.parentNode
    clickAll.classList.toggle('displayNone');
  }
})

function handleDeletePost(e){
  fetch(`http://localhost:8000/posts/deletePost?id=${e.target.id}`,
    {
      method:"DELETE"
    }
  )
  location.reload();
}




