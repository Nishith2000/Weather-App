request = require('request')

const geocode = (address, callback) => {
    const geocodeURL =  "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibmlzaGl0aDIwMDAiLCJhIjoiY2tlNTh1eGJhMTBpaTM3bjdhOWNsZzJiayJ9.CzVWFSMOsouG1yhKn2dXCQ"
    request({url: geocodeURL, json: true}, (error, {body} = {}) => {
        if(error)
            callback("Unable to connect with server", undefined)
        else if(body.message)
            callback("Incorrect Information submitted", undefined)
        else if(body.features.length===0)
            callback("PLace not Found", undefined)
        else
        {
        callback(undefined, { latitude: body.features[0].geometry.coordinates[1],
                              longitude:body.features[0].geometry.coordinates[0],
                            place_name: body.features[0].place_name }) 
        }
    })
}

module.exports = geocode