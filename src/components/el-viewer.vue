<template>
    <div class="el-viewer"></div>
</template>

<script>
    // Adapted from https://openlayers.org/en/latest/examples/static-image.html
    import 'ol/ol.css';
    import Feature from 'ol/Feature';
    import GeoJSON from 'ol/format/GeoJSON';
    import ImageLayer from 'ol/layer/Image';
    import Map from 'ol/Map';
    import Polygon from 'ol/geom/Polygon';
    import Projection from 'ol/proj/Projection';
    import Static from 'ol/source/ImageStatic';
    import View from 'ol/View';
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';
    import { getCenter } from 'ol/extent';

    let extent, regionsLayer, map, projection;

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
                        }),
                        regionsLayer
                    ],
                    target : this.$el,
                    view : new View({
                        center : getCenter( extent ),
                        maxZoom : 8,
                        projection : projection,
                        zoom : 2
                    })
                });

                // Add interaction
                map.on('click', (e) => {
                    map.forEachFeatureAtPixel(e.pixel, (feature) => {
                        if (feature) {
                            // Get the feature by ID and return that,
                            // only return a single feature
                            const id = feature.getId();
                            const region = this.regions.find(r => r.id === id);

                            if (region) {
                                console.log(region);
                                return;
                            }
                        }
                    });
                });
            },

            initProjection() {
                projection = new Projection({
                    code : 'page-image',
                    extent : extent,
                    units : 'pixels'
                });
            },

            initRegions() {
                regionsLayer = new VectorLayer({
                    source : new VectorSource()
                });

                for (const region of this.regions) {
                    // FIXME
                    // OpenLayers by default flips the Y axis, so fix those
                    // positions as well
                    region.coordinates = region.coordinates.map((c) => {
                        c[1] = this.imageHeight - c[1];
                        return c;
                    });

                    // Note extra square brackets here!
                    const feature = new Feature(
                        new Polygon([ region.coordinates ])
                    );

                    feature.setId(region.id);

                    regionsLayer.getSource().addFeature(feature);
                }
            },
        },

        mounted() {
            extent = [0, 0, this.imageWidth, this.imageHeight];
            this.initRegions();
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
            },

            regions : {
                type : Array
            }
        }
    }
</script>