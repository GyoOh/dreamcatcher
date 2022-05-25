document.querySelector("img.plus-icon").addEventListener("click", event => {
    event.preventDefault()
    const term = document.querySelector("#restaurantNameFormInput").value
    console.log("submit the form", term)
    const result = document.querySelector("div.result")

    const header = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
    const body = JSON.stringify({
        term
    });
    const request = {
        method: "POST",
        headers: header,
        body: body,
    }
    fetch(`/posts/create/restaurant`, request)
        .then(resp =>
            resp.json()
        )
        .then(data => {
            result.innerHTML = data.name + data.display_address
            console.log(data.name)
            console.log(data.display_address)
        })
        .catch(err => console.log(err))
})

