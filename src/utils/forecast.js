const request = require("request")

const forecast = (lat, long, callback) => {
    const URL = "http://api.openweathermap.org/data/2.5/weather?lat="+encodeURIComponent(lat)+"&lon="+encodeURIComponent(long)+"&appid=ebd99c825d0f0e7eb4260bf7b6c577e5&units=metric"
    request({ url: URL, json: true}, (error, {body} = {}) =>{
            if(error)
                callback("Unable to connect to weather service", undefined)
            else if(body.message)
                callback("Incorrect Information submitted", undefined)
            else{
            callback(undefined , { weather: body.weather[0].description,
                                   temperature: body.main.temp , 
                                   humidity: body.main.humidity,
                                   feelslike: body.main.feels_like})
            }
        })
}

module.exports = forecast