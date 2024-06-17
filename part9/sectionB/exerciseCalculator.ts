interface ExerciseInfoType{ 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

const calculateExercises   = (trainingHours: Array<number>, target: number ) => {

    const periodLength = trainingHours.length
    const trainingDays = trainingHours.reduce((acc, value) => value > 0 ? acc + 1 : acc, 0);
    const averageTime = trainingHours.reduce((acc, value) => acc + value, 0) / trainingHours.length;
    let success = false
    let rating = 1
    let ratingDescription = "need more training"

    if (averageTime > target){
      success = true
      ratingDescription = "You completed your objetives"
      rating = 3
    }
    if (averageTime < target) success = false
    if(averageTime === 0) rating = 0
    

    const ExerciseInfoType = {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: averageTime
    }

    return ExerciseInfoType
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))