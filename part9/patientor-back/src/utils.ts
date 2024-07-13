import {
  NewPatient,
  Entry,
  NewEntry,
  BaseEntry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
  Diagnosis,
  Gender,
} from "./types";

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

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown, fieldName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseHealthCheckRating = (rating: number): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${rating}`);
  }
  return rating;
};

const toNewBaseEntry = (object: unknown): Omit<BaseEntry, "id"> => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  return {
    description: parseString((object as { description: unknown }).description, "description"),
    date: parseDate((object as { date: unknown }).date),
    specialist: parseString((object as { specialist: unknown }).specialist, "specialist"),
    diagnosisCodes: (object as { diagnosisCodes?: Array<Diagnosis["code"]> }).diagnosisCodes,
  };
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const baseEntry = toNewBaseEntry(object);

  switch ((object as { type: string }).type) {
    case "Hospital":
      if (!("discharge" in object)) {
        throw new Error("Missing discharge information for Hospital entry");
      }
      const hospitalEntry: Omit<HospitalEntry, "id"> = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate((object as { discharge: { date: unknown } }).discharge.date),
          criteria: parseString((object as { discharge: { criteria: unknown } }).discharge.criteria, "discharge.criteria"),
        },
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      if (!("employerName" in object)) {
        throw new Error("Missing employerName for OccupationalHealthcare entry");
      }
      const occupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, "id"> = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString((object as { employerName: unknown }).employerName, "employerName"),
        sickLeave:
          "sickLeave" in object
            ? {
                startDate: parseDate((object as { sickLeave: { startDate: unknown } }).sickLeave.startDate),
                endDate: parseDate((object as { sickLeave: { endDate: unknown } }).sickLeave.endDate),
              }
            : undefined,
      };
      return occupationalHealthcareEntry;
    case "HealthCheck":
      const healthCheckEntry: Omit<HealthCheckEntry, "id"> = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating((object as { healthCheckRating: number }).healthCheckRating),
      };
      return healthCheckEntry;
    default:
      throw new Error(`Incorrect or missing type: ${(object as { type: unknown }).type}`);
  }
};
