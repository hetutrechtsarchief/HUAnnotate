<template>
    <menu class="w-100 flex flex-center flex-col flex-children-mb-1 h-100vh">
        <router-link
            to="/collections/list"
            class="btn btn--action">List collections</router-link>

        <router-link
            to="/import"
            class="btn btn--action">Import page XML</router-link>

        <p v-if="!apiAvailable">
            API doesn't seem to be available...
        </p>
    </menu>
</template>

<script>
    export default {
        computed : {
            apiAvailable() {
                return this.$store.state.apiAvailable;
            }
        },

        async mounted() {
            await this.$store.dispatch('checkApiAvailable');
        }
    };
</script>