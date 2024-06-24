const defaultSize = 10;
const defaultMean = 1.35; // Media tra 0.7 e 2
const defaultStdev = 0.4; // Deviazione standard approssimativa per la distribuzione
const defaultMin = 0.7;
const defaultMax = 2;

function gaussianRandom(mean = 0, stdev = 1) {
    let u = 1 - Math.random(); // Converting [0,1) to (0,1]
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdev + mean;
}

export default function generateGaussianArray(size = defaultSize, mean = defaultMean, stdev = defaultStdev, min = defaultMin, max = defaultMax) {
    let arr = [];
    while (arr.length < size) {
        let num = gaussianRandom(mean, stdev);
        if (num >= min && num <= max) {
            arr.push(num);
        }
    }
    return arr;
}