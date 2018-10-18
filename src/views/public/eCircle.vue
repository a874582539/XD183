<template>
    <div class="mpp-all">
        <div class="mp-title">{{ title }}</div>
        <div class="eCircle">
            <div  class="top">
            <div><span class="n4"></span><span>超负荷</span></div>
            <div><span class="n5"></span><span>满负荷</span></div>
            <div><span class="n6"></span><span>正常</span></div>
            </div>
            <div id="circleChart" style="height: 300px;"></div>
            <div class="timed"><span>最短办证时间:</span><span class="n1"></span><span>{{ minWaitSeconds }}秒</span></div>
            <div class="timec">最长办证时间:<span class="n2"></span><span>{{ maxCertificationSeconds }}秒</span></div>
            <v-abnormal></v-abnormal>
        </div>
    </div>
</template>

<script>
    import abnormals from './abnormal.vue'
    import echarts from 'echarts'
    import { getBDefficiency } from "../../api/api";
    export default {
        name: "e-circle",
        data(){
            return{
                title: '大厅时效指数',
                drawCircles: null,
                number: '',
                maxCertificationSeconds: '',
                minWaitSeconds: '',
                timer: null
            }
        },
        components:{
            "v-abnormal":abnormals
        },
        methods:{
            getBDefficiencys(){
                getBDefficiency().then(res=>{
                    this.number = res.data.data.number;
                    this.maxCertificationSeconds = res.data.data.maxCertificationSeconds;
                    this.minWaitSeconds = res.data.data.minWaitSeconds;
                    // console.log(this.number,this.maxCertificationSeconds,this.minWaitSeconds);
                    this.drawCircle()
                })
            },
            drawCircle(){
                this.drawCircles = echarts.init(document.getElementById('circleChart'));
                this.drawCircles.setOption({
                    color:['#f00','#2adeff', '#01fd78', '#d2922c'],
                    // title:{
                    //     backgroundColor:'rgba(28,102,231,.8)',
                    //     top:0
                    //     },
                    tooltip: {
                        formatter: "{a} <br/>{b} :当前为:{c}%",
                        padding: 11,
                        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                        borderWidth: 3,
                        borderColor: "#fff"
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            gauge: {splitLine: {lineStyle: {color: "#f00"}}},
                            name: '南山区大厅时效指数',
                            title:{
                                show:true,
                                offsetCenter:[0, '80%'],
                                color:"#f9f9f9"
                            },
                            radius:'63%',
                            type: 'gauge',
                            center:['45%', '35%'] ,
                            detail: {formatter: '{value}'},
                            data: [{value: this.number, name: '指数范围0-100'}],
                            axisLine:{
                                show:false,
                                lineStyle:{
                                    color:[[0.2, '#2993ff'], [0.8, '#2adeff'], [1, '#ee417a']],
                                    width:15
                                }
                                },
                            splitLine:{
                                show:false              //分割线-设计稿
                            },
                            axisTick:{
                                show:false               //刻度样式-设计稿
                            },
                            axisLabel:{

                            }
                            
                        }
                    ]
                });
            },
            drawCharts(){
                this.drawCircle()
            },
            showIt(){
                console.log('1');
            }
        },
        mounted(){
            this.getBDefficiencys();
        },
        updated(){
            // this.drawCircle();
            // this.timer= setInterval(this.showIt,1000)
        },
        beforeDestroy(){
            // clearInterval(this.timer);
            // this.timer=null
        }
    }
</script>

<style scoped>
.top{position:absolute;right: 5%;top: 12%;}
.timed{margin-top: -6rem;}
.n1{width: 50px;height: 10px;background-color: #2993ff;display: inline-block;border-radius: 5px;margin: 0 5px;}
.n2{width: 160px;height: 10px;background-color: #ee417a;display: inline-block;border-radius: 5px;margin: 0 5px;}
.n4{width: 10px;height: 10px;background-color: #ee417a;display: inline-block;margin-right: 5px;margin: 0 5px;}
.n5{width: 10px;height: 10px;background-color: #2adeff;display: inline-block;margin-right: 5px;margin: 0 5px;}
.n6{width: 10px;height: 10px;background-color: #2993ff;display: inline-block;margin-right: 5px;margin: 0 5px;}
.mp-title{background: linear-gradient(to bottom , #05172f, #0a3687);display:block;padding: 5px 10px;display:inline-block;}
</style>