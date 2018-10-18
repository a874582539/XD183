<template>
    <div class="mpp-all">
        <div class="mp-title">{{ title }}</div>
        <div class="eLine">
            <div id="chartLine"  style="height: 23rem;background-color: #010916"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    
    export default {
        name: "eline",
        data(){
            return{
                title: '当日人流分析',
                drawLines: null,
                data:[],
                timeChecked: [],
                waiting:[],
                reservation:[],
                handleSuccess:[],
                 interval: -1,                
            }
        },
        created(){
            this.getBDLine()
           this.drawLine()
        },
        watch:{
            reservation:{
                handler(newValue, oldValue){
                   this.getBDLine()
                    this.drawLine()
　　　      　}
            },
             waiting:{
                handler(newValue, oldValue){
                   this.getBDLine()
                    this.drawLine()
　　　      　}
            },
             handleSuccess:{
                handler(newValue, oldValue){
                   this.getBDLine()
                    this.drawLine()
　　　      　}
            },

        },
        methods:{
            getTime(){
                // 获取当前时间的方法
                let time = new Date();
                
              
                let seperator1= '-';
                let seperator2= ':';
                let month = time.getMonth() +1;
                let strDate = time.getDate();
                if(month>=1 && month<=9){
                    month = '0'+ month;
                }
                if(strDate>=0 && strDate<=9){
                    strDate = '0'+ strDate;
                }
                let currentdate = time.getFullYear() + seperator1 + month + seperator1 + strDate + " "+ time.getHours() + seperator2 + time.getMinutes() + seperator2 + time.getSeconds();
                     
                return currentdate;
                console.log(currentdate);
                
            },
            //获取当前5分钟之前的时间
             getNowFormatDate() {
                    var date = new Date();
                    var seperator1 = "-";
                    var seperator2 = ":";
                    //前5分钟时间
                    var minutes=parseInt("5");  

                    var  interTimes=minutes*60*1000;

                    var interTimes=parseInt(interTimes);  
                    date=new   Date(Date.parse(date)-interTimes);
                    
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    if (hour >= 0 && hour <= 9) {
                            hour = "0" + hour;
                    }
                    if (minutes >= 0 && minutes <= 9) {
                            minutes = "0" + minutes;
                    }
                    var currentdatefix = date.getFullYear() + seperator1 + month + seperator1 + strDate
                            + " " + hour + seperator2 + minutes
                            + seperator2 + date.getSeconds();
                            console.log(currentdatefix);
                            
                    return currentdatefix;
           
                  
            },
            getBDLine(){
            
              this.interval= setInterval(()=>{
                     const url =`todayHumanFlow/2018-10-12 10:20:45/2018-10-12 10:26:50`
                     this.$axios.get(url).then(res=>{
                       
                        
                       this.reservation.push(res.data.data.reservation)
                       this.waiting.push(res.data.data.waiting)
                       this.handleSuccess.push(res.data.handleSuccess)
                         
                            this.drawLines.setOption({
                                 series: [
                          {
                            name: '预约人数',
                            type: 'line',
                            xAxisIndex: 1,
                            smooth: true,
                            data:this.reservation
                          },
                          {
                             name: '已受理人数',
                            type: 'line',
                            smooth: true,
                            data: this.handleSuccess
                                
                            
                         },
                         {
                            name: '排队人数',
                            type: 'line',
                            smooth: true,
                            data: this.waiting
                            
                            
                        }
                    ]
                            })
                       
                    })    
                },1000000)
                
                
                
             },
            drawLine() {
                this.drawLines= echarts.init(document.getElementById('chartLine'));
                this.drawLines.setOption({
                    color:['#2993ff','#2adeff', '#01fd78', '#d2922c'],
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        textStyle: {color: "0"},
                        data: ['预约人数', '排队人数', '已受理人数']
                    },
                    grid: {
                        top: 70,
                        borderColor: "none",
                        show: true,
                        backgroundColor: "rgba(2,10,30,.05)",
                        bottom: 50
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true,
                                lineStyle: {color: "#e7e9ec"},  //时间刻度线
                            },
                            axisLabel:{color:"#e3e3e3",interval: 11},
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    //   color: colors[1]
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                color:"rgba(2,10,30,.3)",
                                type:"dotted"
                                }
                            },
                            name:"时间",
                            nameTextStyle:{color:"#f9f9f9"},
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '已成功受理' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data + "人" : '');
                                    }
                                }
                            },
                            data: [
                                "8:00",'8:05','8:10','8:15','8:20','8:25','8:30','8:35','8:40','8:45','8:50','8:55',
                                "9:00",'9:05','9:10','9:15','9:20','9:25','9:30','9:35','9:40','9:45','9:50','9:55',
                                "10:00",'10:05','10:10','10:15','10:20','10:25','10:30','10:35','10:40','10:45','10:50','10:55',
                                "11:00",'11:05','11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45','11:50','11:55',
                                "12:00",'12:05','12:10','12:15','12:20','12:25','12:30','12:35','12:40','12:45','12:50','12:55',
                                "13:00",'13:05','13:10','13:15','13:20','13:25','13:30','13:35','13:40','13:45','13:50','13:55',
                                "14:00",'14:05','14:10','14:15','14:20','14:25','14:30','14:35','14:40','14:45','14:50','14:55',
                                "15:00",'15:05','15:10','15:15','15:20','15:25','15:30','15:35','15:40','15:45','15:50','15:55',
                                "16:00",'16:05','16:10','16:15','16:20','16:25','16:30','16:35','16:40','16:45','16:50','16:55',
                                "17:00",'17:05','17:10','17:15','17:20','17:25','17:30','17:35','17:40','17:45','17:50','17:55',
                                "18:00"
                            ]
                        },
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                //color: colors[0]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '预约人数  ' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data + "人" : '');
                                    }
                                }
                            },
                            data: [
                                "8:00",'8:05','8:10','8:15','8:20','8:25','8:30','8:35','8:40','8:45','8:50','8:55',
                                "9:00",'9:05','9:10','9:15','9:20','9:25','9:30','9:35','9:40','9:45','9:50','9:55',
                                "10:00",'10:05','10:10','10:15','10:20','10:25','10:30','10:35','10:40','10:45','10:50','10:55',
                                "11:00",'11:05','11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45','11:50','11:55',
                                "12:00",'12:05','12:10','12:15','12:20','12:25','12:30','12:35','12:40','12:45','12:50','12:55',
                                "13:00",'13:05','13:10','13:15','13:20','13:25','13:30','13:35','13:40','13:45','13:50','13:55',
                                "14:00",'14:05','14:10','14:15','14:20','14:25','14:30','14:35','14:40','14:45','14:50','14:55',
                                "15:00",'15:05','15:10','15:15','15:20','15:25','15:30','15:35','15:40','15:45','15:50','15:55',
                                "16:00",'16:05','16:10','16:15','16:20','16:25','16:30','16:35','16:40','16:45','16:50','16:55',
                                "17:00",'17:05','17:10','17:15','17:20','17:25','17:30','17:35','17:40','17:45','17:50','17:55',
                                "18:00"
                            ]
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name:"人数",
                            nameLocation:'end',
                            nameTextStyle:{color:"#f9f9f9"},
                            axisLabel:{color:"#e3e3e3"},   
                            splitLine: {
                                show: true,
                                lineStyle: {
                                color:"rgba(255,255,255,.3)",
                                type:"dotted"
                                }
                            }
                        }
                    ],
                    // series: [
                    //     {
                    //         name: '预约人数',
                    //         type: 'line',
                    //         xAxisIndex: 1,
                    //         smooth: true,
                    //         data:this.reservation
                    //     },
                    //     {
                    //         name: '已受理人数',
                    //         type: 'line',
                    //         smooth: true,
                    //         data: [
                                
                    //         ]
                    //     },
                    //     {
                    //         name: '排队人数',
                    //         type: 'line',
                    //         smooth: true,
                    //         data: [
                            
                    //         ]
                    //     }
                    // ]
                });
            
               
            },    
            drawCharts(){
                this.drawLine()
            }
        },
        mounted(){
            this.drawCharts();
            
        },
        updated(){
            this.drawCharts();
        },
        beforeDestroy() {
        clearInterval(this.interval)
         },
    }
</script>

<style scoped>

</style>