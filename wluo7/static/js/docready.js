$(document).ready(function() {
    
    addSpline('Distance Data', '/data/distance', 'data-container1');
    addMeter('Gyroscope Data', '/data/gyroscope', 'data-container2');
    //addSpline('Live Accelerometer Data', '/data/accelerometer', 'data-container2');
    //addGauge('Live Gyroscope Data', '/data/gyroscope', 'data-container3');
    //addGauge('Live Gyroscope Data', '/data/gyroscope', 'data-container4');
    //addGauge('Live Gyroscope Data', '/data/gyroscope', 'data-container5');
    //addSpline('Live Accelerometer Data', '/data/accelerometer', 'data-container6');
    requestData();

});