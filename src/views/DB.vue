<template>
    <div class="db-content">
        <img src="../assets/top-line.png" class="bg-img">
        <el-row>
            <!--左侧列表-->
            <el-col :span="6">
                <div class="left-box">
                    <v-ma></v-ma>
                    <v-tc></v-tc>
                    <v-tt></v-tt>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="center-block">
                    <v-time></v-time>
                    <v-mapControl></v-mapControl>
                    <v-eline></v-eline>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="right-box">
                    <v-ecircle></v-ecircle>
                    <v-ecount></v-ecount>
                    <v-ebar></v-ebar>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    import MA from './public/MppAll.vue'
    import TC from './public/TopCount.vue'
    import TT from './public/timeTurn.vue'
    import MapControl from './public/MapControl.vue'
    import TimeCheck from './public/TimeCheck.vue'
    import eLine from './public/eLine.vue'
    import eCircle from './public/eCircle.vue'
    import eCount from './public/eCount.vue'
    import eBar from './public/eBar.vue'

    // 引入ECHART JS

    export default {
        name: "d-b",
        data(){
            return{

            }
        },
        methods:{

        },
        mounted(){

        },
        components:{
            "v-ma": MA,
            "v-tc": TC,
            "v-tt": TT,
            'v-mapControl': MapControl,
            "v-time": TimeCheck,
            'v-eline': eLine,
            'v-ecircle': eCircle,
            'v-ecount': eCount,
            'v-ebar': eBar
        }
    }
</script>

<style scoped lang="scss">
    .db-content{
        width: 100%;
        height: auto;
        background: #020a1e;
        padding: 10px;
        .center-block{
            margin: 0 10px;
        }
    }
    .left-box{
        display: flex;
        flex-direction: column;
        .left-box-01{

        }
        .left-box-02{

        }
        .left-box-03{
            flex: 1
        }
    }
    .bg-img{
        width: 100%;
        position: absolute;
        height: 67px;
        display: block;
        left: 0;
        top: 54px;
    }
</style>