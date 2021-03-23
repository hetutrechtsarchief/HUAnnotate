<template>
    <header class="header">
        <router-link
            to="/"
            class="header__title">
            HUAnnotate
        </router-link>

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
</template>

<script>
    import axios from 'axios';
    import { PageXml } from '../pagexml.js';

    export default {
        computed : {
            pageData() {
                return this.$store.state.pageData;
            }
        },

        methods : {
            resetPageData() {
                this.$store.commit('resetPageData');
            },

            async useTestXml() {
                // Load test file and give that to pageData
                const path = process.env.BASE_URL;
                const xml = await axios.get(`${path}test-data/page.xml`);
                const pageXml = new PageXml(xml.data);
                this.$store.commit('pageData', pageXml);
                this.$router.push('/view');
            }
        }
    }
</script>