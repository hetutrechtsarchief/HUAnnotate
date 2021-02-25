import Vue from 'vue'
import VueRouter from 'vue-router'
import ScreenView from './components/screen-view.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
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

export default router