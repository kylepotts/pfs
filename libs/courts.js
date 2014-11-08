var async = require('async')
var request = require('request')


exports.getAllFoodItems = getAllFoodItems

exports.getFoodFreqs = getFoodFreqs

function getCounts(uri){
  console.log(uri)

  return function(callback){
    request(uri,handle(callback))
  }
}


function handle(callback){
  return function(err,response,body) {
    callback(err,JSON.parse(body))
  }
}



function getAllFoodItems(courts,month,numDays,year,callback){
  requests = []
  for(var i=1;i<numDays;i++){
    if(i<10){
      day = "0"+i
    } else{
      day = ""+i
    }
    uri = 'http://api.hfs.purdue.edu/menus/v2/locations/'+courts+'/'+month+'-'+day+'-'+year
    requests.push(getCounts(uri))
  }

  async.series(requests,callback)
}



function getFoodFreqs(courts,month,numDays,year,callback){
    freqs = {}
    getAllFoodItems(courts,month,numDays,year, function(err,result){


        for(var i=0; i<result.length; i++){
          meals = result[i].Meals
          for(var j=0; j<meals.length;j++){
            meal = meals[j]
            stations = meal.Stations
            for(var k=0; k<stations.length; k++){
              station = stations[k]
              items = station.Items
              for(var l=0; l<items.length; l++){
                item = items[l];
                if(item.ID in freqs){
                  freqs[item.ID][1]++
                } else {

                  freqs[item.ID] = [item.Name, 1]
                }
              }
            }
          }
        }
          sortedKeys = Object.keys(freqs).sort(function(a,b){return freqs[b][1]-freqs[a][1]})
          sortedList = []
          for(var i=0; i<sortedKeys.length; i++){
            key = sortedKeys[i]
            sortedList.push(freqs[key])
          }

          callback(err,sortedList)

    })

}
