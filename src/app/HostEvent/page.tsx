"use client";
import React, { useState } from "react";
import SchoolModel from "../_components/ui/SchoolModel";
import { api } from "~/trpc/react";
import Autocomplete from "react-google-autocomplete";
// import TimePicker from "../_components/ui/TimePicker"; // Uncomment if using a custom TimePicker
interface FinalEventData {
  eventType: string;
  time: string;
  title: string;
  description: string;
  school: string;
  location: string;
  imageUrl: string;
}
export default function HostEvent() {
  const [imageFile, setImageFile] = useState(null);
  const [eventData, setEventData] = useState({
    eventType: "",
    time: "",
    title: "",
    description: "",
    school: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setImageFile(image);
  };

  const handleSchoolSelect = (school: string) => {
    setEventData((prevState) => ({ ...prevState, school: school }));
  };

  const mutation = api.event.create.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventData);

    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to upload image");
        }

        console.log("Uploaded image URL:", result.url);

        imageUrl = result.url;
      } catch (error) {
        console.error("Error submitting the form:", error);
        // Handle the error appropriately
      }
    }

    const finalEventData: FinalEventData = {
      ...eventData,
      imageUrl: imageUrl,
    };

    console.log("final Event Data: ", finalEventData);
    //TODO: send data to backend

    mutation.mutate(finalEventData);

    setEventData({
      eventType: "",
      time: "",
      title: "",
      description: "",
      school: "",
      location: "",
    });
    setImageFile(null);
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-4 text-2xl font-bold">Host Event</h1>
      <div className="mb-3">
        <label htmlFor="image-upload" className="block text-lg">
          Upload Images:
        </label>
        <input
          id="image-upload"
          type="file"
          className="file-input max-w-md"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="event-type" className="block text-lg">
          Event Type:
        </label>
        <input
          id="event-type"
          type="text"
          className="input input-primary w-full max-w-xs"
          name="eventType"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="time-picker" className="block text-lg">
          Time:
        </label>
        <input
          id="time-picker"
          type="time"
          className="input input-primary w-full max-w-xs"
          name="time"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="block text-lg">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="input input-primary w-full max-w-xs"
          name="title"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="block text-lg">
          Location of Event:
        </label>
        <input
          id="location"
          type="text"
          className="input input-primary w-full max-w-xs"
          name="location"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="block text-lg">
          Description:
        </label>
        <textarea
          id="description"
          className="textarea textarea-primary w-full max-w-md"
          name="description"
          onChange={handleInputChange}
        />
      </div>
      <div>
      <Autocomplete
      className="btn"
  apiKey={"AIzaSyBq6A4iZc9H5Xk8VbpA4J7rPMXoTbAGEbU"}
  onPlaceSelected={(place) => {
    console.log(place)
  }}
/>;
      </div>
      <div>
        <h1>Institution:</h1>
        <SchoolModel onSchoolSelect={handleSchoolSelect} />
        <h1>Selected School: {eventData.school}</h1>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Create Event
      </button>
    </form>
  );
}
