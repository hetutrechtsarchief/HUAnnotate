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

    let extent, map, projection;

    export default {
        methods : {
            initMap() {
                map = new Map({
                    layers : [
                        new ImageLayer({
                            source : new Static({
                                imageExtent : extent,
                                projection : projection,
                                url : this.imageSrc
                            })
                        })
                    ],
                    target : this.$el,
                    view : new View({
                        center : getCenter( extent ),
                        maxZoom : 8,
                        projection : projection,
                        zoom : 2
                    })
                });
            },

            initProjection() {
                projection = new Projection({
                    code : 'page-image',
                    extent : extent,
                    units : 'pixels'
                });
            }
        },

        mounted() {
            extent = [0, 0, this.imageWidth, this.imageHeight];
            this.initProjection();
            this.initMap();
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