const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const dirPath = path.join(__dirname,"../public")
const viewsDir = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsDir)
app.use(express.static(dirPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
        return res.render('index', {title: "Weather",
        name: "Nishith"})
})

app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
        return res.send('index', {title: "Weather",
        name: "Nishith"})
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if(error)
             return res.send({title: "Weather",
             name: "Nishith" ,errorMessage: error, info: undefined, placeholders: undefined})
        else{
            forecast(latitude, longitude, (error, {weather, temperature, humidity, feelslike} = {}) => {
                if(error)
                    return res.send({title: "Weather",
                    name: "Nishith", errorMessage: error, info: undefined, placeholders: undefined})
                else
                    return res.send({title: "Weather",
                    name: "Nishith" , errorMessage: error, info: {place_name, weather, temperature, humidity, feelslike}})
        })
     } 
   })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: "Help",
        content: "This is the help page to help you use my application. Just enter your address in the search bar to a current weather forecast for your Area!!!!",
        name: "Nishith"})
    })

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        content: "This App gives Current Weather forecast for your Locality",
        name: "Nishith"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMess: "Help article not found",
        name: "Nishith"
    })
})

app.get('*', (req, res) =>{
    res.render("404", {
        title: "404",
        errorMess: "Page Not found",
        name: "Nishith"
    })
})

app.listen(port, () => {
    console.log("Server Running")
})