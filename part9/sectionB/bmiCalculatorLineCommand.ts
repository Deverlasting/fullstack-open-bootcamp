const calculateBmiLineCommand = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) * (height / 100));
    
    if (bmi < 20) return "Too thin";
    if (bmi > 25) return "Too fat";
    return "Healthy weight"; 
};

const height: number = Number(process.argv[2]); 
const weight: number = Number(process.argv[3]); 

console.log(calculateBmiLineCommand(height, weight));
