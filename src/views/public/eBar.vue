<template>
    <div class="mpp-all">
        <div class="mp-title">{{ title }}</div>
        <div class="eBar">
            <div id="eBar" style="height: 15rem;"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { getBDexit } from "../../api/api";
    export default {
        name: "e-bar",
        data(){
            return{
                title: '终端受理功能',
                drawBars: null,
                checkIDcard: [],
                checkFingerPrint: [],
                checkSignName: [],
                checkCommit: []
            }
        },
        methods:{
            getBDexits(){
                getBDexit().then(res=>{
                    // console.log(res.data.data);
                    // total: 合计  stepNo3: 刷身份证 stepNo4: 录指纹 stepNo5: 确认签名 stepNo6：提交审核 deviceId: 机器ID
                    let arr = res.data.data;
                    let checkIDcard = [];
                    let checkFingerPrint = [];
                    let checkSignName = [];
                    let checkCommit = [];
                    for(let key in arr){
                         checkIDcard.push(arr[key]['stepNo3']);
                         checkFingerPrint.push(arr[key]['stepNo4']);
                         checkSignName.push(arr[key]['stepNo5']);
                         checkCommit.push(arr[key]['stepNo6']);
                    }
                    this.checkIDcard = checkIDcard;
                    this.checkFingerPrint = checkFingerPrint;
                    this.checkSignName = checkFingerPrint;
                    this.checkCommit = checkCommit;
                    this.drawCharts();
                })
            },
            drawBar(){
                this.drawBars = echarts.init(document.getElementById('eBar'));
                this.drawBars.setOption({
                    color:['#2993ff','#2adeff', '#01fd78', '#d2922c'],
                    tooltip: {
                        show: true,
                        trigger: "item",
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        }
                    },
                    legend: {
                        textStyle: {color: "0"},
                        data: ['刷身份证', '采集指纹', '确认并签名', '提交民警确认']
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '1%',
                        containLabel: true,
                        show: true,
                        width: "auto"
                    },
                    barWidth:8,
                    xAxis: {

                        type: 'category',
                   //     name: "机器终端号",
                        axisLine: {lineStyle: {color: "rgba(234,234,234,.5)"}},
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    },
                    yAxis: {
                        type: 'value',
                    //    name: "人流量/人"
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color:"rgba(255,255,255,.3)",
                            type:"dotted"
                            }
                        },
                        axisLine: {lineStyle: {color: "rgba(234,234,234,.5)"}},
                    },
                    series: [
                        {
                            name: '刷身份证',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: ['50%','50%']
                                }
                            },
                            data: this.checkIDcard
                        },
                        {
                            name: '采集指纹',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: this.checkFingerPrint
                        },
                        {
                            name: '确认并签名',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: this.checkSignName
                        },
                        {
                            name: '提交民警确认',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: this.checkCommit
                        }


                        
                    ]
                });
            },
            drawCharts(){
                this.drawBar();
            }
        },
        mounted(){
            this.getBDexits();
        },
        updated(){
            this.drawCharts();
        }
    }
</script>

<style scoped>

</style>