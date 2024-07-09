// import { Gender, NewPatient, Entry } from "./types";
import {
  Entry,
  Gender,
  NewPatient,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

//types guards
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }

  return dateOfBirth;
};
const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isGender || !isString(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  switch (gender) {
    case "male":
      return Gender.Male;
    case "female":
      return Gender.Female;
    case "other":
      return Gender.Other;
    default:
      throw new Error("Incorrect gender");
  }
  // return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isArrayofEntries = (entries: unknown): entries is Entry[] => {
  return Array.isArray(entries);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!isArrayofEntries(entries)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

//ej9.26
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === null || rating === undefined || !Object.values(HealthCheckRating).includes(rating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${rating}`);
  }
  return rating;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry = {
    id: Math.random().toString(36).substr(2, 9), // Generar un ID único
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    description: parseString(object.description, "description"),
    diagnosisCodes: object.diagnosisCodes,
  };

  switch (object.type) {
    case "Hospital":
      const newHospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria, "discharge.criteria"),
        },
      };
      return newHospitalEntry;
    case "OccupationalHealthcare":
      const newOccupationalEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, "employerName"),
        sickLeave: object.sickLeave
          ? {
              startDate: parseDate(object.sickLeave.startDate),
              endDate: parseDate(object.sickLeave.endDate),
            }
          : undefined,
      };
      return newOccupationalEntry;
    case "HealthCheck":
      const newHealthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newHealthCheckEntry;
    default:
      throw new Error(`Incorrect or missing type: ${object.type}`);
  }
};

// export default toNewPatient;
export default { toNewPatient, parseHealthCheckRating };
