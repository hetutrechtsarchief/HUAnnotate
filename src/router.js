import Vue from 'vue'
import VueRouter from 'vue-router'
import Screen404 from './components/screen-404.vue';
import ScreenCollections from './components/screen-collections.vue';
import ScreenDocuments from './components/screen-documents.vue';
import ScreenHome from './components/screen-home.vue';
import ScreenImport from './components/screen-import.vue';
import ScreenList from './components/screen-list.vue';
import ScreenPages from './components/screen-pages.vue';
import ScreenView from './components/screen-view.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        {
            path : '/',
            component : ScreenHome,
            name : 'home'
        },

        {
            path : '/import',
            component : ScreenImport,
            name : 'import'
        },

        // Collections --> Documents --> Pages --> Page

        {
            path : '/collections/list',
            component : ScreenCollections,
            name : 'collections'
        },

        {
            path : '/collections/:id/list',
            component : ScreenDocuments,
            name : 'documents',
            props(route) {
                return {
                    id : route.params.id
                };
            }
        },

        {
            path : '/collections/:collectionId/:documentId/pages',
            component : ScreenPages,
            name : 'pages',
            props(route) {
                return {
                    collectionId : route.params.collectionId,
                    documentId : route.params.documentId
                };
            }
        },

        {
            path : '/view/:collectionId/:documentId/:pageNr',
            component : ScreenView,
            name : 'view-api',
            props(route) {
                return {
                    collectionId : route.params.collectionId,
                    documentId : route.params.documentId,
                    pageNr : route.params.pageNr
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