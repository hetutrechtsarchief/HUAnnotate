import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        pageData : null,
        screen : 'home'
    },

    getters : {

    },

    mutations : {
        pageData(state, pageData) {
            state.pageData = pageData;
        }
    },

    actions : {
    }
});