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
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Most frequent food served at '+court + ' Dining court'
            },
            subtitle: {
                text: 'In ' + month + ' ' + year
            },
            xAxis: {
                categories: data.labels
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Times Served'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0">Served <b>{point.y:.1f} times</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Food',
                data: data.data

            },

            ]
        });





    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      console.log("err!")

    }
});

  console.log(court)
}
