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

        <section class="screen-view__content">
            <el-viewer
                v-if="pageData"
                class="screen-view__viewer"
                v-bind:imageSrc="pageData.imageSrc"
                v-bind:imageHeight="pageData.imageHeight"
                v-bind:imageWidth="pageData.imageWidth"></el-viewer>

            <drag-drop
                v-if="!pageData"
                v-on:update="parseDrop"></drag-drop>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import { PageXml } from '../pagexml.js';
    import DragDrop from './drag-drop.vue';
    import ElViewer from './el-viewer.vue';

    export default {
        components : { DragDrop, ElViewer },

        computed : {
            pageData() {
                return this.$store.state.pageData;
            }
        },

        methods : {
            async parseDrop(pageData) {
                this.$store.commit('pageData', pageData);
            },

            resetPageData() {
                this.$store.commit('resetPageData');
            },

            async useTestXml() {
                // Load test file and give that to pageData
                const path = process.env.BASE_URL;
                const xml = await axios.get(`${path}test-data/page.xml`);
                const pageXml = new PageXml(xml.data);
                this.$store.commit('pageData', pageXml);
            }
        }
    }
</script>