// 导入WebSocket模块:
const WebSocket = require('ws');
const Temp= require('../db/model/temp')

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 8010
});

function getNowSceond(){
	return Math.floor(Date.now() / 1000);
}

function getTimeInfo(nTimeStamps) {
    //转毫秒
    var date = new Date(nTimeStamps * 1000);
    //返回数据
    var now = {
        // nYear: date.getFullYear(),
        // nMonth: date.getMonth() + 1,
        // nDay: date.getDate(),
        nHour: date.getHours(),
        nMinutes: date.getMinutes(),
        nSeconds: date.getSeconds()
    };
    function addZero(data){
        if(data<10){
            return "0"+data;
        }else{
            return data;
        }
    }
    return addZero(now.nHour)+":"+addZero(now.nMinutes)+":"+addZero(now.nSeconds);
}

var  events = require('events');
var emitter = new events.EventEmitter();

var data;
setInterval(async ()=>{
    
    let getTemp=await Temp.findOne().sort({_id:-1})
    if(getTemp){
        data=getTemp.now+"&"+getTemp.temp
        emitter.emit('refresh', data);
        // console.log(getTemp+'111')
    }else{
        console.log('读取temp失败')
    }
    
},3000)
wss.on('connection', function (ws) {
    console.log(`已连接`);
    emitter.on('refresh', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(data, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});