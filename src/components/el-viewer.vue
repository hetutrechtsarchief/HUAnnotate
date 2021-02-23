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
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';
    import { Fill, Stroke, Style } from 'ol/style';
    import View from 'ol/View';
    import { getCenter } from 'ol/extent';

    let extent, regionsLayer, regionsSource, map, projection;

    const STYLE_UNSELECTED = new Style({
        fill : new Fill({
            color : 'rgba(0, 0, 255, 0.1)'
        })
    });

    const STYLE_SELECTED = new Style({
        fill : new Fill({
            color : 'rgba(255, 255, 255, 0.3)'
        })
    });

    export default {
        computed : {
            currentRegionIndex() {
                if (this.currentRegion) {
                    return this.regions.findIndex(r => r.id === this.currentRegion.id);
                } else {
                    return -1;
                }
            }
        },

        methods : {
            deselectAllFeatures() {
                regionsLayer.getSource().forEachFeature((f) => {
                    f.setStyle(STYLE_UNSELECTED);
                });
            },

            initInteraction() {
                const select = new Select();
                map.addInteraction(select);

                select.on('select', (e) => {
                    this.deselectAllFeatures();
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

                    // We also need to add the first coordinate again, because
                    // otherwise we can't make a proper rectangle

                    region.coordinates.push(region.coordinates[0]);

                    // Note extra square brackets here!
                    const feature = new Feature(
                        new Polygon([ region.coordinates ])
                    );

                    feature.setStyle(STYLE_UNSELECTED);

                    feature.setId(region.id);

                    regionsLayer.getSource().addFeature(feature);
                }
            },

            selectFeature(id) {
                regionsLayer.getSource().forEachFeature((f) => {
                    if (f.getId() === id) {
                        f.setStyle(STYLE_SELECTED);
                    }
                });
            },

            selectNextRegion() {
                // Add one to the index for the next one, but also add a module
                // so that it wraps around if we are at the last element
                const newIndex = (this.currentRegionIndex + 1) % this.regions.length;
                this.$emit('selectregion', this.regions[newIndex]);
            },

            selectPreviousRegion() {
                let newIndex = this.currentRegionIndex - 1;
                newIndex < 0 ? this.regions.length -1 : newIndex;
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
        },

        watch : {
            currentRegion() {
                this.deselectAllFeatures();

                if (this.currentRegion) {
                    this.selectFeature(this.currentRegion.id);
                }
            }
        }
    }
</script>