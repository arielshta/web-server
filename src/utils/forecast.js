const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5132ed371d14b2cf1751c30d33ada47d&query=' + 
                       latitude + ',' + longtitude + '&units=m'

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, ' The temperature is: ' + 
                     body.current.temperature + 
                     ' degress out. and feels like: ' + 
                     body.current.feelslike + 
                     ' degress out.' +
                     ' The humidity level is: ' +
                     body.current.humidity + '%' +
                     ' and the wind speed is: ' +
                     body.current.wind_speed + '.')
        } 
    })
}

module.exports = forecast