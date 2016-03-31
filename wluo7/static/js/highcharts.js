
// Global variable for Highchart
var charts = [];
var urls = [];
var current = 0;
/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {

    // Cycle back to update first chart
    if (current >= charts.length) {
        current = 0;
    }

    // If chart not yet loaded, wait for it to load first
    if (charts[current] === undefined || urls[current] === undefined) {
        console.log('Chart not yet loaded, try later.')
        setTimeout(requestData, 1000);
        return;
    }

    // Asychronous call to update data
    $.ajax({
        url: urls[current],
        success: function(point) {
            var series = charts[current].series[0];
            // shift if the series is longer than 20
            var shift = series.data.length > 35;

            // add the point in the form of [time in miliseconds, y-axis value]
            charts[current].series[0].addPoint(point, true, shift);

            // process next chart on next call
            current = current + 1;

            // call it again after half of a second
            setTimeout(requestData, 500);
        },
        error: function(jqXHR, textStatus, errorThrown){
            // move on to the next chart to update
            current = current + 1;

            // report fail message
            console.log(testStatus)
        },
        cache: false
    });
}


// add a new highchart
function addChart(chartName, dataUrl, htmlTag) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: htmlTag,
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: chartName
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
    charts.push(chart);
    urls.push(dataUrl);
}

$(document).ready(function() {
    addChart('Live Gyroscope Data', '/gyro-data', 'data-container1');
    addChart('Live Accelerometer Data', '/acce-data', 'data-container2');
});