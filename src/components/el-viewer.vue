<template>
    <div class="el-viewer"></div>
</template>

<script>
    // Adapted from https://openlayers.org/en/latest/examples/static-image.html
    import 'ol/ol.css';
    import ImageLayer from 'ol/layer/Image';
    import Map from 'ol/Map';
    import Projection from 'ol/proj/Projection';
    import Static from 'ol/source/ImageStatic';
    import View from 'ol/View';
    import { getCenter } from 'ol/extent';

    export default {
        computed : {
            extent() {
                return [0, 0, this.imageWidth, this.imageHeight];
            }
        },

        data() {
            return {
                map : null,
                projection : null
            }
        },

        methods : {
            initMap() {
                this.map = new Map({
                    layers : [
                        new ImageLayer({
                            source : new Static({
                                imageExtent : this.extent,
                                projection : this.projection,
                                url : this.imageSrc
                            })
                        })
                    ],
                    target : this.$el,
                    view : new View({
                        center : getCenter( this.extent ),
                        maxZoom : 8,
                        projection : this.projection,
                        zoom : 2
                    })
                });
            },

            initProjection() {
                this.projection = new Projection({
                    extent : this.extent,
                    units : 'pixels'
                });
            }
        },

        mounted() {
            this.initMap();
            this.initProjection();
        },

        props : {
            imageHeight : {
                type : Number
            },

            imageSrc : {
                type : String
            },

            imageWidth : {
                type : Number
            }
        }
    }
</script>