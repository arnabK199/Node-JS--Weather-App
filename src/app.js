const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getCode = require('./utils/getCode');
const getForecast = require('./utils/getForecast');

const app = express()

// Define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partailsPath = path.join(__dirname, '../templates/partials');

// Telling Express which templating engine we are using
app.set('view engine','hbs');

// Setting the path for view
app.set('views', viewsPath);

// Setting up the partails
hbs.registerPartials(partailsPath);

// Setting up the static directory
app.use(express.static(publicDirectory));

// Commenting the default route, help and about route as html is taking care of those routes

// app.get('',(req, res)=>{
//     res.send('Hello Express !!')
// })

// app.get('/help',(req, res)=>{
//     res.send('Help Page !!')
// })

// app.get('/about',(req, res)=>{
//     res.send('<h1>About<h1>')
// })

// This will take the content from index.hbs and not index.html
app.get('',(req, res)=>{
    res.render('index',{
        title:'My App',
        name: 'Arnab'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name: 'Maya Kundu'
    })
})

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        }) 
    }

    getCode(req.query.address,(error, {location, latitude, longitude } = {})=>{
        if(error){
            return res.send({
                error
            })
        }

        getForecast(req.query.address, (forecastError, forecastData) => {

            if(forecastError){
                return res.send({
                    error:forecastError
                })
            }

            return res.send({
                weather:forecastData,
                location,
                address:req.query.address
            })

        })
    })

    // res.send({
    //     location:'Philadelphia',
    //     forcast:'Its sunny and clear skies',
    //     address: req.query.address
    // })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name: 'Arnab',
        message:'This is Help Page'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title: '404',
        message: 'Help article not found!!',
        name: 'Arnab'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title: '404',
        message: 'Page Not Found',
        name: 'Arnab'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3001,()=>{
    console.log('Server Started')
})