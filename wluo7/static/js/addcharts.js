
// Global variable for Highchart
var charts = [];
var urls = [];
var current = 0;

/**
 * Request data from the server for all charts one at a time, add it to the graph and set a timeout
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
        setTimeout(requestData, 100);
        return;
    }

    // Asychronous call to update data
    $.ajax({
        url: urls[current],
        success: function(point) {
            if (charts[current] === undefined || charts[current].series === undefined) {
                console.log('Chart data series not yet loaded, try later.')
                setTimeout(requestData, 50);
                return;
            }
            
            var series = charts[current].series[0];
            // shift if the series is longer than 20
            var shift = series.data.length > 35;
            
            // add the point in the form of [time in miliseconds, y-axis value]
            if (charts[current].options.chart.type == 'spline') 
                charts[current].series[0].addPoint(point, true, shift);
            
            if (charts[current].options.chart.type == 'gauge') 
                charts[current].series[0].points[0].update(point[1]);

            // process next chart on next call
            current = current + 1;

            // call it again after half of a second
            setTimeout(requestData, 50);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("AJAX update failed.")
            // move on to the next chart to update
            current = current + 1;
            setTimeout(requestData, 100);
            // report fail message
            console.log(errorThrown)
        },
        cache: false
    });
}


// add a new spline highchart
function addSpline(chartName, dataUrl, htmlTag) {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: htmlTag,
            type: 'spline',
            spacingLeft: 0
           // events: {
        //        load: requestData
        //    }
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
            minPadding: 0.0,
            maxPadding: 0.0,
            title: {
                text: 'Senslue',
                margin: 15
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

// add a new angular gauge highchart
function addGauge(chartName, dataUrl, htmlTag) {
    var chart = new Highcharts.Chart({
        chart: {
            type: 'gauge',
            renderTo: htmlTag,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: chartName
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 200,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [{
                from: 0,
                to: 120,
                color: '#55BF3B' // green
            }, {
                from: 120,
                to: 160,
                color: '#DDDF0D' // yellow
            }, {
                from: 160,
                to: 200,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: ' km/h'
            }
        }]
    });
    charts.push(chart);
    urls.push(dataUrl);
}

function addMeter(chartName, dataUrl, htmlTag) {
    var chart = new Highcharts.Chart({
         chart: {
                    type: 'gauge',
                    renderTo: htmlTag,
                    plotBorderWidth: 1,
                    plotBackgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF4C6'],
                            [0.3, '#FFFFFF'],
                            [1, '#FFF4C6']
                        ]
                    },
                    plotBackgroundImage: null,
                    height: 200
                },

                title: {
                    text: chartName
                },

                pane: {
                    startAngle: -80,
                    endAngle: 80,
                    background: null,
                    center: ['50%', '90%'],
                    size: 180
                },

                tooltip: {
                    enabled: false
                },

                yAxis: {
                    min: 0,
                    max: 100,
                    minorTickPosition: 'outside',
                    tickPosition: 'outside',
                    labels: {
                        rotation: 'auto',
                        distance: 15
                    },
                    plotBands: [{
                        from: 0,
                        to: 40,
                        color: '#C02316',
                        innerRadius: '100%',
                        outerRadius: '105%'
                    }],
                    pane: 0,
                    title: {
                        text: 'Distance Sensor 1',
                        y: 0
                    }
                },

                plotOptions: {
                    gauge: {
                        dataLabels: {
                            enabled: false
                        },
                        dial: {
                            radius: '90%'
                        }
                    }
                },
                series: [{
                    name: 'Channel A',
                    data: [-20],
                    yAxis: 0
                }]
    })
    charts.push(chart);
    urls.push(dataUrl);
}

