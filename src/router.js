import Vue from 'vue'
import VueRouter from 'vue-router'
import Screen404 from './components/screen-404.vue';
import ScreenHome from './components/screen-home.vue';
import ScreenImport from './components/screen-import.vue';
import ScreenList from './components/screen-list.vue';
import ScreenView from './components/screen-view.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        {
            path : '/',
            component : ScreenHome
        },

        {
            path : '/import',
            component : ScreenImport
        },

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
            path : '/view',
            component : ScreenView
        },

        {
            path : '/view/region/:currentRegionId?',
            component : ScreenView,
            props(route) {
                const currentRegionId = route.params.currentRegionId ?? null;
                return { currentRegionId };
            }
        },

        {
            path : '*',
            name : '404',
            component : Screen404
        }
    ]
})

export default router;