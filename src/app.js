const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Set up static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ariel Shtauber'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ariel Shtauber'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Ariel Shtauber', 
        massage: 'This is help page, please contact us!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, forecast) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help',
        massage: 'Help article not found',
        name: 'Ariel Shtauber'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404 - Page',
        massage:'This page is not exist!',
        name: 'Ariel Shtauber'
    })
})

app.listen(3000, () => {
    console.log('Server is app on port 3000')
})