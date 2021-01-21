// To parse this format: https://github.com/OCR-D/PAGE-XML, as used by
// Transkribus
export function parse(string) {
    const parser = new window.DOMParser();
    return parser.parseFromString(string, 'text/xml');
}