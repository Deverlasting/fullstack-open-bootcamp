import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, EntryFormValues, Entry } from "../types";
import AddEntryForm from "./AddEntryForm";

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(patientData);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
  }, [id]);

  const handleAddEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      setPatient((prevPatient) => {
        if (!prevPatient) return null;
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, newEntry],
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>

      <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
        </div>
      ))}

      <h3>Add New Entry</h3>
      <AddEntryForm onSubmit={handleAddEntry} onCancel={handleCancel} />
    </div>
  );
};

export default PatientDetailPage;
