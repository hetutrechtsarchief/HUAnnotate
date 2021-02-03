<template>
    <div class="screen-view">
        View
    </div>
</template>

<script>
    export default {
        computed : {
            pageData() {
                return this.$store.state.pageData;
            }
        },

        mounted() {
        }
    }
</script>