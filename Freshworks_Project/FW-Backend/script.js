var keyFileStorage = require('key-file-storage')
var sizeof = require('object-sizeof')

module.exports.createFile = async function (path, key, value, limit) {
    path = path || __dirname
    var kfs = keyFileStorage(path)
    if(checkSize(String(key),value)) {
        return new Promise((resolve, reject) => {
            value = JSON.parse(value)
            value['time-to-live'] = limit
            key in kfs(), kfs((error, exists) => {
                if (exists) {
                    throw new Error('key already exists')
                }
                resolve(kfs(key, value))
            })
        })
    } else {
        throw new Error('Size of key or value exceeds limit')
    }
}   

module.exports.readFile = function (path, key) {
    path = path || __dirname
    var kfs = keyFileStorage(path)
    return new Promise((resolve, reject) => {
        key in kfs(), kfs((error, exists) => {
            if (exists) {
                resolve(kfs(key))
            }
            reject('key doesnot exists')
        })
    })
}

module.exports.deleteFile = function (path, key) {
    path = path || __dirname
    var kfs = keyFileStorage(path)
    return new Promise((resolve, reject) => {
        key in kfs(), kfs((error, exists) => {
            if (exists) {
                resolve(new kfs(key))
            }
            reject('key doesnot exists')
        })
    })
}

function checkSize(key,value) {
    if(key.length <= 32 && sizeof(value) <= 16000) {
        return true
    }
    return false
}