<template>
    <section
        class="screen-view"
        v-bind:details-visible="!!regionId">
        <el-viewer
            v-if="pageData"
            ref="viewer"
            class="screen-view__viewer"
            v-on:blurregion="blurRegion"
            v-on:selectregion="selectRegion"
            v-bind:regionId="regionId"
            v-bind:regions="viewerData.regions"
            v-bind:imageSrc="viewerData.imageSrc"
            v-bind:imageHeight="viewerData.imageHeight"
            v-bind:imageWidth="viewerData.imageWidth"></el-viewer>

        <el-detail
            v-bind:key="regionId"
            class="screen-view__details"
            v-on:textupdate="updateText"
            v-show="!!regionData"
            v-bind:data="regionData"></el-detail>

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
            regionData() {
                if (this.pageData) {
                    const textLines = this.pageData.getTextLines();
                    return textLines.find(l => l.id === this.regionId);
                } else {
                    return null;
                }
            },

            pageData() {
                return this.$store.state.pageData;
            },

            viewerData() {
                const page = this.pageData;

                return {
                    imageHeight : page.getImageHeight(),
                    imageSrc : page.getImageSrc(),
                    imageWidth : page.getImageWidth(),
                    regions : page.getTextLines()
                }
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
                    path : this.$route.path,
                    query : { regionId : null }
                });
            },

            selectRegion(regionId) {
                this.$router.push({
                    path : this.$route.path,
                    query : { regionId : regionId }
                });
            },

            updateText(text) {
                this.$store.commit('userText', {
                    id : this.regionId,
                    text : text
                });
            }
        },

        mounted() {
            window.addEventListener('keydown', (e) => {
                // If there is a detail pane, tab through all regions in
                // the viewer if the <Tab> key is used
                if (!!this.regionId && e.key === 'Tab') {
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
            documentId : String,
            pageNr : String,
            regionId : String
        }
    }
</script>