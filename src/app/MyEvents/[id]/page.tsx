"use client"
import { api } from "~/trpc/react";
import Image from "next/image";
import SchoolModel from "~/app/_components/ui/SchoolModel";

function EditEvent({params}: {params: {id: number}}) {
    const id = params.id;

    const query = api.event.getById.useQuery({id: Number(id)})

    const event = query.data

    const handleSchoolSelect = () => {

    }
    return ( 
        <div>
            <div className="w-full h-64 relative">
            <Image 
                src={event?.image}
                layout="fill" // This makes the image fill the container
                objectFit="cover" // This scales the image to maintain its aspect ratio while fitting into the container
                alt="image not found"
            />
            </div>
                <div className="btn flex justify-center my-5">
                    <button>Edit Photo</button>
                </div>
            <div className="flex flex-row my-5 items-center">
                <h1 className="mr-5">Title: {event?.title}</h1>
                <input 
                placeholder="Change Title: " 
                className="input input-bordered"
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        console.log('enter hit')
                    }
                }}
                />
            </div>
            <div className="flex flex-row my-5 items-center">
                <h1 className="mr-5">Event Type: {event?.eventType}</h1>
                <input placeholder="Change Event Type: " className="input input-bordered"/>
            </div>
            <div className="flex flex-row my-5 items-center">
                <h1 className="mr-5">Location: {event?.location}</h1>
                <input placeholder="Change Location: " className="input input-bordered"/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1>School: {event?.school}</h1>
                <SchoolModel onSchoolSelect={handleSchoolSelect}/>
            </div>
            <div className="flex flex-col justify-center items-center my-5">
                <h1>Status: {event?.status}</h1>
            <div className="flex flex-row mt-5">
                    <button className="btn">Pending</button>
                    <button className="btn">Active</button>
                    <button className="btn">Pending</button>
                </div>
            </div>
            <div className="flex flex-col my-5 items-center ">
                <h1 className="">Description: {event?.description}</h1>
                <input placeholder="Change Description: " className="input input-bordered"/>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1>Announcements: </h1>
                <button>Create Announcement</button>
            </div>
            <div>
                <h1>Chat: </h1>
            </div>
            <div>
                <h1>Reviews: </h1>
            </div>
        </div>
     );
}

export default EditEvent;