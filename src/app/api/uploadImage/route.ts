import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';

AWS.config.update({
  region: 'us-east-1', // Replace with your bucket's region
  accessKeyId: 'AWS_ACCESS_KEY_ID', // Replace with your access key ID
  secretAccessKey: 'AWS_SECRET_KEY', // Replace with your secret access key
});

const s3 = new AWS.S3();
const bucketName = 'cleanbnb-images'; // Replace with your bucket name

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      throw new Error('No file provided.');
    }


    if(file.type.startsWith('image/')) {
        console.log('file.type:', file.type); 
    } else {
        throw new Error("Uploaded File is not an image: ")
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());

    console.log('buffer Length:', buffer.length);

    if(buffer.length === 0){
        throw new Error('bufferlength is at 0')
    }

    if(!file.name){
        throw new Error('there is no file.name')
    }

    const cloudFileName = `uploads/${Date.now()}-${file.name}`;

    // Upload the file to S3
    const uploadResult = await s3.upload({
      Bucket: bucketName,
      Key: cloudFileName,
      Body: buffer,
      ContentType: file.type, // Set the content type based on the file's type
      ACL: 'public-read', // Make the object publicly readable
    }).promise();

    console.log(`File uploaded successfully to ${uploadResult.Location}`);
    return NextResponse.json({ message: "File uploaded successfully!", url: uploadResult.Location });
  } catch (error) {
    console.error('Failed to upload:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
