<template>
    <el-linkgrid
        v-bind:items="items"></el-linkgrid>
</template>

<script>
    import BaseBrowser from './base-browser.vue';

    export default {
        extends : BaseBrowser,

        async created() {
            const items = await this.$api.call(`get/collections/${this.id}/list`);

            this.items = items.map((item) => {
                return {
                    path : `/collections/${this.id}/${item.docId}/pages`,
                    thumb : item.thumbUrl,
                    title : item.title
                };
            });
        },

        props : {
            id : String
        }
    }
</script>