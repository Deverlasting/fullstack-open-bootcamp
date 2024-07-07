// import { NewPatient } from "./../types";
import express from "express";
import patientData from "../../data/patients";
import { addPatient } from "../services/patientService";
// import { NewPatient } from '../types';
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.send('Fetching all diagnoses!');
  console.log("Fetching all patient!");

  res.json(patientData);
});

// router.get("/api/patients", (_req, res) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const NonssnPatients: NonssnPatient[] = patientData.map(({ ssn, ...rest }) => rest);
//   res.json(NonssnPatients);
// });

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Fetching patient with id ${id}!`);

  const patient = patientData.find((p) => p.id === id);

  res.json(patient);

  // res.json({ ...patient, entries: [] });
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
