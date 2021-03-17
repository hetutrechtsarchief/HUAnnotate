import axios from 'axios';

export class Api {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async call(method) {
        const url = `${this.endpoint}/${method}`;
        const req = await axios.get(url);
        return req.data;
    }
}