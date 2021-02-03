// To parse this format: https://github.com/OCR-D/PAGE-XML, as used by
// Transkribus
import xmljs from 'xml-js';

export class PageXml {
    constructor(rawXml) {
        this.rawXml = rawXml;
        this.data = null;
        this.parse();
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

        this.data = data;
    }
}