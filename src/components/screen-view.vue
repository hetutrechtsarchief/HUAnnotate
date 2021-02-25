<template>
    <div class="screen-view">
        <header class="header">
            <h1 class="header__title">
                HUAnnotate
            </h1>

            <nav class="header__nav">
                <button
                    class="header__link"
                    v-on:click="useTestXml">Test XML</button>

                <button
                    v-if="pageData"
                    class="header__link"
                    v-on:click="resetPageData">Reset</button>
            </nav>
        </header>

        <section
            class="screen-view__content"
            v-bind:details-visible="!!currentRegionId">
            <el-viewer
                v-if="pageData"
                ref="viewer"
                class="screen-view__viewer"
                v-on:blurregion="blurRegion"
                v-on:selectregion="selectRegion"
                v-bind:currentRegionId="currentRegionId"
                v-bind:regions="pageData.textLines"
                v-bind:imageSrc="pageData.imageSrc"
                v-bind:imageHeight="pageData.imageHeight"
                v-bind:imageWidth="pageData.imageWidth"></el-viewer>

            <drag-drop
                v-if="!pageData"
                v-on:update="parseDrop"></drag-drop>

            <el-detail
                class="screen-view__details"
                v-show="!!currentRegionData"
                v-bind:data="currentRegionData"></el-detail>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import { PageXml } from '../pagexml.js';
    import DragDrop from './drag-drop.vue';
    import ElDetail from './el-detail.vue';
    import ElViewer from './el-viewer.vue';

    export default {
        components : { DragDrop, ElDetail, ElViewer },

        computed : {
            currentRegionData() {
                if (this.pageData) {
                    const textLines = this.pageData.textLines;
                    return textLines.find(l => l.id === this.currentRegionId);
                } else {
                    return null;
                }
            },

            pageData() {
                return this.$store.state.pageData;
            }
        },

        data() {
            return {
                currentRegionId : null
            };
        },

        methods : {
            blurRegion() {
                this.currentRegionId = null;
            },

            async parseDrop(pageData) {
                this.$store.commit('pageData', pageData);
            },

            resetPageData() {
                this.$store.commit('resetPageData');
                this.currentRegionId = null;
            },

            selectRegion(regionId) {
                this.currentRegionId = regionId;
            },

            async useTestXml() {
                // Load test file and give that to pageData
                const path = process.env.BASE_URL;
                const xml = await axios.get(`${path}test-data/page.xml`);
                const pageXml = new PageXml(xml.data);
                this.$store.commit('pageData', pageXml);
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
        }
    }
</script>