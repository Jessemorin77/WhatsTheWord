const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const bucketName = 'whats-the-word-buckets';  // Static bucket name
const location = 'US';
async function createBucketIfNotExists() {
  const [bucketExists] = await storage.bucket(bucketName).exists();
  if (!bucketExists) {
    await storage.createBucket(bucketName, {
      location: location, // e.g., 'US'
      // Include other options as necessary
    });
    console.log(`Bucket ${bucketName} created.`);
  }
}

async function uploadFile(fileBuffer, fileName) {
  try {
    // Ensure the bucket exists
    await createBucketIfNotExists();

    // References an existing bucket
    const bucket = storage.bucket(bucketName);

    // Uploads the file to the bucket
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        reject(`Upload failed: ${error.message}`);
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log(`${fileName} uploaded to ${bucketName}.`);
        resolve(publicUrl);
      });

      blobStream.end(fileBuffer);
    });
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error; // Rethrow the error for further handling
  }
}

module.exports = uploadFile;
