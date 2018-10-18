<template>
    <div class="mpp-all left-box-02">
        <h2 class="mp-title">{{ tcTitle }}</h2>
        <div class="mp-table">
            <template>
                <el-table :data="tableData" style="width: 100%" size="mini">
                    <el-table-column prop="deviceId" label="终端编号">
                    </el-table-column>
                    <el-table-column prop="handleType101" label="护照" >
                    </el-table-column>
                    <el-table-column prop="handleType104" label="台湾证">
                    </el-table-column>
                    <el-table-column prop="handleType102" label="港澳证">
                    </el-table-column>
                    <el-table-column prop="count" label="受理总数">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    import { getBDTop } from "../../api/api";
    export default {
        name: "top-count",
        data(){
            return{
                tcTitle: "自助受理机人员效率TOP6",
                tableData: []
            }
        },
        methods:{
            headerStyle({row,rowIndex}){
                return 'table-th'
            },
            getBDTopMsg(){
                getBDTop().then(res=>{
                    console.log('返回的TOP6大数据',res.data.data);
                    this.tableData = res.data.data;
                })
            }
        },
        mounted(){
            this.getBDTopMsg();
        }
    }
</script>

<style lang="scss">
    .mp-table{
        .el-table::after, .el-table::before{
            background-color: transparent;
        }
        .el-table{
            background-color: transparent;
            border-color: transparent;
            th{
                background-color: transparent;
                border-bottom: 1px solid #212834;
                .cell{
                    background-color: transparent;
                    color: #e7e9ec;
                    padding-right: 0;

                }
            }
            tr{
                background-color: transparent;
                color: #e7e9ec;
                &:hover{
                    color: #e7e9ec;
                    td{
                        background-color: #313546;
                    }
                }
                td{
                    border-bottom: 1px solid #212834;
                }
            }
            &:before{
                background-color: transparent;
                border: none
            }

        }
    }
</style>