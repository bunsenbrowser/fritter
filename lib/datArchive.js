const GATEWAY_URL = "http://localhost:3000/"
const DATARCHIVE_URL = "http://localhost:3001/"
const BASE_32_KEY_LENGTH = 52
class DatArchive {

    constructor(url) {
        this.url = url
        console.log(url)
    }

    async readFile(path, opts) {
        console.log('DatArchive API wants to read: ' + path);
        path = path.replace('//','')
        const url = GATEWAY_URL + path
        let response = await fetch(url)
        let data = await response.json();
        return JSON.stringify(data);
    }

    async create(profile) {
        // let profile = { title, description, type, author }
        console.log('I want to create: ' + JSON.stringify(profile));
        const url = DATARCHIVE_URL + 'create'
        let response = await fetch(url,{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(profile), // body data type must match "Content-Type" header
        })
        let result = await response.json();
        // return JSON.stringify(result);
        const archive = new DatArchive(null)
        const mergedArchive = Object.assign(archive, result);
        return mergedArchive;
    }

    async getInfo(opts) {
        const url = this.url
        console.log('I want to getInfo: ' + url);
        // const resource = url.replace('dat://','')
        const data = {url:url, opts:opts}
        const appUrl = DATARCHIVE_URL + 'getInfo'
        let response = await fetch(appUrl,{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        let result = await response.json();
        // return JSON.stringify(result);
        return result;
    }

    async mkdir(filename) {
        console.log('I want to mkdir: ' + filename);
        const url = this.url
        // const resource = url.replace('dat://','')
        const data = {url:url,filename: filename}
        const appUrl = DATARCHIVE_URL + 'mkdir'
        let response = await fetch(appUrl,{
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        let result = await response.json();
        return result;
    }

    static readFile(path, opts) {
        return new DatArchive().readFile(path, opts)
    }

    static create(profile) {
        return new DatArchive().create(profile)
    }

    static getInfo(opts) {
        return new DatArchive().getInfo(opts)
    }

    static mkdir(filename) {
        return new DatArchive().mkdir(filename)
    }

}

// DatArchive.prototype.readFile = new DatArchive().readFile
// DatArchive.prototype.create = new DatArchive().create

if (!window.DatArchive) {
    doPolyfill()
}

function doPolyfill () {
    window.DatArchive = DatArchive
}

