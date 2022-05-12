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

const commentTotal = document.querySelectorAll("li.total")
commentTotal.forEach(comment => {
  comment.addEventListener(('click'), makeTotalComment)
  function makeTotalComment(event) {
    event.path[5].childNodes[9].childNodes[3].childNodes[3].classList.toggle("commentDiv")
  }
})

const hearts = document.querySelectorAll(".favorite")
hearts.forEach(heart => {
  heart.addEventListener("click", makeCount)
  function makeCount(event) {
    event.path[0].classList.toggle("liked")
    let post_id = event.path[1].childNodes[1].value
    if (heart.classList.contains("liked")) {
      event.target.src = "/icons/like.svg"
      const header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
      let body = JSON.stringify({
        post_id
      });
      const request = {
        method: "POST",
        headers: header,
        body: body,
      }
      fetch(`/posts/${post_id}/like`, request)
        .then(resp => resp.json())
        .then((data) => { })
        .catch(err => console.log(err))
        location.reload();
    } else {
      event.target.src = "/icons/heart.svg"
      const header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
      let body = JSON.stringify({
        post_id
      });
      const request = {
        method: "POST",
        headers: header,
        body: body,
      }
      fetch(`/posts/${post_id}/dislike`, request)
        .then(resp => resp.json())
        .then((data) => { document.querySelector(".commentDiv").innerHTML(data) })
        .catch(err => console.log(err))
        location.reload();
    }
  }
})


const bookmarks = document.querySelectorAll(".bookmark")
bookmarks.forEach(bookmark => {
  bookmark.addEventListener("click", makeBookmark)
  function makeBookmark(event) {
    event.path[0].classList.toggle("saved")
    if (bookmark.classList.contains("saved")) {
      event.target.src = "/icons/saved.svg"
    } else {
      event.target.src = "/icons/save.svg"
    }
  }
})

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
      method:"POST"
    }
  )
  location.reload();
}

const commentsForms = document.querySelectorAll("form.comment_form")
commentsForms.forEach(commentForm => {
  commentForm.addEventListener("submit", makeComment)
  function makeComment(event) {
    event.preventDefault()
    let comments = event.path[0].childNodes[3].childNodes[1].childNodes[1].value
    let post_id = event.path[0].childNodes[3].childNodes[1].childNodes[3].childNodes[3].value
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    const body = JSON.stringify({
      comments,
      post_id
    });
    const request = {
      method: "POST",
      headers: header,
      body: body,
    }
    fetch(`/posts/${post_id}/comment`, request)
      .then(resp => resp.json())
      .then((data) => {
        document.querySelector(".commentDiv").innerHTML(data)
      })
      .catch(err => console.log(err))
      location.reload();
  }
})



