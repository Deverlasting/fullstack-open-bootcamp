// import { Diagnose } from './types';
import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
// import { NonssnPatient } from "./types";
// import patientData from "../data/patients";
// import diagnoseData from '../data/diagnoses'

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3003;
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// app.get("/api/patients", (_req, res) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const NonssnPatients: NonssnPatient[] = patientData.map(({ ssn, ...rest }) => rest);
//   res.json(NonssnPatients);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
