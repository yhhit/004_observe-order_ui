import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const mConfig={
    namespaced: true,
    state: {
        packageJson: {},
        navigator:"",
        userInfo:{},
        token:"",
    },
    actions: {
        //设置用户登陆信息而非session信息
        setUserSession({commit},data){
            commit("SET_USER_INFO",data.userInfo)
            localStorage.setItem("token",data.token)
        },
        clearUserSession({commit}){
            commit("SET_USER_INFO",{})
            localStorage.setItem("token","")
        }

    },
    mutations: {
        SET_CONFIG(state, packageJson) {
            state.packageJson = packageJson
        },
        SET_NAVIGATOR(state, navigator) {
            state.navigator = navigator
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_TOKEN(state, token) {
            state.token = token
        }

    }
}



export default new Vuex.Store({
    modules: {
        mConfig
    }
})
