const request = require("request");

const getForecast = (location, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?location='+ encodeURIComponent(location) + '&aggregateHours=24&unitGroup=us&shortColumnNames=false&contentType=json&key=18ZXII904ZNEMENC2IBCA1DA1';

    request({url},(error, response)=>{

        let data= null;
        if(response){
            data = JSON.parse(response.body);
        }
        
        if(error){
            callback('Network Error. Unable to fetch the Weather.', undefined)
        }else if(data.errorCode){
            callback(data.message, undefined)
        }else{
            callback(undefined, `Today's temp is ${data.locations[location].currentConditions.temp} Degree Fahreinheit. There are ${data.locations[location].currentConditions.precip}% chances of rain. Today is ${data.locations[location].currentConditions.icon}. Current Humidity is ${data.locations[location].currentConditions.humidity} %. Heat-Index: ${data.locations[location].currentConditions.heatindex}`)
        }
    })
}

module.exports = getForecast