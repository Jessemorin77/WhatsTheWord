"use client";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import SchoolModel from "./_components/ui/SchoolModel";
import { useState } from "react";

export default function Home() {
  const [selectedSchool, setSelectedSchool] = useState("");
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    console.log(selectedSchool);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Whats the <span className="text-[hsl(280,100%,70%)]">Word?</span>
        </h1>
        <h1>Find Events in Your Area or Institution</h1>
        <div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              className="input input-primary w-full max-w-xs"
            />
          </div>
          <h1>or</h1>
          <div>
            {/* The button to open modal */}
            <SchoolModel onSchoolSelect={handleSchoolSelect} />
            <h1 className="text-white">Selected School: {selectedSchool}</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
