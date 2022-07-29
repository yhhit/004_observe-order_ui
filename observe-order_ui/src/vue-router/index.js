import Vue from 'vue'
import VueRouter from 'vue-router'
import Navigator from '../components/order/Navigator.vue'
import Login from '../components/user/Login.vue'
import store from "@/store"
Vue.use(VueRouter)
const routes = [
      {
        path: '/users/login',
        components:{
          fullPage:Login
        },
        meta:{title:'Login in'},
      },
      {
        path: '/users',
        components:{
          navigator:Navigator
        },
        children:[
          {
            path:'profiles/put',
            component:()=>import('../components/user/OperateProfile.vue'),
            meta:{title:'Modify Profile', type:"update"},
            props:true
          },
          //获取自己的个人信息
          {
            path:'profiles/get',
            component:()=>import('../components/user/OperateProfile.vue'),
            meta:{title:'Profile', type:"read"},
            props:true
          },
          {
            path:'post',
            component:()=>import('../components/user/OperateProfile.vue'),
            meta:{title:'Register', type:"create"},
            props:true
          },
        ]
      },
    {
        path: '/',
        components:{
          navigator:Navigator
        },
        meta:{title:'Other'},
        children:[
          {
            path:'orders/post',
            component:()=>import('../components/order/OperateOrder.vue'),
            meta:{title:'Issue Order', type:"create"},
          },
          {
            path:'orders/get',
            component:()=>import('../components/order/GetOrder.vue'),
            meta:{title:'Get Order'},
          },
          {
            path:'data-statistics',
            component:()=>import('../components/DataStatistics.vue'),
            meta:{title:'Data Statistics'},
          },
          {
            path:'errors',
            component:()=>import('../components/Error.vue'),
            meta:{title:'404 page not found'},
          },
          {
            path: '',
            redirect: 'orders/post'
          },
          {
            path: '*',
            redirect: 'errors'
          },
        ]
    },
    
  ]
  
 const router=new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
router.beforeEach((to,from,next)=>{
  if(to.path==='/users/login'||to.path==='/errors'||to.path==='/users/post'){
    next()
  }else{
    //获取本地存储中的token
    if(localStorage.getItem("token")){
      next()
    }else{
      next('/users/login')
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