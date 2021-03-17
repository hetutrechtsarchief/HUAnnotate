<template>
    <div class="screen">
        <el-header />

        <section class="screen__viewer">
            <ul class="el-thumblist">
                <li v-for="(item, index) in list"
                    class="el-thumblist__item"
                    v-bind:key="index">
                    <router-link
                        v-bind:to="item.to">
                        <img v-if="item.thumbUrl"
                             v-bind:src="item.thumbUrl"
                             v-bind:alt="'Thumbnail of collection <' + item.colName + '>'" />

                        <h2 class="el-thumblist__title">
                            {{item.colName}}
                        </h2>

                        <h3 class="el-thumblist__description">
                            {{item.description}}
                        </h3>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import ElHeader from './el-header.vue';

    export default {
        components : { ElHeader },

        computed : {
            list() {
                return this.$store.state[this.value];
            }
        },

        methods : {
            load() {
                // This is obviously horrible and needs to be fixed
                if (this.actionArg) {
                    this.$store.dispatch(this.action, this.actionArg);
                } else {
                    this.$store.dispatch(this.action);
                }
            }
        },

        mounted() {
            this.load();
        },

        props : {
            action : String,
            actionArg : Object,
            value : String
        },

        watch : {
            action() {
                this.load();
            }
        }
    }
</script>