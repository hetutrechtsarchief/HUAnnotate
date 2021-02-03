import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenView from './components/screen-view.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        {
            path : '/',
            name : 'view',
            component : ScreenView
        }
    ]
})

export default router