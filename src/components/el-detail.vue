<template>
    <div class="el-detail">
        <dl class="el-detail__props"
            v-if="data">
            <dt>Text</dt>
            <dd>{{data.text}}</dd>

            <dt>ID</dt>
            <dd>{{data.id}}</dd>

            <dt>Coordinates</dt>
            <dd>{{data.coordinates.join(' ')}}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        props : {
            data : {
                type : Object
            }
        }
    };
</script>