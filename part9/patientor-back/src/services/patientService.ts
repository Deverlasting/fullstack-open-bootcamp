import { Patient, NewPatient, Entry, NewEntry } from "../types";
// import { v1 as uuid } from 'uuid';
import { v4 as uuid } from "uuid";
import patientData from "../../data/patients";

export const addPatient = (newPatient: Omit<NewPatient, "entries">): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient,
    entries: [],
  };

  patientData.push(patient);
  return patient;
};

export const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  addPatient,
  addEntry,
};
