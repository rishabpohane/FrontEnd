$(document).ready(function() {
    
    addSpline('Distance Data', '/data/distance', 'data-container1');
    addSpline('Gyroscope Data', '/data/gyroscope', 'data-container2');
    addSpline('Accelerometer Data', '/data/accelerometer', 'data-container3');
    addSpline('Temperature Data', '/data/temperature', 'data-container4');
    //addGauge('Live Gyroscope Data', '/data/gyroscope', 'data-container4');
    //addGauge('Live Gyroscope Data', '/data/gyroscope', 'data-container5');
    //addSpline('Live Accelerometer Data', '/data/accelerometer', 'data-container6');
    requestData();

});