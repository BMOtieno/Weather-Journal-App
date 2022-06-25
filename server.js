// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

// Spin up the server
const server = app.listen(port, ()=>{console.log(`Server running on localhost: ${port}`)});

// Callback function to complete GET '/all'
app.get('/all', getData)

function getData(request, response){
    response.send(projectData)
    console.log(projectData)
}

// Post Route
const cityData = [];

app.post('/addCity', addCity);

function addCity(request, response){

    newEntry = {
        newDate: request.body.newDate,
        temp: request.body.temp,
        content: request.body.content,
        newZipCode: request.body.newZipCode
    }
    cityData.push(newEntry)
    response.send(cityData)
    console.log(cityData)
}
  