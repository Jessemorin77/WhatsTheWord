'use client'
import { useState } from "react";
import { env } from "~/env";
import Autocomplete from "react-google-autocomplete";
import { SchoolModel } from "~/app/_components/ui/SchoolModel";
import { createEventAction } from "~/app/action";
import { UploadButton } from "~/app/_components/utils/uploadthing";

export default function HostEvent() {
    const [cityState, setCityState] = useState<string>("")
    const [school, setSchool] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
  return (
    <form action={createEventAction}
      className="flex flex-col items-center" 
    >
      <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files*****: ", res);
          console.log("Files*****: ", res);
          const fileData = res[0];

          if (fileData && fileData.url) {
            // Now you have the URL of the uploaded file
            console.log("Uploaded file URL:", fileData.url);
            
            setImageUrl(fileData.url)
            console.log(imageUrl)
            // Do something with the URL, e.g., store it in state or send it to another API
          } else {
            console.log("No URL found in the response");
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <input type="hidden" name="imageUrl" value={imageUrl}/>
      </div>
        <div className="flex justify-center mt-2">
          <h1 className="text-4xl">Host Event</h1>
        </div>
        <div className="mb-3 mt-10 ml-16">
        <label htmlFor="image-upload" className="block text-lg">
          Upload Images:
        </label>
        <input
          id="image-upload"
          name="image"
          type="file"
          className="file-input max-w-md"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="block text-lg">
          Title:
        </label>
        <input
          name="title"
          type="text"
          className="input input-primary w-full max-w-xs"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="event-type" className="block text-lg">
          Event Type:
        </label>
        <input
          type="text"
          className="input input-primary w-full max-w-xs"
          name="eventType"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="time-picker" className="block text-lg">
          Time:
        </label>
        <input
          type="time"
          className="input input-primary w-full max-w-xs"
          name="time"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="block text-lg">
          Location of Event(alias):
        </label>
        <input
          type="text"
          className="input input-primary w-full max-w-xs"
          name="location"
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-lg">
          City and State
        </label>
        <Autocomplete
            className="input input-primary"
            id="cityState"
            apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API}
            onPlaceSelected={(cityState) => {
                const myCityState: string = cityState.formatted_address
                setCityState(myCityState)
                console.log(cityState)
            }}
          />
        <input type="hidden" name="cityState" value={cityState}/> 
      </div>
      <div className=" mt-3">
        <label htmlFor="description" className="block text-lg">
          Description:
        </label>
        <textarea
          className="textarea textarea-primary w-full max-w-lg"
          name="description"
        />
      </div>
      <div className=" my-10">
        <SchoolModel  onSchoolSelect={(institution: string) => {
            setSchool(institution)
            console.log(institution)
        }
        }/>
        <input type="hidden" name="school" value={school}/> 
      </div>

      <button type="submit" className="btn btn-primary mt-4 mb-10">
        Create Event
      </button>
    </form>
  );
}
