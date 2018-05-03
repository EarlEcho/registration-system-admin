import Vue from 'vue'
import Router from 'vue-router'


//首页
const Index = () => import('@/views/index')
//登录
const SingUp = () => import('@/views/singUp')

//忘记密码
const FindPwd = () => import('@/views/findPwd')

//考试列表
const ExamList = () => import('@/views/exam/list')

//新增考试
const AddExam = () => import('@/views/exam/add')


//考生列表
const Examination = () => import('@/views/examination/list')

//考生须知
const ExaminationNotice = () => import('@/views/examination/notice')


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/home',
            meta: {title: "首页", auth: true},
            component: Index
        }, {
            path: '/',
            meta: {title: "登录", auth: true},
            component: SingUp
        }, {
            path: '/find-pwd',
            meta: {title: "忘记密码", auth: true},
            component: FindPwd
        }, {
            path: '/exam-list',
            meta: {title: "考试列表", auth: true},
            component: ExamList
        }, {
            path: '/exam-add',
            meta: {title: "新增考试", auth: true},
            component: AddExam
        }, {
            path: '/examination',
            meta: {title: "考生列表", auth: true},
            component: Examination
        }, {
            path: '/examination-notice',
            meta: {title: "考生须知", auth: true},
            component: ExaminationNotice
        }
    ]
})


router.beforeEach((to, from, next) => {

    if (to.meta.title) {//如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    sessionStorage.setItem('beforeUrl', from.path)

    if (to.matched.length === 0) {//匹配不到相对应的路由时，跳转到首页
        from.name ? next({name: from.name}) : next('/')
    }
   /* if (to.path != '/') {
        if (!localStorage.sid) {
            console.log('没有sid');
            next('/');
        }
    }*/


    next()
})

export default router
