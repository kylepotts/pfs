$(document).ready(function() {
// assuming the controls you want to attach the plugin to
// have the "datepicker" class set
$('#datepicker').Zebra_DatePicker({
  format: 'm Y',
  onSelect: onDateChosen,
});


});



function onDateChosen(format,date,dateObj,ref){
  console.log(format)

  split = format.split(" ")
  month = split[0]
  year = split[1]

  court = $('#courtSelect option:selected').text()

  var courtData = {month:month,year:year,court:court}


  $.ajax({
    url : "/stats",
    type: "POST",
    data : courtData,
    success: function(data, textStatus, jqXHR)
    {
        //data - response from server
        console.log(data)

        var myData = []
        var ticks = []
        for(var i=0; i<data.labels.length; i++){
          myData.push([i+1,data.data[i]])
          ticks.push([i+1,data.labels[i]])
        }
        console.log(myData)
        console.log(ticks)

        var Options = {
          xaxis:{
            ticks:ticks
          },
          bars:{
            align:"center",
            barWidth: 0.5

          }
        }



        $.plot($("#mycanvas"), [
             {
                 data: myData,
                 bars: { show: true, fill: 1, fillColor: "#757dad", align:"center" },
                 color: "#454d7d"
             }
       ],Options);




    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      console.log("err!")

    }
});

  console.log(court)
}
