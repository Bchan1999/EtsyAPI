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

//homepage path
app.get('/', (req,res) => {
    res.json('Welcome to my Etsy API')
})

//Etsy displays the featured items first in a shop
app.get('/featuredItems', (req,res) => {
    axios.get('https://www.etsy.com/ca/shop/TheNeedleNanny?ref=simple-shop-header-name&listing_id=1159865656')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('div.featured-listings a', html).each(function () {
            const item  = $(this).attr('title')
            const url =$(this).attr('href')
            const img = $('div.featured-listings img').attr('src')
            products.push({
                item,
                url,
                img
            })
        })
        res.json(products)
    }).catch((err) => console.log(err))
})

app.get('/reviews', (req,res) => {
    axios.get('https://www.etsy.com/ca/shop/TheNeedleNanny?ref=simple-shop-header-name&listing_id=1159865656')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('div.review-item .screen-reader-only', html).each(function () {
            const stars  = $(this).text
            products.push({
                stars
            })
        })
        res.json(products)
    }).catch((err) => console.log(err))
})

//check to make sure backend is working
app.listen(PORT, () => console.log(`${PORT}`))