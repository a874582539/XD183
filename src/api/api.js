import axios from 'axios';
axios.defaults.withCredentials=true;
let base = '';
let api= 'http://www.toncentsoft.cn:8090';

export const requestLogin = params => {
    // return axios.post(`${base}/login/verify`, params).then(res => res.data);
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
    return axios.delete(api+`/security/user/delete.do`, { params: params });
};
// 批量删除
export const batchRemoveUser = params => {
    return axios.get(api+`/security/user/deleteBatch.do`, { params: params });
};
// 修改
export const editUser = params => {
    return axios.put(api+`/security/user/update.do`, { params: params });
};
// 添加
export const addUser = params => {
    return axios.post(api+`/security/user/save.do`, { params: params });
};

// 获取角色数据
export const getUserRoleList = params => {
    return axios.get(api+ ``)
};

// // 权限发起的请求
// export const getUserControlList = parmas => {
//   return axios.get(api+``,{ parmas: parmas });
// };