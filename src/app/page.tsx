"use client";
import { AutoComplete } from "./_components/ui/AutoComplete";
import { useState } from "react";
import { SchoolModel } from "./_components/ui/SchoolModel";

interface EventData {
  eventType: string;
  time: string;
  title: string;
  description: string;
  school: string;
  cityState: string;
  location: string;
}

export default function HomePage() {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Whats<span className="text-[hsl(280,100%,70%)]">The</span>Word?
        </h1>
        <div>
          <AutoComplete
            onPlaceSubmit={(cityState: string) => {
              setSelectedLocation(cityState);
            }}
          />
        </div>
        <div>
          <SchoolModel
            onSchoolSelect={(school: string) => {
              setSelectedSchool(school);
            }}
          />
        </div>
      </div>
    </main>
  );
}
