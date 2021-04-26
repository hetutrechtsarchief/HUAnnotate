import axios from 'axios';
import xmljs from 'xml-js';
import { PageXml } from './pagexml.js';

function parseXml(xml) {
    return xmljs.xml2js(xml, {
        compact : true
    });
}

export class Api {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async call(method) {
        const url = `${this.endpoint}/${method}`;
        const req = await axios.get(url);
        return req.data;
    }

    async getPageData(collectionId, documentId, pageNr) {
        // We need two calls: one to get general metadata including the
        // image file and one for the actual pageXML


        // For some reason, the metadata call gives back XML, so we need to parse
        // that first
        const url = `get/collections/${collectionId}/${documentId}/${pageNr}`;
        const xmlData = await this.call(url);
        const pageData = parseXml(xmlData);

        // Sanity check
        if (!('trpPage' in pageData)) {
            throw new Error('No trpPage header. Is this a valid XML call?');
        }

        const data = pageData.trpPage;

        // Now get the page XML
        const pageXml = await this.call(`${url}/text`);
        const parsedPage = parseXml(pageXml);

        // We're merging some data points here, because not everything is
        // in the page XML
        const page = new PageXml();
        page.setImageHeight(parseInt(data.height._text));
        page.setImageWidth(parseInt(data.width._text));
        page.setImageSrc(data.url._text);
        page.setPage(parsedPage.PcGts.Page);

        return { data, page };
    }
}