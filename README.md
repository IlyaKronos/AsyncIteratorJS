### AsyncIterator
This library is designed to implement a sequential iteration with the ability to use async functions within iterative functions.

## Examples
```javascript
let AsyncIterator = require('asynciteratorjs')
    
let sleep = ms => {
    return new Promise(resolve => { setTimeout(resolve, ms) })
}
    
async function main() {
    let iterator = new AsyncIterator([1, 2, 3, 4])
    let array = []
        
    await iterator.iterate(async (value, key, dataset) => {
        await sleep(value * 1000)
            
        array.push({ key, value })
    })
    
    // After 10 seconds (because of sleep function)
    console.log(array) // [{ key: 0, value: 1 }, { key: 1, value: 2 }, { key: 2, value: 3 }, { key: 3, value: 4 }]
}
    
main()
```

## Docs

### new AsyncIterator(Elements)
Constructor of Async Iterator


| Param | Type | Description |
| --- | --- | --- |
| Elements | <code>Array</code> | Dataset array |

<a name="AsyncIterator+push"></a>

### asyncIterator.push(Elements)
Pushing new elements to iterator data storage

**Kind**: instance method of [<code>AsyncIterator</code>](#AsyncIterator)  

| Param | Type | Description |
| --- | --- | --- |
| Elements | <code>Array</code> | New dataset array |

<a name="AsyncIterator+reset"></a>

### asyncIterator.reset()
This function is resetting data storage

**Kind**: instance method of [<code>AsyncIterator</code>](#AsyncIterator)  
<a name="AsyncIterator+iterate"></a>

### asyncIterator.iterate(func, another)
This function is iterating dataset

**Kind**: instance method of [<code>AsyncIterator</code>](#AsyncIterator)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>Promise</code> |  | Iteration function |
| another | <code>Boolean</code> | <code>false</code> | Private variable |

### Iteration function(value, key, array)

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Any</code> | Iteration value |
| key | <code>Number</code> | Iteration key |
| array | <code>Array</code> | Iteration dataset |