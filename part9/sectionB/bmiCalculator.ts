const calculateBmi  = (height: number, weight: number) => {

    const bmi = weight / ((height/100) * (height/100)) 

    if(bmi < 20) return "Too thin"
    if(bmi > 25) return "Too fat"
    return "Healthy weight"
}
console.log(calculateBmi(180, 74))

 