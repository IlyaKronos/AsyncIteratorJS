class Storage {
    constructor(Elements) {
        this.elements = Elements
        this.iteration = -1
    }

    async getNext() {
        this.iteration++

        return this.elements[this.iteration]
    }

    async hasMore() {
        return (this.elements[this.iteration + 1] ? true : false)
    }
}

class AsyncIterator {
    constructor(Elements) {
        this.storage = new Storage(Elements || [])
        this.iteration = 0
        this.results = []
    }

    async iterate(func, another = false) {
        if (!await this.storage.hasMore()) { return (another ? this.results : []) }

        this.results[this.iteration] = await func(await this.storage.getNext(), this.iteration)
        this.iteration++

        await this.iterate(func, true)
    }
}

module.exports = AsyncIterator