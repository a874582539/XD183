import axios from 'axios';
axios.defaults.withCredentials=true;
let base = '';
// let api= 'http://192.168.191.1:8085';
// let api= 'http://www.toncentsoft.cn:8090';
let api= 'http://10.200.20.27:8085';

export const requestLogin = params => {
    return axios.post(
        api+`/login/verify`,
        params,
        { headers:{'Content-Type':'application/x-www-form-urlencoded'} },
        { witchCredentials: true }
        ).then(res => res.data);
};
// 测试
export const getUserList = params => {
    return axios.get(api+'/security/user/findBeanList.do?page=1&rows=10', { params: params });
};
// 查询
export const getUserListPage = params => {
    return axios.get(api+`/security/user/findBeanList.do`, { params: params });
};
// 删除
export const removeUser = params => {
    return axios.delete(api+`/security/user/delete.do`,
        { params: params }
        );
};
// 批量删除
export const batchRemoveUser = params => {
    return axios.post(api+`/security/user/deleteBatch.do`, { params: params });
};
// 修改
export const editUser = params => {
    return axios.put(api+`/security/user/update.do`, params);
};
// 添加
export const addUser = params => {
    return axios.post(api+`/security/user/save.do`, params);
};

// 获取角色数据
export const getUserRoleList = params => {
    return axios.get(api+ `/security/role/combobox.do`,{ params: params })
};

// // 权限发起的请求
// export const getUserControlList = parmas => {
//   return axios.get(api+``,{ parmas: parmas });
// };

//权限页面API
export const getTreeList = () => {
    return axios.get(api+ `/security/resource/getModule.do`);
};
export const getTreeDetail = params => {
    return axios.get(api+ `/security/resource/findBeanList.do`,{ params: params });
};
export const addRole = params =>{
    return axios.post(api+ `/security/resource/save.do`, params);
};
// { headers: { 'Content-Type': 'application/json;charset=utf-8' }}
// { headers:{'Content-Type':'application/x-www-form-urlencoded'} },

// 新增 ------------------------------------------------------------------------------------------------------------

//用户管理 菜单栏
export const AccessMenu = params =>{
    return axios.get(api+`/security/resource/getMenu.do`)
};
// 获取角色管理 人员列表
export const AccessPeople = params =>{
    return axios.get(api+`/security/role/combobox.do`)
};
// 管理权限内容
export const AccessContent = params =>{
    return axios.get(api+`/security/resource/tree.do?roleId=`+params)
};
// 刷新图片
export const refreshData = params =>{
    return axios.get(api+`/login/authCode`)
};

// 大数据内容数据API
// component 01 累计受理人数
export const getBDPerson = parmas => {
    return axios.get(api+`/statisticsReservationNumber`)
};
// component 02 自助受理机人员效率TOP6
export const getBDTop = parmas =>{
    return axios.get(api+`/deviceEefficTop`)
};
// component 03 当日人流分析
export const getBDLine = params =>{
    return axios.get(api+`/todayHumanFlow/`+params)
};
// component 04 今日办证时效
export const getBDCount = params =>{
    return axios.get(api+`/todayHandleAgingNumber`)
};