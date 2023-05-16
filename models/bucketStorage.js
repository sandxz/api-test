'use strict'
const {Storage} = require('@google-cloud/storage')
const fs = require('fs')

const path = require('path');

//jangan lupa bikin service account and save the json file and save as serviceacc.json
const pathKey = path.resolve('./serviceacc.json')


const gcs = new Storage({
    projectId: 'connect-the-project-id',
    keyFilename: pathKey
})

const bucketName = 'bucket-name'
const bucket = gcs.bucket(bucketName)

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let theStorage = {}

theStorage.uploadToGcs = (req, res, next) => {
    if (!req.file) return next()

    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
    })

    stream.end(req.file.buffer)
}

module.exports = theStorage
