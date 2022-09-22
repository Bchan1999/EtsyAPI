//NOTE: "nodemon index.js" script is used for start command. Listens
//for any changes

//packages
const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

//creates an express application ex: app.use
const app = express()
const products = []
const reviews =[]
const s = []

let i = 0
let x = 0

//homepage path
app.get('/', (req,res) => {
    res.json('Welcome to my Etsy API')
})

//Endpoint. Etsy displays the featured items first in a shop
app.get('/featuredItems', (req,res) => {
    axios.get('https://www.etsy.com/ca/shop/TheNeedleNanny?ref=simple-shop-header-name&listing_id=1159865656')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('div.featured-listings a', html).each(function () {
            const item  = $(this).attr('title')
            const url =$(this).attr('href')
            products.push({
                item,
                url
            })
        })
        $('div.featured-listings img', html).each(function () {
            const img = $(this).attr('src')
            products[i]['img'] = img
            i++
        })
        res.json(products)
    }).catch((err) => console.log(err))
})

app.get('/reviews', (req,res) => {
    axios.get('https://www.etsy.com/ca/shop/TheNeedleNanny?ref=simple-shop-header-name&listing_id=1159865656')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('.reviews-section .shop2-review-attribution a', html).each(function () {
            const user = $(this).text()
            reviews.push({
                user
            })
        })
        $('.reviews-section .stars-svg .screen-reader-only', html).each(function () {
            const stars = $(this).text()
            // reviews[x]['stars'] = stars
            // x++
        })
        res.json(s)
    }).catch((err) => console.log(err))
})

//check to make sure backend is working
app.listen(PORT, () => console.log(`${PORT}`))