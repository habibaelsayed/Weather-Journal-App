/* Global Variables */
const server = 'http://localhost:3000';
const api_url = "https://api.openweathermap.org/data/2.5/weather?zip={__ZIP__}&appid=eb27c81cc0c30ffc3ab76ed15dd7449e&units=imperial";

function getDate(){
    /*
    ** Create a new date instance dynamically with JS
    */
    let dateObj = new Date();
    let date = `${dateObj.getMonth()+1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
    return date;
}

const getAPIInfo = async (api_url, zip_code)=>{
    let response = await fetch(api_url.replace("{__ZIP__}", zip_code));
    try {
        let data = await response.json();
        return data;
    } catch(error) {
        console.log('Error:\n', error);
    }
}

const postData = async ( url = '', data = {})=>{
    // Sending POST request to the node server
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
    });

    try {
        let serverResponse = await response.json();
        console.log("I'm From postData:\n", serverResponse);
        return serverResponse;
    }catch(error) {
        console.log("Error FROM postData fn\n", error);
    }
  };

const displayUserInputs = async (url='') => {
    /*
    Display user input in the result text area :)
     */
    const request = await fetch(url);
    try{
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML= `User feelings: ${data.userResponse}`;
    }catch (error){
        console.log("Error I'm from displayUserInputs function\n", error);
    }
}

function generateButtonAction(){
    const _zipCode = document.getElementById('zip').value;
    const _userFeeling = document.getElementById('feelings').value;
    getAPIInfo(api_url, _zipCode).then(apiResponse =>{
        const temp = apiResponse['main']['temp'];
        let requiredData = {temperature: temp, date: getDate(), userFeeling: _userFeeling };
        postData(server+'/postData', { temperature: requiredData.temperature, date: requiredData.date, userResponse: requiredData.userFeeling})
            .then(displayUserInputs(server+'/getData'));
    });
}






