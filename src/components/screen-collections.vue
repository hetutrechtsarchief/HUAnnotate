<template>
    <el-linkgrid
        v-bind:items="items"></el-linkgrid>
</template>

<script>
    import BaseBrowser from './base-browser.vue';

    export default {
        extends : BaseBrowser,

        async created() {
            const items = await this.$api.call('get/collections/list');

            this.items = items.map((item) => {
                return {
                    description : item.description,
                    path : `/collections/${item.colId}/list`,
                    thumb : item.thumbUrl,
                    title : item.colName
                };
            });
        }
    }
</script>