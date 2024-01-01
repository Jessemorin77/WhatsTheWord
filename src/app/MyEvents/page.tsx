"use client";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function MyEvents() {
  const query = api.event.getall.useQuery();
  const events = query.data;

  return (
    <div>
      <div className="">
        <div className="flex justify-center ">
            <h1 className="text-bold mt-10 text-4xl">My Events</h1>
        </div>
        <div className="flex flex-start">
            <Link href='/HostEvent' className="mb-20 mt-10 btn">Create Event</Link>
        </div>
        <div className="flex flex-col justify-center items-center mb-20">
            {events?.map((event) => (
          <div key={event.id}>
            <div>
              <Image
                src={event.image}
                width={300}
                height={300}
                alt="image not found"
                className="w-full "
              />
              <h1 className="text-lg text-bold mt-5">Title: {event.title}</h1>
              <h1>Time: {event.time}</h1>
              <h1>Location: {event.location}</h1>
              <h1>Status: {event.status}</h1>
              <h1>School: {event.school}</h1>
              <h1>Attendees: {event.attendees}</h1>
              <h1>Event Type: {event.eventType}</h1>
              <div className="flex justify-center">
                <Link href={`/MyEvents/${event.id}`} className="btn">Edit</Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
