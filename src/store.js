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
        },

        userText(state, payload) {
            state.pageData.textLines.forEach((line) => {
                if (line.id === payload.id) {
                    line.userText = payload.text;
                }

                return line;
            });
        }
    },

    actions : {
    }
});