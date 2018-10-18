<template>
    <div class="mpp-all">
        <div class="mp-title">{{ title }}</div>
        <div class="eCount">
            <div id="drawC" style="height: 9rem;margin-top:-48px"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { getBDCount } from "../../api/api";
    export default {
        name: "e-count",
        data(){
            return{
                title: '人员占比',
                drawCounts: null,
                autoProcess: '',
                total: '',
                manualProcess: ''
            }
        },
        methods:{
            getBDCounts(){
                getBDCount().then(res=>{
                    console.log('人员占比',res);
                    this.autoProcess = res.data.data.autoProcess;
                    this.total = res.data.data.total;
                    this.manualProcess = res.data.data.manualProcess;
                    // console.log(this.autoProcess,this.total,this.manualProcess);
                    this.drawCharts();
                })
            },
            drawCount(){
                this.drawCounts = echarts.init(document.getElementById('drawC'));
                this.drawCounts.setOption({
                    color:['#2adeff','#ee417a', '#2993ff', '#d48265', '#91c7ae','#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a}<br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        top:15,
                        right:15,
                        orient: 'vertical',
                        // x: 'left',
                        textStyle: {color: "0"},
                        data: ['人工', '实时', '自助']
                    },

                    series: [              //none
                        {
                            name: '访问来源',
                            type: 'pie',
                            selectedMode: 'single',
                            center:['45%', '0%'],
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    //   show: false
                                }
                            },
                            data: []
                        },
                        {
                            name: '办证时效',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            center:["45%","60%"],
                            // grid:{top:390},
                            label: {
                                normal: {
                                    // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#05152c',
                                    borderColor: '#f9f9f9',
                                    borderWidth: 1,
                                    borderRadius:3,
                                    padding:[3,5],
                                    // borderRadius: 1,
                                    shadowBlur: 3,
                                    shadowOffsetX: 2,
                                    shadowOffsetY: 2,
                                    shadowColor: 'rgba(255,255,255,.2)',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data: [
                                { value: this.manualProcess, name: '人工' },
                                { value: this.total, name: '实时'},
                                { value: this.autoProcess, name: '自助' }
                            ]
                        }
                    ]
                })
            },
            drawCharts(){
                this.drawCount()
            }
        },
        mounted(){
            this.getBDCounts();
        },
        updated(){
            this.drawCharts();
        }
    }
</script>

<style scoped>
    .mp-title{background: linear-gradient(to bottom , #05172f, #0a3687);display:block;padding: 5px 10px;display:inline-block;}
    canvas{position:absolute;top: -30px;}
</style>