<template>
    <div class="mpp-all left-box-03">
            <h2 class="mp-title">{{ tcTitle }}</h2>
        <div class="mp-table">
            <template>
                <el-table :data="tableData" style="width: 100%" min-height="500" size="mini">
                    <el-table-column prop="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" >
                    </el-table-column>
                    <el-table-column prop="yType" label="业务类型">
                    </el-table-column>
                    <el-table-column prop="waitTime" label="等待时间">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    import SockJS from  'sockjs-client';
    import  Stomp from 'stompjs';
    export default {
        name: "time-turn",
        data(){
            return{
                tcTitle: "当前大厅排队信息",
                stompClient:'',
                timer:'',
                tableData: [
                    {
                        name: '001',
                        index: '112',
                        yType: '5',
                        waitTime: '7min'
                    }
                ]
            }
        },
        methods:{
            headerStyle({row,rowIndex}){
                return 'table-th'
            },
            initWebSocket() {
            this.connection();
            let that= this;
            // 断开重连机制,尝试发送消息,捕获异常发生时重连
            this.timer = setInterval(() => {
                try {
                    that.stompClient.send("test");
                } catch (err) {
                    console.log("断线了: " + err);
                    that.connection();
                }
            }, 5000);
        },  
        connection() {
            // 建立连接对象
            let socket = new SockJS('http://10.200.10.117:8085/webSocketServer');
            // 获取STOMP子协议的客户端对象
            this.stompClient = Stomp.over(socket);
            // 定义客户端的认证信息,按需求配置
            // let headers = {
            //     Authorization:''
            // }
            // 向服务器发起websocket连接
            this.stompClient.connect({},() => {
                this.stompClient.subscribe('/topic/deviceStateInfo', (msg) => { // 订阅服务端提供的某个topic
                    console.log('广播成功')
                    console.log(msg);  // msg.body存放的是服务端发送给我们的信息
                });
                // this.stompClient.send("/app/chat.addUser",
                //     headers,
                //     JSON.stringify({sender: '',chatType: 'JOIN'}),
                // )   //用户加入接口
            }, (err) => {
                // 连接发生错误时的处理函数
                console.log('失败')
                console.log(err);
            });
        },    //连接 后台
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
        },  // 断开连接
    },
    mounted(){
        this.initWebSocket();
    },
    beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        this.disconnect();
        clearInterval(this.timer);
    }


 }
</script>

<style scoped>

</style>