var kfs = require('./script')

class dataStore {
    constructor(path, key, value,limit) {
        this.path = path
        this.key = key
        this.value = value
        this.limit = limit
    }
    async create() {
        return await kfs.createFile(this.path,this.key,this.value,this.limit)
    }
    async read() {
        return  await kfs.readFile(this.path,this.key)
    }
    async delete() {
        return await kfs.deleteFile(this.path,this.key)
    }
}

module.exports = dataStore