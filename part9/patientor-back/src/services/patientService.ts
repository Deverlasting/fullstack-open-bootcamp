import { Patient, NewPatient, Entry } from "../types";
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

export const addEntry = (id: string, entry: Entry): Entry | undefined => {
  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }
  patient.entries.push(entry);
  return entry;
};

export default {
  addPatient,
  addEntry,
};
