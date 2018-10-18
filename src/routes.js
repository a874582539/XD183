import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Data from './views/DB.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import userControl from './views/nav1/UserControl.vue'


let routes = [
    // 公共路由
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,
        iconCls: 'el-icon-date',
        children:[
            { path: '/data', component: Data, name: '效能分析' }
        ]
    },
    // 需要做权限管理 start ------------------------------------------
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-menu',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '系统用户' },
            { path: '/userControl', component: userControl, name: '角色管理' },
            { path: '/form', component: Form, name: '权限管理' },
            { path: '/user', component: user, name: 'APP用户列表' },
        ],
        meta: {
            auth: true
        }
    },
    // 权限管理区域 end -----------------------------------------
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;