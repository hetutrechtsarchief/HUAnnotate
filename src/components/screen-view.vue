<template>
    <section
        class="screen__content"
        v-bind:details-visible="!!currentRegionId">
        <el-viewer
            v-if="pageData"
            ref="viewer"
            class="screen__viewer"
            v-on:blurregion="blurRegion"
            v-on:selectregion="selectRegion"
            v-bind:currentRegionId="currentRegionId"
            v-bind:regions="regions"
            v-bind:imageSrc="pageData.imageSrc"
            v-bind:imageHeight="pageData.imageHeight"
            v-bind:imageWidth="pageData.imageWidth"></el-viewer>

        <el-detail
            v-bind:key="currentRegionId"
            class="screen__details"
            v-on:textupdate="updateText"
            v-show="!!currentRegionData"
            v-bind:data="currentRegionData"></el-detail>

        <div
            v-if="!pageData"
            class="w-100 h-100vh flex flex-center">
            <p>No page data loaded. Please either use the browse function or upload a page XML file.</p>
        </div>
    </section>
</template>

<script>
    import ElDetail from './el-detail.vue';
    import ElViewer from './el-viewer.vue';

    export default {
        components : { ElDetail, ElViewer },

        computed : {
            currentRegionData() {
                if (this.pageData) {
                    const textLines = this.pageData.getTextLines();
                    return textLines.find(l => l.id === this.currentRegionId);
                } else {
                    return null;
                }
            },

            pageData() {
                return this.$store.state.pageData;
            },

            regions() {
                return this.pageData.getTextLines();
            }
        },

        async created() {
            // If we have these three properties, load up the data from the API
            if (this.collectionId && this.documentId && this.pageNr) {
                const pageData = await this.$api.getPageData(
                    this.collectionId, this.documentId, this.pageNr
                );

                this.$store.commit('pageData', pageData.page);
            }
        },

        methods : {
            blurRegion() {
                this.$router.push({
                    name : 'region',
                    params : { currentRegionId : null }
                });
            },

            selectRegion(regionId) {
                this.$router.push({
                    name : 'region',
                    params : { currentRegionId : regionId }
                });
            },

            updateText(text) {
                this.$store.commit('userText', {
                    id : this.currentRegionId,
                    text : text
                });
            }
        },

        mounted() {
            window.addEventListener('keydown', (e) => {
                // If there is a detail pane, tab through all regions in
                // the viewer if the <Tab> key is used
                if (!!this.currentRegionId && e.key === 'Tab') {
                    e.preventDefault();

                    // If the shiftKey is also pressed, select previousRegion
                    if (e.shiftKey) {
                        this.$refs.viewer.selectPreviousRegion();
                    } else {
                        this.$refs.viewer.selectNextRegion();
                    }
                }
            });
        },

        props : {
            collectionId : String,
            currentRegionId : String,
            documentId : String,
            pageNr : String
        }
    }
</script>