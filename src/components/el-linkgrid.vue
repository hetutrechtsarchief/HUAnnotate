<template>
    <ul class="el-linkgrid">
        <p v-if="!items.length">Loading...</p>

        <li v-for="(item, index) in items"
            class="el-linkgrid__item"
            v-bind:key="index">
            <router-link
                class="el-linkgrid__link"
                v-bind:to="item.path">
                <img v-if="item.thumb"
                     class="el-linkgrid__image"
                     v-bind:src="item.thumb"
                     v-bind:alt="'Thumbnail of <' + item.title + '>'" />

                <h2 class="el-linkgrid__title">
                    {{item.title}}
                </h2>

                <h3 class="el-linkgrid__description">
                    {{item.description}}
                </h3>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props : {
            items : Array
        }
    };
</script>