/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=768943ec3925e106a5fb95bd6f650dde';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(){
    const newZipCode =  document.getElementById('zip').value;
    //make an API call
    getZipCode(baseURL,newZipCode, apiKey)
    //after a successful call
    .then(function(data){
      console.log(data)
     //add data to POST request
     postData('/addCity', {newDate: newDate, temp: data.temp, content: data.content, newZipCode: newZipCode})
    })
    .then(
      retrieveData()
    )};

/* Function to GET Web API Data*/
const getZipCode = async (baseURL, zip, key)=>{
    //call the web API
    const res = await fetch(baseURL+zip+key)
    try {
      const data = await res.json();
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


/* Function to POST data */
const postData = async (url= '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(data),
  });

  try{
    const newData = await response.json();
    return newData;
  }catch(error){
    console.log("Error: " , error);
  }
}


/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('date').innerHTML =allData.newDate;
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
  document.getElementById('content').innerHTML = allData.content;
  document.getElementById('zip').innerHTML = allData.newZipCode;
  }
  catch(error) {
    console.log("Error: ", error);
    // appropriately handle the error
  }
 }