<template>
    <section style="margin-top: 10px">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange"
                        style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="name" label="名称" width="120">
                    </el-table-column>
                    <el-table-column property="msg" label="说明">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light" >
                    <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
                             :props="defaultProps">
                    </el-tree>
                </div>
                <div class="save-panel">
                    <el-button type="primary" size="small">保存</el-button>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                filters:{
                  name: ''
                },
                props: {
                    label: 'name',
                    children: 'zones'
                },
                tableData: [{
                    name: '管理员',
                    msg: '可管理后台全部人员权限'
                }, {
                    name: '南山公安人员',
                    msg: '仅可查看南山后台数据'
                }],
                currentRow: null,
                // 第0级用户权限信息
                data2: [
                    {
                        id: 1,
                        label: '用户管理',
                        children: [
                            {
                                id: 4,
                                label: '用户管理',
                            },
                            {
                                id: 5,
                                label: '权限管理',
                            },
                        ]
                    },
                    {
                        id: 2,
                        label: '环境管理',
                        children: [
                            {
                                id: 6,
                                label: '环境人员信息'
                            },
                            {
                                id: 7,
                                label: '环境人员报表'
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '信息管理',
                        children: [
                            {
                                id: 8,
                                label: '信息管理信息'
                            },
                            {
                                id: 9,
                                label: '信息管理报表'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            // 表单
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            // tree select
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }]);
            },
        },
        mounted(){
            console.log(this.editForm)
        }
    };
</script>

<style scoped lang="scss">
    .save-panel{
        border: 1px solid #d1dbe5;
        border-top: none;
        padding: 10px;
        button{
            display: block;
            margin: 0 auto;
            min-width: 100px;
        }
    }
</style>