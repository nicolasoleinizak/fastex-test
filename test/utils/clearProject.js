const fs = require('fs')

function clearProject () {
    removePath('./src', {recursive: true, force: true})
    removePath('./index.js')
    // Remove "type" from package.json, if exists
}

function removePath (path, options = {}) {
    if(fs.existsSync(path)){
        fs.rmSync(path, options)
    }
}

module.exports = clearProject