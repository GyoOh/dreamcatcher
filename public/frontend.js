//pop up the modal
const modal = document.getElementById("modal_add_feed")
const buttonAddFeed = document.getElementById("add_feed")
buttonAddFeed.addEventListener("click", e => {
    modal.style.display = "flex"
    document.body.style.overflowY = "hidden"
})
//close the modal
const buttonCloseModal = document.getElementById("close_modal")
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none"
    document.body.style.overflowY = "visible"
})