var mqtt  = require('mqtt');
///开通客户端
exports.CreateClient = (callback)=>
{
    for(var i = 0; i <1;i++){  
        var client  = mqtt.connect('mqtt://192.168.1.31',{  
            username:'',  
            password:'',  
            clientId:'app_13800000000_'+i  
        });  
      
        client.on('connect', function () {  
            console.log('connected.....');  
            client.subscribe('#');  
            //client.publish('app2dev/', 'Hello mqtt');  
        });  
      
        client.on('message', function (event,topic, message) {  
            callback(topic,message);
            // message is Buffer  
            console.log(message.toString());  
            //client.end();  
        });  
    }
}