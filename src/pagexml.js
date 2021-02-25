// To parse this format: https://github.com/OCR-D/PAGE-XML, as used by
// Transkribus
import xmljs from 'xml-js';
import convert from 'xml-js';

export class PageXml {
    constructor(rawXml) {
        this.rawXml = rawXml;
        this.metadata = null;
        this.page = null;
        this.parse();
    }

    get imageHeight() {
        return parseInt(this.page._attributes.imageHeight);
    }

    get imageSrc() {
        return this.metadata.TranskribusMetadata._attributes.imgUrl;
    }

    get imageWidth() {
        return parseInt(this.page._attributes.imageWidth);
    }

    // get textRegions() {
    //     return this.page.TextRegion.map((d) => {
    //         // We want to convert up the TextRegion format, which looks like this:
    //         // "747,141 783,141 783,171 747,171"
    //         // Into this:
    //         // [ [747, 141], [783, 141], [783,171], [747,171] ]

    //         const coords = d.Coords._attributes.points.split(' ').map((p) => {
    //             return p.split(',').map(c => parseInt(c));
    //         });

    //         return {
    //             "coordinates" : coords,
    //             "id" : d._attributes.id,
    //             "text" : d?.TextEquiv?.Unicode._text
    //         };
    //     });
    // }

    get textLines() {
        const lines = [];

        for (const region of this.page.TextRegion) {
            if (!Array.isArray(region.TextLine)) {
                region.TextLine = [ region.TextLine ];
            }

            for (const line of region.TextLine) {
                const coords = line.Coords._attributes.points.split(' ').map((p) => {
                    return p.split(',').map(c => parseInt(c));
                });

                lines.push({
                    "coordinates" : coords,
                    "id" : line._attributes.id,
                    "text" : line?.TextEquiv?.Unicode._text
                });
            }
        }

        return lines;
    }

    parse() {
        const data = xmljs.xml2js(this.rawXml, {
            compact : true
        });

        // Couple of sanity checks
        if (!('PcGts' in data)) {
            throw new Error('No PcGts header. Is this a valid page XML file?');
        }

        if (!('TranskribusMetadata' in data.PcGts.Metadata)) {
            throw new Error('No TranskribusMetadata in this XML file');
        }

        this.metadata = data.PcGts.Metadata;
        this.page = data.PcGts.Page;
    }
}