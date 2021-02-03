<template>
    <div class="screen-view">
        <header class="header">
            <h1 class="header__title">
                HUAnnotate
            </h1>

            <nav class="header__nav">
                <router-link
                    class="header__link"
                    to="/home">Home</router-link>
                <router-link
                    class="header__link"
                    to="/testpagexml">Test XML</router-link>
            </nav>
        </header>

        <section class="screen-view__content">
            <el-viewer
                v-if="pageData"
                class="screen-view__viewer"
                v-bind:imageSrc="pageData.imageSrc"
                v-bind:imageHeight="pageData.imageHeight"
                v-bind:imageWidth="pageData.imageWidth"></el-viewer>

            <div v-if="!pageData"
                 class="screen-view__message">
                <p>No pagedata, did you load an XML file?</p>

                <button
                    class="btn btn--link"
                    v-on:click="useTestXml">Or use a test Page XML file</button>
            </div>
        </section>
    </div>
</template>

<script>
    import ElViewer from './el-viewer.vue';

    export default {
        components : { ElViewer },

        computed : {
            pageData() {
                return this.$store.state.pageData;
            }
        },

        methods : {
            useTestXml() {
                this.$router.push('testpagexml');
            }
        }
    }
</script>