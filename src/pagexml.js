// To parse this format: https://github.com/OCR-D/PAGE-XML, as used by
// Transkribus
import xmljs from 'xml-js';

export class PageXml {
    constructor(rawXml) {
        this.rawXml = rawXml;
        this.metadata = null;
        this.page = null;
        this.parse();
    }

    getImageHeight() {
        return parseInt(this.page._attributes.imageHeight);
    }

    getImageSrc() {
        return this.metadata.TranskribusMetadata._attributes.imgUrl;
    }

    getImageWidth() {
        return parseInt(this.page._attributes.imageWidth);
    }

    getTextLines() {
        const lines = [];

        for (const region of this.page.TextRegion) {
            if (!Array.isArray(region.TextLine)) {
                region.TextLine = [ region.TextLine ];
            }

            for (const line of region.TextLine) {
                const coords = line.Coords._attributes.points.split(' ').map((p) => {
                    return p.split(',').map(c => parseInt(c));
                });

                // We get the text from the lines, and add that to
                // two different keys: both an 'originalText' and a
                // 'userText' that we can edit later in the app
                const text = line?.TextEquiv?.Unicode._text;

                lines.push({
                    "coordinates" : coords,
                    "id" : line._attributes.id,
                    "originalText" : text,
                    "userText" : text
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
        this.imageHeight = this.getImageHeight();
        this.imageSrc = this.getImageSrc();
        this.imageWidth = this.getImageWidth();
        this.textLines = this.getTextLines();
    }
}