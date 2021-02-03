import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenHome from './components/screen-home.vue'
import ScreenTestPagexml from './components/screen-testpagexml.vue';
import ScreenView from './components/screen-view.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        {
            path : '/',
            name : 'home',
            component : ScreenHome
        },
        {
            path : '/view',
            name : 'view',
            component : ScreenView
        },
        {
            path : '/testpagexml',
            name : 'testpagexml',
            component : ScreenTestPagexml
        }
    ]
})

export default router