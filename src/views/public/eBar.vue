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
    export default {
        name: "e-bar",
        data(){
            return{
                title: '终端受理功能',
                drawBars: null,
            }
        },
        methods:{
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
                            data: [320, 302, 301, 334, 390, 330, 320, 301, 334, 390, 330, 320]
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
                            data: [120, 132, 101, 134, 90, 230, 210, 301, 334, 390, 330, 320]
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
                            data: [220, 182, 191, 234, 290, 330, 310, 301, 334, 390, 330, 320]
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
                            data: [150, 212, 201, 154, 190, 330, 410, 301, 334, 390, 330, 320]
                        }


                        
                    ]
                });
            },
            drawCharts(){
                this.drawBar();
            }
        },
        mounted(){
            this.drawCharts();
        },
        updated(){
            this.drawCharts();
        }
    }
</script>

<style scoped>

</style>