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
    export default {
        name: "time-turn",
        data(){
            return{
                tcTitle: "当前大厅排队信息",
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
        }
    }
</script>

<style scoped>

</style>