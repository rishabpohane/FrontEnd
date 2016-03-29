
// Global variable for Highchart
var chart1, chart2;

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {
    $.ajax({
        url: '/live-data',
        success: function(point) {
            var series1 = chart1.series[0];
            var series2 = chart2.series[0],
            // shift if the series is longer than 20
            shift1 = series1.data.length > 20;
            shift2 = series2.data.length > 20; 

            // add the point in the form of [time in miliseconds, y-axis value]
            chart1.series[0].addPoint(point, true, shift1);
            chart2.series[0].addPoint(point, true, shift2);
            // call it again after half of a second
            setTimeout(requestData, 500);
        },
        cache: false
    });
}

function addChart() {
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container1',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Live pre-recoreded test data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            id: 'y',
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Sensor Value',
                margin: 80
            }
        },
        series: [{
            name: 'pre-recorded data',
            data: []
        }]
    });
    chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container2',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Live pre-recoreded test data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            id: 'y',
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Sensor Value',
                margin: 80
            }
        },
        series: [{
            name: 'pre-recorded data',
            data: []
        }]
    });
}

$(document).ready(function() {
    addChart();
});