import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        pageData : null
    },

    getters : {

    },

    mutations : {
        pageData(state, pageData) {
            state.pageData = pageData;
        },

        resetPageData(state) {
            state.pageData = null;
        }
    },

    actions : {
    }
});