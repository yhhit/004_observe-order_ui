import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigator from '../components/Navigator.vue'
import Login from '../components/user/Login.vue'
import store from "@/store"
Vue.use(VueRouter)
const routes = [

    {
        path: '/',
        components:{
          navigator:Navigator
        },
        meta:{title:'Other'},
        children:[
          {
            path:'issue-order',
            component:()=>import('../components/IssueOrder.vue'),
            meta:{title:'Issue Order'},
          },
          {
            path:'get-order',
            component:()=>import('../components/GetOrder.vue'),
            meta:{title:'Get Order'},
          },
          {
            path:'data-statistics',
            component:()=>import('../components/DataStatistics.vue'),
            meta:{title:'Data Statistics'},
          },
          {
            path:'error',
            component:()=>import('../components/Error.vue'),
            meta:{title:'404 page not found'},
          },
          {
            path: '',
            redirect: 'issue-order'
          },
          {
            path: '*',
            redirect: 'error'
          },
        ]
    },
    {
        path: '/user/login',
        meta:{title:'登陆'},
        components:{
          fullPage:Login
        }
    },
  ]
  
 const router=new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
router.beforeEach((to,from,next)=>{
  if(to.path==='/user/login'||to.path==='/error'){
    next()
  }else{
    if(localStorage.getItem('token')){
      next()
    }else{
      next('/user/login')
    }
  }
}
)
router.afterEach((to,from)=>{
  //更换title
  document.title=to.meta.title
  //更换vuex中的navigator
  store.commit('mConfig/SET_NAVIGATOR',to.path)
}
)
export default router