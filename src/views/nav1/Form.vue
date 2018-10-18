<template>
	<div>
		<el-row>
			<!--左：菜单列表-->
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<div class="xd-tree-control">
						<div class="control-title">
							菜单列表
						</div>
						<div class="control-content">
							<el-tree :data="conList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
						</div>
					</div>
				</div>
			</el-col>
			<!--右：功能模块-->
			<el-col :span="18">
				<div class="grid-content bg-purple-light">
					<div class="xd-tree-detail">
						<div class="detail-title">
							<el-row>
								<el-col :span="20">
									功能模块
								</el-col>
								<el-col :span="4">
									<el-button size="mini" type="primary" @click="handleAdd" witdh="150">添加</el-button>
								</el-col>
							</el-row>
						</div>
						<div class="detail-content">
							<el-table :data="tableData" border style="width: 100%;" highlight-current-row v-loading="listLoading">
								<el-table-column prop="name" label="名称" width="120" f></el-table-column>
								<el-table-column prop="url" label="url" width="180"></el-table-column>
								<el-table-column prop="code" label="授权码" width="120"></el-table-column>
								<el-table-column prop="type" label="类型" :formatter="formatType">
								</el-table-column>
								<el-table-column prop="init" label="参数"></el-table-column>
								<el-table-column prop="priority" label="优先级"></el-table-column>
								<el-table-column label="操作" width="180" fixed="right">
									<template scope="scope">
										<el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
										<el-button type="danger" size="small" @click.native="handleDel(scope.$index, scope.row)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</el-col>

			<!--新增dialog-->
			<el-dialog title="新增" v-model="addFormVisible" :close-on-click-model="false">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="名称" prop="name">
						<el-input v-model="addForm.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="授权编码" prop="code">
						<el-input v-model="addForm.code" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="类型" prop="type">
						<el-select v-model="addForm.type" placeholder="请选择类型">
							<el-option v-for="item in typeList" :key="item.id" :label="item.label" :value="item.id"></el-option>
							<!--<el-option label="菜单" value="1"></el-option>-->
							<!--<el-option label="功能" value="0"></el-option>-->
						</el-select>
					</el-form-item>
					<el-form-item label="url" prop="url">
						<el-input v-model="addForm.url" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="参数" prop="int">
						<el-input v-model="addForm.params" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="优先级">
						<el-input v-model="addForm.priority" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible =false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>

			<!--编辑dialog-->
			<el-dialog title="编辑">

			</el-dialog>
		</el-row>
	</div>
</template>

<script>
	import { getTreeList,getTreeDetail,addRole } from "../../api/api";
	import axios from 'axios';
	import qs from 'qs';
    export default {
		data() {
			return {
			    // 树形控件data数据
				conList: [],
                defaultProps: {
					children: 'children',
					label: 'name'
				},
				// 请求用data数据用的数据
                params:{
                    'parent.id': '',
                    page: 1,
                    rows: 20,
                    sort: 'priority',
                    order: 'asc',
				},
				// 详细内容data数据
				tableData: [],
				listLoading: false,
				// 新增加权限弹窗
				// 新增页面是否显示
				addFormVisible: false,
				addLoading: false,
				addFormRules:{
				    name:[
						{ required: true, message: '请输入名称',trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请输入授权编码',trigger: 'blur' }
					],
					url: [
						{ required: true, message: '请输入url', trigger: 'blur' }
					]
				},
				addForm:{
					name: '',
					code: '#',
					type: 0,
					url: '',
					params: '',
                    priority: ''
				},
				typeList:[
					{ id: 1,label: '功能' },
					{ id: 0,label: '菜单' }
				]
            }
		},
		methods: {
		    // 类型转换
            formatType: function (row, column) {
                return row.type == 0 ? '功能' : row.type == 1 ? '菜单' : '未知';
            },
            handleNodeClick(data) {
                // console.log(data);
                let treeNode = {
                    'parent.id': data.id,
					page: 1,
					rows: 20,
					sort: 'priority',
					order: 'asc',
				};
				getTreeDetail(treeNode).then((res)=>{
					this.tableData = res.data.data.rows	;
				});
            },
			getTreeNode(){
                getTreeDetail(this.params).then((res)=>{
                    this.tableData = res.data.data.rows;
                });
			},
			getTree(){
                getTreeList().then(res=>{
					this.conList = res.data;
				}).catch(err=>{

				})
			},
			// 新增页面
			handleAdd(index,row){
                this.addFormVisible = true;
                this.addForm={
                    name: '',
                    code: '',
                    type: 0,
                    url: '',
                    params: '',
                    priority: ''
				}
			},
			addSubmit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        this.$confirm('确认提交吗？','提示',{}).then(()=>{
                            this.addLoading =true;
                            let para = Object.assign({},this.addForm);
                            let data = new FormData();
                            data.append('name', this.addForm.name);
                            data.append('code', this.addForm.code);
                            data.append('type',this.addForm.type);
                            data.append('url',this.addForm.url);
                            axios.post('http://www.toncentsoft.cn:8090/security/resource/save.do',data,{ headers: {'Content-Type': 'multipart/form-data'} }).then(res=>{
                                this.addLoading = false;
                                   this.$message({
                                		message: '提交成功',
                                		type: 'success'
                                	});
                                   this.$refs['addForm'].resetFields();
                                   this.addFormVisible = false;
                                   this.getTreeNode();
							})
							// let data = JSON.stringify(this.addForm)
                            // addRole(data).then((res)=>{
                             //    this.addLoading = false;
                             //    this.$message({
							// 		message: '提交成功',
							// 		type: 'success'
							// 	});
                             //    this.$refs['addForm'].resetFields();
                             //    this.addFormVisible = false;
                             //    this.getTreeNode();
							// }).catch((err)=>{
							//     this.addLoading = false;
							//     this.$message({
							// 		message: '提交失败，请联系系统管理员',
							// 		type: 'error'
							// 	});
							// })
						})
					}
				})
			}
		},
		mounted(){
			this.getTree();
			this.getTreeNode();
		}
	}

</script>

<style scoped lang="scss">
	.xd-tree-control{
		margin: 10px 0;
		.control-title{
			width: 100%;
			height: 36px;
			line-height: 1.2;
			background: #e7e9ec;
			padding: 10px;
			box-sizing: border-box;
			font-weight: bold;
		}
		.el-tree{
			border: 1px solid #eee;
		}
	}
	.xd-tree-detail{
		margin: 10px 0;
		.detail-title{
			width: 100%;
			height: 36px;
			line-height: 1.2;
			background: #e7e9ec;
			padding: 10px;
			box-sizing: border-box;
			font-weight: bold;

		}
	}
</style>