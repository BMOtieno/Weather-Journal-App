// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=768943ec3925e106a5fb95bd6f650dde&units=imperial'; //&units=imperial to attain temp in Fahrenheit. ---> &units=metric gets temp in Celsius

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateData);

/* Function called by event listener */
function generateData(){
    const zip =  document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    //make an API call
    getZipCode(baseURL,zip, apiKey)
    //after a successful call
    .then(function(data){
      console.log(data)
     //add data to POST request
     postData('/output', {date: newDate, temp: data.main.temp, feel: feel})
    })
    .then(() => {
      retrieveData() 
    })      
};

/* Function to GET Web API Data*/
const getZipCode = async (baseURL, zip, key)=>{
    //call the web API
    const res = await fetch(baseURL+zip+key)
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

/* Function to POST data */
const postData = async (url= '', data = {}) => {
  console.log(data)
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
  document.getElementById('date').innerHTML =allData.date;
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
  document.getElementById('content').innerHTML = allData.feel;
  }catch(error) {
    console.log("Error: ", error);
    // appropriately handle the error
  }
 }
