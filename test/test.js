
let assert = require('assert')

describe('Async Iterator', () => {
    let Iterator = require('../index.js')

    it('Must not iterate on empty dataset', async () => {
        let iterator = new Iterator()
        let array = []

        await iterator.iterate(async value => {
            array.push(value)
        })

        assert.equal(array.length, 0)
    })

    it('Must not iterate on dataset that was reset', async () => {
        let iterator = new Iterator([1, 2, 3, 4, 5])
        let array = []

        await iterator.reset()

        await iterator.iterate(async value => {
            array.push(value)
        })

        assert.equal(array.length, 0)
    })

    it('Must iterate on dataset push values to array in right order', async () => {
        let iterator = new Iterator([1, 2, 3, 4, 5])
        let array = []

        await iterator.iterate(async value => {
            array.push(value)
        })

        assert.deepEqual(array, [1, 2, 3, 4, 5])
    })

    it('Must iterate on dataset and push keys to array in right order', async () => {
        let iterator = new Iterator([1, 2, 3, 4, 5])
        let array = []

        await iterator.iterate(async (_, key) => {
            array.push(key)
        })

        assert.deepEqual(array, [0, 1, 2, 3, 4])
    })

    it('Must iterate on first dataset, then add some steps and iterate again', async () => {
        let iterator = new Iterator([1, 2, 3])
        let array = []

        await iterator.iterate(async value => {
            array.push(value)
        })

        await iterator.push([4, 5])

        await iterator.iterate(async value => {
            array.push(value)
        })

        assert.deepEqual(array, [1, 2, 3, 4, 5])
    })
})