<template>
    <el-linkgrid
        v-bind:items="items"></el-linkgrid>
</template>

<script>
    import BaseBrowser from './base-browser.vue';

    export default {
        extends : BaseBrowser,

        async created() {
            const url = `get/collections/${this.collectionId}/${this.documentId}/pages`;
            const items = await this.$api.call(url);

            this.items = items.map((item) => {
                return {
                    description : item.imgFileName,
                    path : `/view/${this.collectionId}/${this.documentId}/${item.pageNr}`,
                    thumb : item.thumbUrl,
                    title : item.pageNr
                };
            });
        },

        props : {
            collectionId : String,
            documentId : String
        }
    }
</script>