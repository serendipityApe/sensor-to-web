var SerialPort = require("serialport"); //引入模块
var Temp = require('../db/model/temp')
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
var portName = 'COM7'; //定义串口名

var flag=false;
var serialPort = new SerialPort(
"COM7", {
baudRate: 9600, //波特率
dataBits: 8, //数据位
parity: 'none', //奇偶校验
stopBits: 1, //停止位
flowControl: false,
autoOpen:false
}, false);
serialPort.open(function (error) {
if (error) {
console.log("打开端口" + portName + "错误：" + error);
} else {
console.log("打开端口成功，正在监听数据中");
setInterval(async function(){
        flag=true;  
},3000)
serialPort.on('data',async function(data){
    console.log(data.toString());
    if(flag){
        let temp=data.toString();
        let tempAdd=await Temp.insertMany({temp,now:getTimeInfo(getNowSceond())})
        if(tempAdd){
            console.log(tempAdd)
            flag=false;
            // ctx.body = {
            //     code: 0,
            //     msg: '注册成功',
            //   }
        }else{
            console.log('添加失败')
            // ctx.body = {
            //     code:-1,
            //     msg: '注册失败'
            // }
        }
    }else{

    }
    })
}
});