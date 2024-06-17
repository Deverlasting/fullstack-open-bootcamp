interface ExerciseInfoType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercisesLineCommandWeb = (daily_exercises: number[], target: number): ExerciseInfoType => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(day => day > 0).length;
  const totalHours = daily_exercises.reduce((acc, cur) => acc + cur, 0);
  const average = totalHours / periodLength;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = "You completed your objectives";
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "Bad";
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
}