//pop up the modal
const modal = document.getElementById("modal_add_feed")
const buttonAddFeed = document.getElementById("add_feed")
buttonAddFeed.addEventListener("click", e => {
    modal.style.top = window.pageYOffset + 'px'
    modal.style.display = "flex"
    document.body.style.overflowY = "hidden"
})
//close the modal
const buttonCloseModal = document.getElementById("close_modal")
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none"
    document.body.style.overflowY = "visible"
})


$('.modal_image_upload')
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.type == "dragover") {
        $(e.target).css({
            "background-color": "black",
            "outline-offset": "-20px"
        });
    } else {
        $(e.target).css({
            "background-color": "white",
            "outline-offset": "-10px"
        });
    }
}

function uploadFiles(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer = e.originalEvent.dataTransfer;
    var files = e.dataTransfer.files;

    if (files.length > 1) {
        alert('upload only one.');
        return;
    }

    if (files[0].type.match(/image.*/)) {
        $(e.target).css({
            "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
            "outline": "none",
            "background-size": "100% 100%"
        });
    } else {
        alert('This is not an image.');
        return;
    }

}