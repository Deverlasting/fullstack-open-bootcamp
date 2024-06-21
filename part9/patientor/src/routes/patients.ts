import express from 'express';
import patientData from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  // res.send('Fetching all diagnoses!');
  console.log("Fetching all patient!");
  
  res.json(patientData);
});

// router.post('/', (_req, res) => {
//   console.log("Saving a patient!");
  
//   res.send('Saving a patient!');
// });

router.post('/', (req, res) => {
  const { id, name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedpatient = diaryService.addDiary(
    id, 
    name, 
    dateOfBirth, 
    ssn, 
    gender, 
    occupation
  );
  res.json(addedEntry);
});

export default router;