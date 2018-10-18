<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="100" sortable>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100" sortable>
			</el-table-column>
			<el-table-column prop="role.name" label="角色" width="100" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="telephone" label="联系方式" width="140" sortable>
			</el-table-column>
			<el-table-column label="操作" width="250" fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					<el-button size="small" type="warning" @click="handlePas(scope.$index, scope.row)">初始密码</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="username">
					<el-input v-model="editForm.username" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="角色" prop="role.name">
                    <el-select v-model="editForm.role.id" placeholder="角色">
                        <el-option v-for="item in roleOption" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="联系方式" prop="telephone">
					<el-input v-model="editForm.telephone" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="状态" prop="status" >
                    <el-select v-model="editForm.status" placeholder="状态" :formatter="formatStatus">
                        <el-option v-for="item in statusList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role">
					<el-select v-model="addForm.role.id" placeholder="请选择角色" >
						<el-option v-for="item in roleOption" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="addForm.status" placeholder="请选择状态">
						<el-option v-for="item in statusList" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input v-model="addForm.telephone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
    import axios from 'axios';
	import qs from 'qs';
	//import NProgress from 'nprogress';
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser, getUserRoleList } from '../../api/api';

	export default {
		data() {
			return {
			    // test obj
			    //
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
                rows: 10,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					role: [
						{ required: true, message: '请选择角色状态',trigger: 'change'}
					]
				},
				// 角色数据获取
				role: {
				    id: '',
					name: ''
				},

				//编辑界面数据
				editForm: {
					id: '',
                    username: '',
					name: '',
                    role: {
					    id: ''
					},
                    telephone: '',
                    status: '',
					sex: 0
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				// 验证规则
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					role: [
						{ required: true, message: '请选择角色' }
					],
					status: [
						{ required: true, message: '请选择状态' }
					]
				},

				//新增界面数据
				addForm: {
				    username: '',
					name: '',
					sex: 0,
					birthday: '',
					telephone: '',
					status: 0,
                    role: {
                        id: ''
                    }
				},
				statusList: [
                    { id: 1,label: '启用' },
                    { id: 0,label: '停用' }
                ],
                roleOption: []

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 0 ? '男' : row.sex == 1 ? '女' : '未知';
			},
            // 状态值显示转换
            formatStatus: function (row, column) {
                return row.status == 1 ? '启用' : row.status == 0 ? '禁用' : '未知';
            },
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
			    	let para = {
					page: this.page,
                    rows: this.rows,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
                    // console.log(res.data.data);
                    this.total = res.data.data.total;
                    this.users = res.data.data.rows;
                    this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					// console.log(para);
					removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();

					}).catch((err) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除失败，请联系系统管理员',
                            type: 'warning'
                        });
                        this.getUsers();
                    });
				});
			},
            handlePas(index,row){
			    this.$confirm('确认初始化该密码吗？','提示',{
			        type: 'warning'
                }).then(()=>{
                    this.loading=true;
                    let para ={id: row.id}
                }).catch(()=>{

                })
            },
			//显示编辑界面
			handleEdit: function (index, row) {
                getUserRoleList().then((res)=>{
                    this.roleOption = res.data.data;
                });
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
                getUserRoleList().then((res)=>{
                    this.roleOption = res.data.data;
                });
				this.addFormVisible = true;
				this.addForm = {
				    username: '',
					name: '',
					role: {
				        id: 1
					},
					sex: 0,
					telephone: '',
					status: 1
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');
							// console.log(JSON.stringify(para));

							editUser(para).then((res) => {
                                this.editLoading = false;
                                // console.log(res);
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
							}).catch(err=>{
								this.editLoading = false;
							   	this.$message({
								    message: '更新失败,请联系系统管理员',
								    type: 'error'
							    })
							});
						});
					}
				});
			},

			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							}).catch(err=>{
							    this.addLoading = false;
							    this.$message({
									message: '提交失败，请联系系统管理员',
									type: 'error'
								});
                                this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					// console.log(para);
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>