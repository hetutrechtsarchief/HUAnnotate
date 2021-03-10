<template>
    <div class="el-detail">
        <dl class="el-detail__props"
            v-if="data">
            <dt>Input text</dt>
            <dd>{{data.originalText}}</dd>

            <dt>Corrected text</dt>
            <dd>
                <textarea
                    class="el-detail__textarea"
                    v-model="correctedText"></textarea>
            </dd>

            <dt>ID</dt>
            <dd>{{data.id}}</dd>

            <dt>Coordinates</dt>
            <dd>{{data.coordinates.join(' ')}}</dd>
        </dl>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                correctedText : this?.data?.userText
            };
        },

        props : {
            data : {
                type : Object
            }
        },

        watch : {
            correctedText() {
                this.$emit('textupdate', this.correctedText);
            }
        }
    };
</script>