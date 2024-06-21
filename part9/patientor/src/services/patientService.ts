import {  NonssnPatient, Patient, patient  } from '../types';
// import { v1 as uuid } from 'uuid';
import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients';

// const id: string = uuid();  
const patients: Patient[] = patientData;

  const addPatient = (
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
    ): Patient => {
  
    const newPatientEntry = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    };
  
    patients.push(newPatientEntry);
    return newPatientEntry;
  };