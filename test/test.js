
let assert = require('assert')
let Iterator = require('../index.js')

describe('Default functional', () => {
    it('Must return right values', async () => {
        let values = [1, 2, 3, 5, 7, 11]
        
        let iterator = new Iterator(values)
        let array = []

        await iterator.iterate(async value => {
            array.push(value)
        })

        assert.deepEqual(array, values)
    })

    it('Must return right keys', async () => {
        let values = [1, 2, 3, 5, 7, 11]
        
        let iterator = new Iterator(values)
        let array = []

        await iterator.iterate(async (_, key) => {
            array.push(key)
        })

        assert.deepEqual(array, [0, 1, 2, 3, 4, 5])
    })

    it('Must return right dataset', async () => {
        let values = [1]

        let iterator = new Iterator(values)
        let dataset = []

        await iterator.iterate(async (_, __, data) => {
            dataset = data
        })

        assert.deepEqual(dataset, values)
    })
})

describe('Iteration checks', () => {
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

    it('Must iterate 100 times (because of pushing new elements right in iteration function', async () => {
        let iterator = new Iterator([1])
        let array = []

        await iterator.iterate(async (value, key) => {
            array.push(value)

            if (key != 99) {
                await iterator.push([value + 1])
            }
        })
        
        assert.equal(array.length, 100)
    })
})