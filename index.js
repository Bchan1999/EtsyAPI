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

//homepage path
app.get('/', (req,res) => {
    res.json('Welcome to my Etsy API')
})

app.get('/items', (req,res) => {
    
    axios.get('https://www.etsy.com/ca/shop/TheNeedleNanny?ref=simple-shop-header-name&listing_id=1159865656')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('a.listing-link', html).each(function () {
            const item  = $(this).attr('title')
            const url =$(this).attr('href')
            products.push({
                item,
                url
            })

        })
        res.json(products)
    }).catch((err) => console.log(err))
})

//check to make sure backend is working
app.listen(PORT, () => console.log(`${PORT}`))