<template>
    <div class="el-viewer"></div>
</template>

<script>
    // Adapted from https://openlayers.org/en/latest/examples/static-image.html
    import 'ol/ol.css';
    import Feature from 'ol/Feature';
    import ImageLayer from 'ol/layer/Image';
    import Map from 'ol/Map';
    import Polygon from 'ol/geom/Polygon';
    import Projection from 'ol/proj/Projection';
    import Select from 'ol/interaction/Select';
    import Static from 'ol/source/ImageStatic';
    import View from 'ol/View';
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';
    import { getCenter } from 'ol/extent';

    let extent, regionsLayer, map, projection;

    export default {
        methods : {
            initInteraction() {
                const select = new Select();
                map.addInteraction(select);

                select.on('select', (e) => {
                    let hasFeature = false;

                    e.target.getFeatures().forEach((feature) => {
                        // Get the feature by ID and return that,
                        // only return a single feature
                        const regionId = feature.getId();
                        const region = this.regions.find(r => r.id === regionId);

                        if (region) {
                            this.$emit('selectregion', region);
                            hasFeature = true;
                            return;
                        }
                    });

                    if (!hasFeature) {
                        // No feature found after select, emit an event
                        // to indicate there are no regions selected
                        this.$emit('blurregion');
                    }
                });
            },

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

            selectNextRegion() {
                // Find the index of the currentRegion in all regions,
                // then emit an event with the next region in the list
                const index = this.regions.findIndex(r => r.id === this.currentRegion.id);

                // Add one to the index for the next one, but also add a module
                // so that it wraps around if we are at the last element
                const newIndex = (index + 1) % this.regions.length;
                this.$emit('selectregion', this.regions[newIndex]);
            }
        },

        mounted() {
            extent = [0, 0, this.imageWidth, this.imageHeight];
            this.initRegions();
            this.initProjection();
            this.initMap();
            this.initInteraction();
        },

        props : {
            currentRegion : {
                type : Object
            },

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