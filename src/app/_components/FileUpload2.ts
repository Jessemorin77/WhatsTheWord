const { Storage } = require('@google-cloud/storage');


const bucketName = 'whats-the-word-buckets'

const storageClass = 'coldline';

const location = 'US';

const storage = new Storage();

async function uploadFile(filePath, dest)