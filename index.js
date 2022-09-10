const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.get('/', (req,res) => {
    res.json('Welcome to my Etsy API')
})

app.get('/items', (req,res) => {
    
    axios.get('https://www.etsy.com/ca/shop/TheNeedleNanny?ref=simple-shop-header-name&listing_id=1159865656')
    .then((response) => {
        const html = response.data
        console.log(html)
    })
})

app.listen(PORT, () => console.log(`${PORT}`))