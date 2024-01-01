"use client";
import universityList from "~/app/_components/us_institutions.json";
import { useState, useEffect } from "react";

const SchoolModel = ({ onSchoolSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  const handleSelect = (institution) => {
    onSchoolSelect(institution);
  };
  useEffect(() => {
    const filtered = universityList.filter(
      (university) =>
        university.institution &&
        university.institution.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUniversities(filtered);
  }, [searchTerm]);

  return (
    <div>
      <label htmlFor="my_modal_6" className="btn">
        Open Modal
      </label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label htmlFor="university-search">Input School Name</label>
          <input
            type="text"
            id="university-search"
            className="input input-bordered"
            placeholder="Search for a university..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="max-h-48 overflow-y-auto ">
            {filteredUniversities.map((university, index) => (
              <div
                key={index}
                className="modal-action cursor-pointer p-2"
                onClick={() => handleSelect(university.institution)}
              >
                <label htmlFor="my_modal_6" className="btn">
                  {university.institution}
                </label>
              </div>
            ))}
          </div>

          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolModel;
