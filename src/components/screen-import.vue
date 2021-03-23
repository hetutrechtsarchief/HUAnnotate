<template>
    <div class="screen-import"
         v-bind:dragover="dragover">
        <p class="screen-import__help">🗳 Drop your file here</p>

        <p v-show="error"
           class="screen-import__error">{{error}}</p>
    </div>
</template>

<script>
    import { PageXml } from '../pagexml.js';

    export default {
        data() {
            return {
                dragover : false,
                error : false
            }
        },

        methods : {
            async handleDrop(e) {
                this.dragover = false;
                e.preventDefault();

                if (!e.dataTransfer.items) {
                    return;
                }

                const items = e.dataTransfer.items;

                if (items.length > 1) {
                    this.error = 'Please only drop one file...';
                    return;
                }

                const item = items[0].getAsFile();

                if (item.type !== 'text/xml') {
                    this.error = 'Only XML files are accepted';
                    return;
                }

                // Parse and check for erros
                let page;

                try {
                    const xml = await item.text();
                    page = new PageXml(xml);
                } catch (e) {
                    this.error = `Parsing error: ${e}`;
                }

                this.$store.commit('pageData', page);
                this.$router.push('/view');
            },

            initDrop() {
                this.$el.addEventListener('drop', (e) => this.handleDrop(e));

                this.$el.addEventListener('dragleave', () => {
                    this.dragover = false;
                });

                this.$el.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    this.error = false;
                    this.dragover = true;
                });
            }
        },

        mounted() {
            this.initDrop();
        }
    }
</script>