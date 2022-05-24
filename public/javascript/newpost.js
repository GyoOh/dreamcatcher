

const getRestaurant = async () => {
    let url = new URL(`https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=chicken&latitude=49.2827&longitude=-123.1207`)
    let header = new Headers({
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    })
    let response = await fetch(url, { headers: header })
    let data = await response.json()
    console.log(url)
}
getRestaurant()


// const header = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "Authorization": "Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx"
// }
// let body = JSON.stringify({
//     post_id
// });
// const request = {
//     url,
//     method: "POST",
//     headers: header,
//     body: body,
// }
// fetch(`/posts/${post_id}/like`, request)
//     .then(resp => resp.json())
//     .then((data) => {
//         console.log(data)
//     })
//     .catch(err => console.log(err))

