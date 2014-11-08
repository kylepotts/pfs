var express = require('express');
var courts = require('../libs/courts')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('stats')
});

router.post('/',function(req,res){
  console.log("Got stuff!")
  console.log(req.body)
  month = req.body.month
  year = req.body.year
  court = req.body.court

  courts.getFoodFreqs(court,month,30,year,handleFreqs(res))

})


function handleFreqs(resp){
  return function (err,freqs){
    console.log(freqs)


    labels = []
    data = []
    for(var i=0; i<20; i++){
      labels.push(freqs[i][0])
      data.push(freqs[i][1])
    }
    resp.json({labels:labels,data:data})
  }
}

module.exports = router;
