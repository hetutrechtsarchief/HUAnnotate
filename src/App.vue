<template>
    <div class="app">
        <el-header />
        <router-view />
    </div>
</template>

<script>
    import ElHeader from './components/el-header.vue';

    export default {
        components : { ElHeader }
    };
</script>