
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
            to,
            from
        }
        return this.client.post(url, params, config)
    }

    sendTestMsg(to, from, body, config = {}) {
        const url = `sendTestMsg`
        const params = {
            to,
            from,
            body
        }
        return this.client.post(url, params, config)
    }
}