<template>
    <div class="screen-view">
        View
        <img v-bind:src="imgSrc" />
    </div>
</template>

<script>
    export default {
        computed : {
            imgSrc() {
                return this.pageData.imageSrc;
            },

            pageData() {
                return this.$store.state.pageData;
            }
        },

        mounted() {
        }
    }
</script>