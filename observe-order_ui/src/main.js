import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store/index.js'
//读取package.json文件放入stored的mConfig中
import packageJson from '../package.json'
import router from './vue-router'
import axios from 'axios'
store.commit('mConfig/SET_CONFIG',packageJson)
//读取store中的packageJson文件
// console.log(store.state.mConfig.packageJson)
Vue.config.productionTip = false
Vue.use(ElementUI);

// http request 拦截器可选
axios.interceptors.request.use(
  config => {
    //过滤登录请求和注册请求
    if(config.url.indexOf('/users/login')!==-1||config.url.indexOf('/users/post')!==-1||config.url.indexOf('/users/register')!==-1){
      return config
    }
    if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${localStorage.token}`;
    }

    config.headers['Content-Type']= 'application/x-www-form-urlencoded'

    return config;
  },
  err => {
    return Promise.reject(err);
  });

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(111,error)
    
    if (error.response.status === 401) {
     //输出授权失败错误信息
      console.log('授权失败');
      //清除token
      localStorage.removeItem('token');
      //跳转到登录页面
      router.push('/users/login');
    }if(error.response.status===302){
      //获取重定向的地址
      console.log(1,error.response.headers.location);
      router.push(error.response.headers.location);
    } else {
     //输出其他错误信息
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      
    }
    return Promise.reject(error);
  }
);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')



