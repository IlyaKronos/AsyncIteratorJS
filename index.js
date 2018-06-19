class Storage {
    /**
     * Constructor of iterator data storage
     * @param {Array} Elements Dataset array
     * @constructor
     */
    constructor(Elements) {
        this.elements = Elements
        this.iteration = -1
    }

    /**
     * This function is pushing new elements to iterator data storage
     * @param {Array} Elements New dataset array
     */
    async push(Elements) {
        this.elements = [...this.elements, ...Elements]
    }

    /**
     * This function is resetting data storage
     */
    async reset() {
        this.elements = []
        this.iteration = -1
    }

    /**
     * This function is getting next iteration data
     */
    async getNext() {
        this.iteration++

        return this.elements[this.iteration]
    }

    /**
     * This function is checking is there next iteration exists
     */
    async hasMore() {
        return (this.elements[this.iteration + 1] ? true : false)
    }
}

class AsyncIterator {
    /**
     * Constructor of Async Iterator
     * @param {Array} Elements Dataset array
     * @constructor
     */
    constructor(Elements) {
        this.storage = new Storage(Elements || [])
        this.iteration = 0
        this.results = []
    }

    /**
     * Pushing new elements to iterator data storage
     * @param {Array} Elements New dataset array
     */
    async push(Elements) {
        await this.storage.push(Elements)
    }

    /**
     * This function is resetting data storage
     */
    async reset() {
        await this.storage.reset()
    }

    /**
     * This function is iterating dataset
     * @param {Promise} func Iteration function
     * @param {Boolean} another Private variable
     */
    async iterate(func, another = false) {
        if (!await this.storage.hasMore()) { return (another ? this.results : []) }

        this.results[this.iteration] = await func(await this.storage.getNext(), this.iteration)
        this.iteration++

        await this.iterate(func, true)
    }
}

module.exports = AsyncIterator