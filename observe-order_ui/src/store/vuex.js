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



export default new Vuex.Store({
    modules: {
        mList
    }
})
