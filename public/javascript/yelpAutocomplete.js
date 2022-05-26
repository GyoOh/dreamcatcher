const yelpSearchInput = document.querySelector(".yelp-search-input");
yelpSearchInput.addEventListener('input', (event) => {
    if (event.target.value.length > 0) {
        populateYelpSuggestions(event.target.value);
    }
})

const yelpSuggestions = document.querySelector(".yelp-suggestions")
async function populateYelpSuggestions(input) {
    const request = {
        method: "GET",
    }
    // const data = await fetch(`/posts/businesses/search?input=${input}&latitude=49.282359695758885&longitude=-123.1168886758965`, request)
    const data = await fetch(`/posts/autocomplete?input=${input}&latitude=49.282359695758885&longitude=-123.1168886758965`, request)
    const dataJSON = await data.json();
    const businesses = dataJSON.businesses;
    yelpSuggestions.innerHTML = '';
    for (let business of businesses) {
        yelpSuggestions.innerHTML += `<div class="suggestion">${business.name}</div>`
    }
}
// https://api.yelp.com/v3/autocomplete?text=${input}&locale=en_CA

yelpSuggestions.addEventListener('click', (event) => {
    console.log(event.target.textContent)
    yelpSearchInput.value = event.target.textContent;
    yelpSuggestions.innerHTML = '';
})


// const restaurantInput = document.querySelector('.restaurant-input');
// restaurantInput.addEventListener('input', (event) => {
//     if (event.target.value.length > 0) {
//         populateYelpSuggestions(event.target.value);
//     }
// })



