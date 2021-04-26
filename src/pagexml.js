// To parse this format: https://github.com/OCR-D/PAGE-XML, as used by
// Transkribus
import xmljs from 'xml-js';

export class PageXml {
    constructor() {
        this.imageHeight = null;
        this.imageSrc = null;
        this.imageWidth = null;
        this.metadata = null;
        this.page = null;
    }

    getTextLines() {
        const lines = [];

        for (const region of this.page.TextRegion) {
            if (!Array.isArray(region.TextLine)) {
                region.TextLine = [ region.TextLine ];
            }

            for (const line of region.TextLine) {
                if (!line) {
                    continue;
                }

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

    populateFromXml(xml) {
        const data = xmljs.xml2js(xml, {
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
        this.setPage(data.PcGts.Page);
        this.setImageHeight(parseInt(this.page._attributes.imageHeight));
        this.setImageSrc(this.metadata.TranskribusMetadata._attributes.imgUrl);
        this.setImageWidth(parseInt(this.page._attributes.imageWidth));
        this.textLines = this.getTextLines();
    }

    setImageHeight(height) {
        this.imageHeight = height;
    }

    setImageSrc(src) {
        this.imageSrc = src;
    }

    setImageWidth(width) {
        this.imageWidth = width;
    }

    setPage(page) {
        this.page = page;
    }
}