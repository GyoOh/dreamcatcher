async function handleYelpRequest(lat, lng) {
    const request = {
        method: "POST",
    }
    const data = await fetch(`/posts/yelp?latitude=${lat}&longitude=${lng}`, request)
    const dataJSON = await data.json();
    return dataJSON;
}

const restaurantsList = document.querySelector(".RestInfoDiv")

const restaurant_name = document.querySelector("div.resultOfPlace3").innerHTML
const address = document.querySelector("div.resultOfPlace4").innerHTML
const display_phone = document.querySelector("div.resultOfPlace5").innerHTML
const restaurant_url = document.querySelector("div.resultOfPlace6").innerHTML
const newUrl = restaurant_url.replace(/'/g, "");
console.log(restaurant_url, "New", newUrl)
const rating = document.querySelector("div.resultOfPlace7").innerHTML
const review_count = document.querySelector("div.resultOfPlace8").innerHTML
const post_id = document.querySelector("div.resultOfPlace9").innerHTML
const address2 = document.querySelector("div.resultOfPlace10").innerHTML
const categories = document.querySelector("div.resultOfPlace11").innerHTML

// let rating = restaurant.rating
function addNewRestaurant(restaurant) {
    let ratingStars = document.createElement('div')
    let star = `<img class="nav-icon" src="/icons/star fill.svg">`
    let half = `<img class="nav-icon" src="/icons/half star.svg">`
    let empty = `<img class="nav-icon" src="/icons/star no fill.svg">`
    function showStar(rating) {
        if (rating == 0) {
            return ratingStars.innerHTML = empty + empty + empty + empty + empty
        } else if (rating == 1) {
            return ratingStars.innerHTML = star + empty + empty + empty + empty
        } else if (rating == 1.5) {
            return ratingStars.innerHTML = star + half + empty + empty + empty
        } else if (rating == 2) {
            return ratingStars.innerHTML = star + star + empty + empty + empty
        } else if (rating == 2.5) {
            return ratingStars.innerHTML = star + star + half + empty + empty
        } else if (rating == 3) {
            return ratingStars.innerHTML = star + star + star + empty + empty
        } else if (rating == 3.5) {
            return ratingStars.innerHTML = star + star + star + half + empty
        } else if (rating == 4) {
            return ratingStars.innerHTML = star + star + star + star + empty
        } else if (rating == 4.5) {
            return ratingStars.innerHTML = star + star + star + star + half
        } else if (rating == 5) {
            return ratingStars.innerHTML = star + star + star + star + star
        }
    }
    let newRestaurant = document.createElement('div');
    newRestaurant.classList.add("RestInfoDiv")
    newRestaurant.innerHTML = `
    <p class="first-h4"> ${restaurant_name}</p>
    <img class="userPost"src=${restaurant_url}>
    <p class="nav-icon"> ${rating} &nbsp${showStar(rating)}&nbsp(${review_count})</p>
    <p class="phoneNumber">Category:&nbsp&nbsp&nbsp${categories}</p>
    <p class="info">Address:&nbsp&nbsp&nbsp${address}&nbsp&nbsp${address2}</p>
    <p class="phoneNumber">Phone:&nbsp&nbsp&nbsp${display_phone}</p>
    `;
    restaurantsList.appendChild(newRestaurant);

}
addNewRestaurant()