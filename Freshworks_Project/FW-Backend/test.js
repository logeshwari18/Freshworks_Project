var process = require('process')
var dataStore = require('./classCreation')

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
    console.error('Command doesnot exists')
} else {
     (async() => {
        var input = new dataStore(process.argv[3], process.argv[4], process.argv[5], process.argv[6])
        if(process.argv[2] === 'create') await input.create().then((data) => data['time-to-live']).then((timer) => setTimeout(async() => {
            if(timer > 0) await input.delete()
            else console.log('Completed created operation')
        },timer)) // To run the code use the command "npm test create path key value timer".
        if(process.argv[2] === 'read') await input.read().then((res) => console.log(res))// To run the code use the command "npm test read path key"
        if(process.argv[2] === 'delete')await input.delete().then(()=>console.log('Completed delete operation'))// To run the code use the command "npm test delete path key"
    })()
}  
