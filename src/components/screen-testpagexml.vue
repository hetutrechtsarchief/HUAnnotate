<template>
    <div>One moment...</div>
</template>

<script>
    // A workaround to avoid having to drag and drop xml files all the time for testing
    import axios from 'axios';
    import { PageXml } from '../pagexml.js';

    export default {
        async mounted() {
            // Load test file and give that to pageData
            const path = process.env.BASE_URL;
            const xml = await axios.get(`${path}test-data/page.xml`);
            const pageXml = new PageXml(xml.data);
            this.$store.commit('pageData', pageXml);
        }
    }
</script>