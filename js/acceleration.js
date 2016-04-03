
$(function() {
 
    
    $('#acceleration').hide();
    $('#accelerationEnabled').click(function() {
        if($(this).is(":checked")) {
                    $('#acceleration').show();
                        } else {
                                    $('#acceleration').hide();
                                        }
    });

   var data=[]
    Highcharts.setOptions({
        global:{
            useUTC:false
        }
    });


    $('#acceleration').highcharts('StockChart', {
        chart:{
            events:{
                load:function(){
                    var series = this.series[0];
                    setInterval(function(){
                        var x = (new Date()).getTime(),
                            y = 15+Math.round(Math.random()*10);
                        series.addPoint([x,y],true,true);
                    },1000);
                }
            }
        },

        rangeSelector:{
            buttons: [{
                count:1,
                type:'second',
                text:'Cur'
            }, {  
                count:1,
                type:'minute',
                text:'1min'
            }, {
                count:5,
                type:'minute',
                text:'5min'
            }, {
                type:'all',
                text:'All time'
            }        
                     ],
            inputEnabled: false,
            selected:0
            },


        title:{
            text:data[0]
        },

        exporting:{
            enabled:true
        },

        series:[{
            name:'acceleration',
            step:true,
            data: (function(){
                var time = (new Date()).getTime,i;
                for (i = -999;i<=0;i+=1) {
                    data.push([
                        time+i*1000,
                        0
                    ]);
                }
                return data;
            }())
        }]
    });
});


