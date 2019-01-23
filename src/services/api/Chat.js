
export default class Chat {
    constructor(client) {
        this.client = client
    }

    getTestTable(config = {}) {
        const url = `getTestTable`
        return this.client.get(url, config)
    }

    getTestChat(to, from, config = {}) {
        const url = `getTestChat`
        const params = {

        }
        return this.client.post(url, params, config)
    }

    sendTestMsg(to, from, body, config = {}) {
        const url = `sendTestMsg`
        const params = {

        }
        return this.client.post(url, params, config)
    }
}