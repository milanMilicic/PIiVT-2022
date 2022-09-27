export default interface ICalculation {
    calculationId: number;
    monthId: number;

    year: number;
    healthCare: number;
    socialCare: number;
    pio: number;
    tax: number;
    grossWorth: number;
    netWorth: number;
}