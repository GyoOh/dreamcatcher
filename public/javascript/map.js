function initMap() {
    const options = {
        zoom: 13,
        center: { lat: 49.282359695758885, lng: -123.1168886758965 },
        mapId: 'd2716697ffbc4fa6'
    }
    const map = new
        google.maps.Map(document.getElementById('map'), options);

    const findRestaurantNearMeButton = document.getElementsByClassName("custom-map-control-button")[0]

    // const findRestaurantNearMeButton = document.createElement("button");
    // findRestaurantNearMeButton.textContent = 'Find me';
    // findRestaurantNearMeButton.classList.add("custom-map-control-button");
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(findRestaurantNearMeButton)

    // add marker when u want to
    google.maps.event.addListener(map, 'click', (event) => {
        addMarker({ coords: event.latLng });
    })

    
    const markers = [
        {
            coords: { lat: 49.28635375404073, lng: -123.12737595976482 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">Chico Chicken</h1>
            <p class="info">1234 Robson St, Vancouver, BC V6E 1C1</p>
            <b><div class="phone">phone number</div></b>
            <p>+12364552533</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 11:00am~ 10:00pm</div>
            <div>Monday, 11:00am~ 10:00pm</div>
            <div>Tuesday, 11:00am~ 10:00pm</div>
            <div>Wednesday, 11:00am~ 10:00pm</div>
            <div>Thursday, 11:00am~ 10:00pm</div>
            <div>Friday, 11:00am~ 10:00pm</div>
            <div>Saturday, 11:00am~ 10:00pm</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        },
        {
            coords: { lat: 49.281267558806924, lng: -123.1206081438685 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">Jollibee</h1>
            <p class="info">833 Granville St, Vancouver, BC V5M 2C9</p>
            <b><div class="phone">phone number</div></b>
            <p>+16042657353</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 9:00am~ 10:00pm</div>
            <div>Monday, 9:00am~ 10:00pm</div>
            <div>Tuesday, 9:00am~ 10:00pm</div>
            <div>Wednesday, 9:00am~ 10:00pm</div>
            <div>Thursday, 9:00am~ 10:00pm</div>
            <div>Friday, 9:00am~ 10:00pm</div>
            <div>Saturday, 9:00am~ 10:00pm</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        },
        {
            coords: { lat: 49.28967972730247, lng: -123.1310727569609 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">bbq chicken</h1>
            <p class="info">1517 Robson St, Vancouver, BC V6G 1C3</p>
            <b><div class="phone">phone number</div></b>
            <p>+16044551129</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 4:00pm~ 12:00am</div>
            <div>Monday, 4:00pm~ 12:00am</div>
            <div>Tuesday, 4:00pm~ 12:00am</div>
            <div>Wednesday, 4:00pm~ 12:00am</div>
            <div>Thursday, 4:00pm~ 12:00am</div>
            <div>Friday, 4:00pm~ 12:00am</div>
            <div>Saturday, 4:00pm~ 12:00am</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        },
        {
            coords: { lat: 49.28730022745002, lng: -123.12807801782375 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">Ole chicken</h1>
            <p class="info">1256 Robson St, Vancouver, BC V6E 1C1</p>
            <b><div class="phone">phone number</div></b>
            <p>+16044283909</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 5:00pm~ 12:00am</div>
            <div>Monday, 5:00pm~ 12:00am</div>
            <div>Tuesday, 5:00pm~ 12:00am</div>
            <div>Wednesday, 5:00pm~ 12:00am</div>
            <div>Thursday, 5:00pm~ 12:00am</div>
            <div>Friday, 5:00pm~ 12:00am</div>
            <div>Saturday, 5:00pm~ 12:00am</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        },
        {
            coords: { lat: 49.28800125737821, lng: -123.14115778468913 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">Chicken World</h1>
            <p class="info">1181 Denman St, Vancouver, BC V6G 2N1</p>
            <b><div class="phone">phone number</div></b>
            <p>+16046810007</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 11:00am~ 11:00pm</div>
            <div>Monday,11:00am~ 11:00pm</div>
            <div>Tuesday, 11:00am~ 11:00pm</div>
            <div>Wednesday, 11:00am~ 11:00pm</div>
            <div>Thursday, 11:00am~ 11:00pm</div>
            <div>Friday, 11:00am~ 12:00pm</div>
            <div>Saturday, 11:00am~ 12:00pm</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        },
        {
            coords: { lat: 49.282628563811485, lng: -123.13360696468155 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">Nene Chicken</h1>
            <p class="info">1231 Davie St, Vancouver, BC V6E 1N4</p>
            <b><div class="phone">phone number</div></b>
            <p>+16043362779</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 12:00pm~ 10:00pm</div>
            <div>Monday, 12:00pm~ 10:00pmm</div>
            <div>Tuesday, 12:00pm~ 10:00pm</div>
            <div>Wednesday, 12:00pm~ 10:00pm</div>
            <div>Thursday, 12:00pm~ 10:00pm</div>
            <div>Friday, 12:00pm~ 10:00pm</div>
            <div>Saturday, 12:00pm~ 10:00pm</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        },
        {
            coords: { lat: 49.278242317612566, lng: -123.12699305164796 },
            map: map,
            animation: google.maps.Animation.DROP,
            content: `<h1 class="restaurantName">Nando's PERi-PERi</h1>
            <p class="info">828 Davie St, Vancouver, BC V6Z 2S2</p>
            <b><div class="phone">phone number</div></b>
            <p>+16046781217</p>
            <b><div class="hours">hours</div></b> 
            <div>Sunday, 11:00am~ 11:00pm</div>
            <div>Monday,11:00am~ 11:00pm</div>
            <div>Tuesday, 11:00am~ 11:00pm</div>
            <div>Wednesday, 11:00am~ 11:00pm</div>
            <div>Thursday, 11:00am~ 11:00pm</div>
            <div>Friday, 11:00am~ 12:00pm</div>
            <div>Saturday, 11:00am~ 12:00pm</div>
            <img src="/images/chicken.jpeg"`,
            iconImage: {
                url: "/icons/logo_burger.svg",
                scaledSize: new google.maps.Size(43, 36)
            }
        }
        
    ];

    const searchInput = document.createElement('input');
    const searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInput);
    searchInput.placeholder = "Enter a place";

    for (let i = 0; i < markers.length; i++) {
        console.log('test', i)
        addMarker(markers[i]);
    }

    //add marker 
    function addMarker(props) {
        const marker = new google.maps.Marker({
            position: props.coords,
            map: props.map,
            animation: props.animation,
            content: props.content,
            // icon: props.iconImage,
            scaledSize: props.scaledSize
        })
        //check
        if (props.iconImage) {
            //set icon 
            marker.setIcon(props.iconImage)
        }

        if (props.content) {
            const infoWindow = new google.maps.InfoWindow({
                content: props.content
            })
            marker.addListener("click", () => {
                infoWindow.open(map, marker)
            });

        } else {
            // infoWindow.remove(map, marker)
        }
    }

    findRestaurantNearMeButton.addEventListener("click", () => {
        // infoWindow2 = new google.maps.InfoWindow({
        //     content: props.content
        // });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const myLocation = {
                        coords: { lat: position.coords.latitude, lng: position.coords.longitude },
                        map: map,
                        animation: google.maps.Animation.DROP,
                        content: ``,
                        iconImage: {
                            url: "/icons/logo_burger.svg",
                            scaledSize: new google.maps.Size(43, 36)
                        }
                    }
                    addMarker(myLocation);
                    map.setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                }
            );
        } else {
            // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

async function handleSubmit() {
    codeAddress()
}

async function calcDistance(start, end) {
    const s = JSON.stringify(start);
    const e = JSON.stringify(end)
    const startObj = JSON.parse(s)
    const endObj = JSON.parse(e)
    // calculate distance
    let myLocation = new google.maps.LatLng(startObj.lat, startObj.lng);
    // each marker is a destination
    let destination = new google.maps.LatLng(endObj.lat, endObj.lng);
    let service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
        {
            origins: [myLocation],
            destinations: [destination],
            travelMode: 'DRIVING',
        }, callback)

    function callback(response, status) {
        // See Parsing the Results for
        // the basics of a callback function.
        console.log("Callback Res " + JSON.stringify(response))
        let origins = response.originAddresses;
        let destinations = response.destinationAddresses;
        // do something with the response
        const [something] = response.rows
        const element = response.rows[0].elements[0]

        let distance = element.distance.text;
        let duration = element.duration.text;

        document.getElementById("distance_output").textContent = distance
        document.getElementById("time_output").textContent = duration
    }
}

function codeAddress() {
    let geocoder = new google.maps.Geocoder();
    let start = document.getElementById('startLocation').value;
    let end = document.getElementById('destination').value;

    getAddress(geocoder, start, function (startResult) {
        console.log("startResult " + JSON.stringify(startResult))
        getAddress(geocoder, end, function (endResult) {
            console.log("endResult " + JSON.stringify(endResult))
            calcDistance(startResult, endResult);
        });
    });
}

function getAddress(geocoder, loc_name, callback) {
    let startLocation;
    geocoder.geocode({ 'address': loc_name }, function (results, status) {
        if (status == 'OK') {
            startLocation = results[0].geometry.location
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
        callback(startLocation)
    });
}

function clearRoute() {
    document.getElementById("clear_btn").style.display = "none";
    document.getElementById("startLocation").value = "";
    document.getElementById("destination").value = "";
    // document.getElementById("list-group").value = "";
    directionsDisplay.setDirections({ routes: [] });

}

function handleYelpRequest() {
    const request = {
        method: "GET",
    }
    fetch(`/location`, request)
        .then(resp =>
            resp.json()
        )
}
handleYelpRequest()
