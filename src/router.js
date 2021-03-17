import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenList from './components/screen-list.vue';
import ScreenView from './components/screen-view.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        {
            path : '/collections/list',
            component : ScreenList,
            props() {
                return {
                    action : 'fillCollections',
                    value : 'collections'
                };
            }
        },

        {
            path : '/collections/:id/list',
            component : ScreenList,
            props(route) {
                return {
                    action : 'fillDocuments',
                    actionArg : { id : route.params.id },
                    value : 'documents'
                };
            }
        },

        {
            path : '/collections/:colId/:docId/pages',
            component : ScreenList,
            props(route) {
                return {
                    action : 'fillPages',
                    actionArg : {
                        colId : route.params.colId,
                        docId : route.params.docId
                    },
                    value : 'pages'
                };
            }
        },

        {
            path : '/region/:currentRegionId?',
            name : 'region',
            component : ScreenView,
            props(route) {
                const currentRegionId = route.params.currentRegionId ?? null;
                return { currentRegionId };
            }
        },

        {
            path : '*',
            name : 'start',
            component : ScreenView
        }
    ]
})

export default router;