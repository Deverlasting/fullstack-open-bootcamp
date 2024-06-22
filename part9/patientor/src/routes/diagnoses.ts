import express from "express";
import diagnoseData from "../../data/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.send('Fetching all diagnoses!');
  console.log("Fetching all diagnoses!");

  res.json(diagnoseData);
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
