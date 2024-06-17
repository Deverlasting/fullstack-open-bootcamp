interface ExerciseInfoType{ 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

    const target: number = Number(process.argv[2]);
    const args = process.argv.slice(3);
    const numberArgs: number[] = args.map(Number);



    const trainingHours = numberArgs.reduce((acc, num) => acc + num, 0);

    // const calculateExercisesLineCommand   = (trainingHours: Array<number>, target: number ) => {
    const calculateExercisesLineCommand   = ( ) => {


    const periodLength = args.length
    const trainingDays = numberArgs.reduce((acc, value) => value > 0 ? acc + 1 : acc, 0);
    const averageTime = trainingHours / args.length;
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
// console.log(calculateExercisesLineCommand([3, 0, 2, 4.5, 0, 3, 1], 2))
console.log(calculateExercisesLineCommand())


