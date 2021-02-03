<template>
    <div class="screen-home">
        <h1>HUAnnotate</h1>
        <h2>Drop a page XML file in the zone</h2>

        <drag-drop
            v-on:update="parseItem"></drag-drop>

        <button
            class="btn btn--link"
            v-on:click="useTestXml">Or use a test Page XML file</button>
    </div>
</template>

<script>
    import DragDrop from './drag-drop.vue';

    export default {
        components : { DragDrop },

        methods : {
            async parseItem(pageData) {
                this.$store.commit('pageData', pageData);
            },

            useTestXml() {
                this.$router.push('testpagexml');
            }
        }
    }
</script>