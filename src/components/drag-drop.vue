<template>
    <div class="drag-drop"
         v-bind:dragover="dragover">
        <p class="drag-drop__help">🗳 Drop your file here</p>

        <p v-show="error"
           class="drag-drop__error">{{error}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dragover : false,
                error : false
            }
        },

        methods : {
            initDrop() {
                this.$el.addEventListener('drop', (e) => {
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

                    this.$emit('update', item);
                });

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