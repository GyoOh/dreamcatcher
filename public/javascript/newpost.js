

const getRestaurant = async () => {
    let url = new URL(`https://api.yelp.com/v3/businesses/search?term=chicken&latitude=49.2827&longitude=-123.1207`)
    let header = new Headers({
        "Authorization": `Bearer ROF0HVCZJhK3MOwM_BdaB_bIodzpNbWdhHMDsXZxF7bRg35xwwQRscs_ZJQdV7HKKonIdb5iyHpfY-sabDbugiUfBkDDg4tVymAhpAx7Rs8ratmrpPnMW3hqMtSJYnYx`,
    })
    let response = await fetch(url, { headers: header })
    let data = await response.json()
    console.log(data)
}
getRestaurant()

