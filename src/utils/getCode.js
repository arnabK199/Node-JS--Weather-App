const request = require('request');

const getCode=(location,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?limit=1&access_token=pk.eyJ1IjoiYXJuYWJrMTk5NiIsImEiOiJja2NwdXJjbzAwa3VhMnh0NnFlaHh3OWl1In0.QOJSiFS2QnM_qsSjcfbBfQ';

    request({url},(error,response)=>{

        let data = null;
        if(response){
            data= JSON.parse(response.body);
        }

        if(error){
            callback('Network Error. Unable to fetch the Weather.', undefined)
        }else if(data.features.length == 0){
            callback('Latitude and Longitude for the given location not found. Please try a different location', undefined);
        }else{
            callback(undefined, {
                location:data.features[0].place_name,
                latitude:data.features[0].center[0],
                longitude: data.features[0].center[1]
            })
        }
    })
}

module.exports = getCode