<template>
    <div class="timeCheck">
        <h2 class="time" ref="time">2018-10-16 15:12</h2>
    </div>
</template>

<script>
    // import VueSocketio from 'vue-socket.io';
    // Vue.use(VueSocketio,'http://10.200.10.27:8085/webSocketServer');
    export default {
        name: "time-check",
        data() {
            return {
                id: ''
            }
        },
        // sockets:{
        //     connect(){
        //         this.id = this.$socket.id
        //     },
        //
        // },
        methods: {
            // getWebsocket(){
            //     let ws = new WebSocket('http://10.200.10.27:8085/webSocketServer');
            //     ws.onmessage = function(evt){
            //         let received_msg= evt.data;
            //         console.log(received_msg);
            //     }
            // }
        },
        mounted() {
            // this.getWebsocket()
        }
    }
</script>

<style scoped>
    .time{
        color: #fff;
        text-align: center;
        margin: 0;
        margin-bottom: 30px;
    }
</style>