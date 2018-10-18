<template>
    <section style="margin-top: 10px">
        <el-row :gutter="24">
            <el-col :span="16">
                <el-table ref="singleTable" :data="tableData" highlight-current-row
                          @current-change="handleCurrentChange" style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="name" label="名称" width="120"></el-table-column>
                    <el-table-column property="msg" label="说明"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <el-tree :data="formData" show-checkbox default-expand-all node-key="id" ref="tree"
                             highlight-current
                             :props="defaultProps" :default-checked-keys="checked">
                    </el-tree>
                </div>
                <div class="save-panel">
                    <el-button type="primary" size="small" @click="getCheckedNodes">保存</el-button>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import axios from 'axios';
    import {AccessPeople, AccessContent, SaveTag} from '../../api/api';

    export default {
        data() {
            return {
                resourceID: '',

                filters: {
                    name: ''
                },
                editLoading: false,
                tableData: [],
                currentRow: null,
                // 第0级用户权限信息
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                // tree data
                formData: [],
                // choose
                checked: []
            };
        },

        methods: {
            // 表单
            handleCurrentChange(val) {
                // console.log('岁的法国',val)
                this.roleID = val.id;
                let tag = val.id;
                this.currentRow = val;
                AccessContent(tag).then(res => {

                    let getJsonTree = res.data;
                    // children turn to the array
                    for (let key in getJsonTree) {
                        getJsonTree[key]['children'] = []
                    }
                    let menu = [];
                    // first level
                    for (let key in getJsonTree) {
                        if (getJsonTree[key]['pId'] === null) {
                            menu.push(getJsonTree[key]);
                        }
                    }
                    // first & second level
                    for (let key in menu) {
                        let firstLevelMenuId = menu[key]['id'];
                        for (var key2 in getJsonTree) {
                            var pId = getJsonTree[key2]['pId'];
                            if (firstLevelMenuId == pId) {
                                menu[key]['children'].push(getJsonTree[key2]);
                            }
                        }
                    }

                    // first & second & third level
                    for (let key in menu) {
                        let secondLevelMenu = menu[key]['children'];
                        for (let key2 in secondLevelMenu) {
                            let secondLevelMenuId = secondLevelMenu[key2]['id'];
                            for (let key3 in getJsonTree) {
                                let pid = getJsonTree[key3]['pId'];
                                if (secondLevelMenuId == pid) {
                                    menu[key]['children'][key2]['children'].push(getJsonTree[key3]);
                                }
                            }
                        }
                    }
                    // console.log(menu);
                    this.formData = menu;
                    let arr = [];
                    for (let key in getJsonTree) {
                        if (getJsonTree[key]['checked'] == true) {
                            arr.push(getJsonTree[key]['id']);
                        }
                    }
                    this.checked = arr;
                })
            },
            getCheckedNodes() {
                this.$confirm('确认保存吗？','提示',{}).then(()=>{
                    this.editLoading = true;
                    let self = this;
                    let arr = this.$refs.tree.getCheckedNodes().map(x => {
                        let res = {
                            roleID: self.roleID,
                            resourceID: x.id
                        };
                        return res;
                    });
                    let jsonArr = JSON.stringify(arr);
                    axios.post('http://www.toncentsoft.cn:8090/security/roleresource/saveBeans.do', jsonArr,
                        {headers: {'Content-Type': 'application/json;charset=utf-8'}}
                    ).then(res => {
                        this.editLoading= false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                    }, error => {
                        this.editLoading= false;
                        this.$message({
                            message: '更新失败,请联系系统管理员',
                            type: 'error'
                        })
                    })
                });
            }
        },
        mounted() {
            AccessPeople().then(res => {
                this.tableData = res.data.data;
            });
        }
    };
</script>

<style scoped lang="scss">
    .save-panel {
        border: 1px solid #d1dbe5;
        border-top: none;
        padding: 10px;
        button {
            display: block;
            margin: 0 auto;
            min-width: 100px;
        }
    }
</style>
