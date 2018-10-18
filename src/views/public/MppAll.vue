<template>
    <div class="mpp-all left-box-01">
        <div class="title-count">
            <img src="../../assets/part.png" class="icon-part" alt="">
            <div class="mp-title-box">
                <h2 class="title">
                    累计受理人数
                </h2>
                <div class="content green">
                    {{ lPeo }}
                </div>
            </div>
        </div>
        <el-row>
            <el-col :span="8">
                <div class="mp-box">
                    <h2 class="title">
                        <i class="el-icon-time"></i> 当日预约人数
                    </h2>
                    <div class="content blue">
                        {{ mPeo }}
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="mp-box">
                    <h2 class="title">
                        <i class="el-icon-document"></i> 当日取号人数
                    </h2>
                    <div class="content shineblue">
                        {{ fPeo }}
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="mp-box">
                    <h2 class="title">
                        <i class="el-icon-check"></i> 当日受理人数
                    </h2>
                    <div class="content orange">
                        {{ tPeo }}
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getBDPerson } from "../../api/api";
    export default {
        name: "mpp-all",
        data(){
            return{
                mPeo: '',
                fPeo: '',
                tPeo: '',
                lPeo: ''
            }
        },
        methods:{
            getBDMsg(){
                getBDPerson().then(res=>{
                    // console.log('获取到大数据',res.data.data);
                    let data = res.data.data;
                    this.mPeo = data.reservation;
                    this.fPeo = data.fetchNumber;
                    this.tPeo = data.handleSuccess;
                    this.lPeo = data.handleSuccessTotal;
                })
            }
        },
        mounted(){
            this.getBDMsg();
        }
    }
</script>

<style lang="scss">
    $borderColor: #245194;$insetShadow: 2px 2px 25px inset rgba(36,81,148,.5);
    .mpp-all{
        width: 100%;
        position: relative;
        /*min-width: 497px;*/
        color: #d6d7dd;
        border: 1px solid $borderColor;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 3px;
        box-shadow: $insetShadow;
        margin-bottom: 10px;
        .mp-title{
            font-size: 1.0rem;
            margin: 0 0 15px 0;
        }
        .title-count{
            display: flex;
            flex-wrap: nowrap;
            .icon-part{
                display: block;
                width: 3.2rem;
                height: 3.2rem;
                line-height: 2.5rem;
                margin-right: 15px;
            }
            .mp-title-box{
                flex: 1;
                line-height: 2.5rem;
                .title{
                    margin: 0;
                    font-size: 1.0rem;
                    line-height: 1.0rem;
                }
                .content{
                    font-size: 2.0rem;
                    font-weight: bold;
                    letter-spacing: 1.1px;
                    &.green{
                        color: #01fd78;
                    }
                }
            }
        }
        .mp-box{
            text-align: left;
            .title{
                font-size: .8rem;
            }
            .content{
                font-size: 1.8rem;
                text-align: left;
                font-weight: bold;
                padding-left: 1.2rem;
                &.shineblue{
                    color: #2adeff;
                }
                &.green{
                    color: #01fd78;
                }
                &.blue{
                    color: #45a3e6;
                }
                &.orange{
                    color: #d2922c;
                }
            }
        }
        &:before{
            content: '';
            width: 20px;
            height: 16px;
            display: block;
            background: none;
            border-left: 2px solid #4971af;
            border-top: 2px solid #4971af;
            position: absolute;
            left: -.1rem;
            top: -.1rem;
        }
        &:after{
            content: '';
            width: 20px;
            height: 16px;
            display: block;
            background: none;
            border-right: 2px solid #4971af;
            border-bottom: 2px solid #4971af;
            position: absolute;
            right: -.1rem;
            bottom: -.1rem;
        }
    }
</style>