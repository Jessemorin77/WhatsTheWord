import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { env } from "~/env";

// Define the minimal structure for the Place object.
interface Place {
  formatted_address: string;
}

// Defining the props type for the component.
interface AutoCompleteProps {
  onPlaceSubmit: (cityState: string) => void;
}

export function AutoComplete({ onPlaceSubmit }: AutoCompleteProps) {
  // useState with a type for the state variable.
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelect = (place: Partial<Place>) => {
    // Perform a runtime check to ensure the property exists and is a string.
    if (place && typeof place.formatted_address === "string") {
      setSelectedPlace({ formatted_address: place.formatted_address });
    }
  };

  const handleSubmit = () => {
    if (selectedPlace) {
      const cityState = selectedPlace.formatted_address;
      onPlaceSubmit(cityState); // Pass the selected place to the parent component.
    }
  };

  return (
    <div>
      <Autocomplete
        className="input"
        apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API}
        onPlaceSelected={handlePlaceSelect} // TypeScript might complain about mismatched types, hence 'as any' is a workaround.
      />
      <button className="btn" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
