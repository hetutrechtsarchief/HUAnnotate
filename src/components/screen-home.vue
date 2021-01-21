<template>
    <div class="screen-home">
        <drag-drop
            v-on:update="parseItem"></drag-drop>
    </div>
</template>

<script>
    import DragDrop from './drag-drop.vue';
    import { parse } from '../pagexml.js';

    export default {
        components : { DragDrop },

        methods : {
            async parseItem(item) {
                const text = await item.text();
                const data = parse(text);
                window._d = data;
                console.log(data);
            }
        }
    }
</script>