import IModel from "../../common/IModel.interface";

export default class CalculationModel implements IModel {
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