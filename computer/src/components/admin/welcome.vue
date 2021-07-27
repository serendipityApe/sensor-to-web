<template>
<el-col :span="12">

<el-card class="box-card" >
    <div slot="header" class="clearfix">
    <span>机房温度</span>
    <div style="float:right">
        <span>制冷:</span>
        <el-switch
        v-model="cooling"
        active-color="#13ce66"
        >
        </el-switch>
    </div>
    
    </div>
    <div id="myChart" :style="{width: '500px', height: '300px'}"></div>
</el-card>
</el-col>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
        lockReconnect: false,
        wsCfg: {
            // websocket地址
            url: "ws://127.0.0.1:8010"
        },
        socket:{},
        tmp:{
          num: 5,
          time:[],
          msg:[]
        },
    }
  },
  mounted(){
    this.drawLine(this.tmp);
    this.createWebSocket();
  },
  methods: {
     drawLine(tmp){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: tmp.time,
            axisTick:{
                show:true,
                alignWithLabel: true
            },
            boundaryGap: false, //靠近最左边
          },
          yAxis: {
              type: 'value',
              name:'单位：℃'
          },
          series: [{
              data: tmp.msg,
              type: 'line',
              smooth: true,
              areaStyle:{
                  color: '#F7B851',
                  opacity: 0.5
              },
              lineStyle:{
                  color: '#F7B851'
              },
              symbol: "none"
          }],
            tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    // color:
                }
            }
        }
        });
    },
    processData(data){
        let arr=data.split('&');
        let time=this.tmp.time;
        let msg=this.tmp.msg;
        if(time.length<this.tmp.num){
            time.push(arr[0]);
            msg.push(arr[1]);
        }else{
            time.shift();
            time.push(arr[0]);
            msg.shift();
            msg.push(arr[1]);
        }
    },
    createWebSocket() {
            try {
                // 创建Web Socket 连接
                this.socket = new WebSocket(this.wsCfg.url);
                // 初始化事件
                this.initEventHandle(this.socket);
            } catch (e) {
                // 出错时重新连接
                this.reconnect(this.wsCfg.url);
            }
    },
    initEventHandle(socket) {
        // 连接关闭时触发
        socket.onclose = () => {
            console.log("连接关闭");
        };
        // 通信发生错误时触发
        socket.onerror = () => {
            // 重新创建长连接
            this.reconnect();
        };
        // 连接建立时触发
        socket.onopen = () => {
            console.log("连接成功");
        };
        var arrTime=[];
        // 客户端接收服务端数据时触发
        socket.onmessage = msg => {
            // 业务逻辑处理
            this.processData(msg.data);
            // arrTime.add(msg);
        };
    },
    reconnect() {
        if (this.lockReconnect) {
            return;
        }
        this.lockReconnect = true;

        // 没连接上会一直重连，设置延迟避免请求过多
        setTimeout(() => {
            this.lockReconnect = false;
            this.createWebSocket(this.wsCfg.url);
        }, 2000);
    },
    test() {
        // 给服务器发送一个字符串:
        // ws.send("Hello!");
        this.socket.send("Hello!");
    }
  },
  computed:{
      cooling: function (){
          let tmp=this.tmp.msg;
          if(tmp.length<this.tmp.num){
              return false;
          }else{    
              if(tmp[4]>31){
                  return true;
              }
          }
      }
  },
  watch:{
      tmp:{
          deep:true,
          handler(newData,oldData){
              this.drawLine(newData);
          }
      }
  }
}
</script>

<style scoped>

</style>