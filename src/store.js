import Vue from 'vue'
import Vuex from 'vuex'
import { Api } from './api.js';

Vue.use(Vuex)

const api = new Api(process.env.VUE_APP_API_ENDPOINT);

export const store = new Vuex.Store({
    state : {
        collections : [],
        documents : [],
        pageData : null,
        pages : []
    },

    getters : {

    },

    mutations : {
        collections(state, collections) {
            state.collections = collections;
        },

        documents(state, documents) {
            state.documents = documents;
        },

        pageData(state, pageData) {
            state.pageData = pageData;
        },

        pages(state, pages) {
            state.pages = pages;
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
        async fillCollections({commit}) {
            let list = await api.call('get/collections/list');

            // Add proper path
            list = list.map((item) => {
                item.to = `/collections/${item.colId}/list`;
                return item;
            });

            commit('collections', list);
        },

        async fillDocuments({commit}, payload) {
            let list = await api.call(`get/collections/${payload.id}/list`);

            // Add proper path
            list = list.map((item) => {
                item.to = `/collections/${payload.id}/${item.docId}/pages`;
                return item;
            });

            commit('documents', list);
        },

        async fillPages({commit}, payload) {
            const url = `get/collections/${payload.colId}/${payload.docId}/pages`;
            let list = await api.call(url);

            // Add proper path
            list = list.map((item) => {
                item.to = `/collections/${payload.id}/${item.docId}/pages`;
                return item;
            });

            commit('pages', list);
        }
    }
});