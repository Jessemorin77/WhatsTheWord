"use server";
import AWS from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';


export async function createEventAction(formData: FormData) {
  let imageUrl = "";
  //get data from form
  const rawFormData = {
    title: formData.get("title") as string,
    eventType: formData.get("eventType") as string,
    time: formData.get("time") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as File,
    cityState: formData.get("cityState") as string,
    school: formData.get("school") as string,
  };
  console.log("raw formData: ", rawFormData);
  //isolate Image
  const imageFile = rawFormData.image;

  console.log("image file:", imageFile)


  if(imageFile){

    const formData = new FormData();
    formData.append("image", imageFile);

    await uploadFile(imageFile)

  }
//after image upload
  const formattedData = {
    ...rawFormData,
    image: imageUrl,
  }
  console.log(formattedData)

}


//set aws globals
AWS.config.update({
  region: 'us-east-1', // Replace with your bucket's region
  accessKeyId: 'AKIA3TRZQE5PJQWKUDV4', // Replace with your access key ID
  secretAccessKey: 'LIVJWX4T41PG5/KyX/AHcv/M2PP8otxfDieWPjp0', // Replace with your secret access key
});

const s3 = new AWS.S3();
const bucketName = 'cleanbnb-images'; // Replace with your bucket name

async function uploadFile(file: File){
  try{
    //error check
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


  } catch(e){
    console.error('Failed to upload:', e);
  } 
  return;
}