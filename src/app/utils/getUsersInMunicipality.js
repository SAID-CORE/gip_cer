export default function getUserInMunicipality(input) {
    let pop;
    if (input < 5000) {
        pop = Math.round(input * 0.01);
    } else if (input >= 5000 && input < 7500) {
        pop = Math.round(input * 0.005);
    } else if (input >= 7500 && input < 10000) {
        pop = Math.round(input * 0.0025);
    } else if (input >= 10000 && input < 30000) {
        pop = Math.round(input * 0.002);
    } else {
        pop = Math.round(input * 0.0016);
    }

    return {
        pop: pop,
        prod: Math.round(pop * 0.35),
        cons: Math.round(pop * 0.65),
    };
}