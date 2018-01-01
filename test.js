let Iterator = require('./index.js')

let main = async () => {
    let iterator = new Iterator(['test1', 'test2', 'test3', 'test4', 'test5'])
    
    await iterator.iterate(async (value, index) => {
        console.log(value, index)
    })

    console.log('Check')
}

main()