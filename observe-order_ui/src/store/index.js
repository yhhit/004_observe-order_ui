import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const mList = {
    namespaced: true,
    state: {
        config:{}
        
    },
    actions: {
    },
    mutations: {
        SET_CONFIG(state, config) {
            state.config = config
        }
    }
}

const mConfig={
    namespaced: true,
    state: {
        packageJson: {},
        navigator:""
    },
    actions: {
    },
    mutations: {
        SET_CONFIG(state, packageJson) {
            state.packageJson = packageJson
        },
        SET_NAVIGATOR(state, navigator) {
            state.navigator = navigator
        }
    }
}



export default new Vuex.Store({
    modules: {
        mList,
        mConfig
    }
})
