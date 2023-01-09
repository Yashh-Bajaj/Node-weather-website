const request = require("request");
const geocode = (address,callback) =>{
    const url = `https://api.tomtom.com/search/2/geocode/${address}.json?key=uU3PI41GuMn1CyrNG76huoeoqmbMuqlJ&limit=1`
    request({url:url,json:true},(error,response)=>{
         if (error) {
             callback('Unable to connect to location services!',undefined)
         }
         else if(response.body.results.length===0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.results[0].position.lat,
                longitude:response.body.results[0].position.lon,
                location:response.body.results[0].address.freeformAddress
            })
        }
        
    })
}
module.exports = geocode