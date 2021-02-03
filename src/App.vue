<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        computed : {
            pageData() {
                return this.$store.state.pageData;
            }
        },

        watch : {
            pageData(oldVal, newVal) {
                // If Pagedata changes, redirect to view
                if (newVal !== oldVal) {
                    this.$router.push('view');
                }
            }
        }
    }
</script>