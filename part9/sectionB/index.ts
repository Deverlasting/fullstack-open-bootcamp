// import express from 'express';
// import { calculateExercisesLineCommandWeb } from './exerciseCalculatorLineCommandWeb';
// import { calculateBmiWeb } from './bmiCalculatorWeb';

// const app = express();

// app.use(express.json());

// app.get('/hello', (_req, res) => {
//   res.send('Hello Full Stack');
// });

// app.get('/bmi', (req, res) => {
//   const height = Number(req.query.height);
//   const weight = Number(req.query.weight);

//   if (isNaN(height) || isNaN(weight)) {
//     res.status(400).json({ error: "malformatted parameters" });
//     return;
//   }

//   const bmiCategory = calculateBmiWeb(height, weight);

//   res.json({
//     weight,
//     height,
//     bmi: bmiCategory
//   });
// });

// app.post('/exercises', (req, res) => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { daily_exercises, target }: any = req.body;

//   if (!daily_exercises || target === undefined) {
//     res.status(400).json({ error: "parameters missing" });
//     return;
//   }

//   if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
//     res.status(400).json({ error: "malformatted parameters" });
//     return;
//   }

//   for (const exercise of daily_exercises) {
//     if (typeof exercise !== 'number') {
//       res.status(400).json({ error: "malformatted parameters" });
//       return;
//     }
//   }

//   const result = calculateExercisesLineCommandWeb(daily_exercises, target);

//   res.json(result);
// });

// const PORT = 3003;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import { calculateExercisesLineCommandWeb } from './exerciseCalculatorLineCommandWeb';
import { calculateBmiWeb } from './bmiCalculatorWeb';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmiCategory = calculateBmiWeb(height, weight);

  res.json({
    weight,
    height,
    bmi: bmiCategory
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  for (const exercise of daily_exercises) {
    if (typeof exercise !== 'number') {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }
  }

  const result = calculateExercisesLineCommandWeb(daily_exercises, target);

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
