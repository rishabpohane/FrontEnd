$(document).ready(function() {
    addSpline('Live Gyroscope Data', '/gyro-data', 'data-container1');
    addSpline('Live Accelerometer Data', '/acce-data', 'data-container2');
    addGauge('Live Gyroscope Data', '/gyro-data', 'data-container3');
    requestData();

});