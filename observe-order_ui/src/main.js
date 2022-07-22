import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store/index.js'
//读取package.json文件放入stored的mConfig中
import packageJson from '../package.json'
import router from './vue-router'
store.commit('mConfig/SET_CONFIG',packageJson)
//读取store中的packageJson文件
// console.log(store.state.mConfig.packageJson)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')



