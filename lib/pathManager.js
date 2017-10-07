'use strict';

const { isAbsolute, resolve, join } = require('path')

/**
 * @function  [getContactList]
 * @returns [contactlist] contacts
 */
var getFullPath = (path) => {
    if (isAbsolute(path)) {
        var sourceFolder = path;
    } else {
        var sourceFolder = resolve(join(process.cwd(), path))
    }

    return sourceFolder;
}

const preparePath = (path) => {

    var sourcePath = getFullPath(path)
    return sourcePath;
}

// Export all methods
module.exports = {
    preparePath
};