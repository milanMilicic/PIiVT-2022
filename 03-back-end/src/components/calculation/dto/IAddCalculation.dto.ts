import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export default interface IAddCalculationDto {
    monthId: number;
    year: number;

}

interface IAddCalculation extends IServiceData {
    month_id: number;
    year: number;
    gross_worth: number;
    net_worth: number;
    health_care: number;
    social_care: number;
    pio: number;
    tax: number;

}


const AddCalculationValidator = ajv.compile({
    type: "object",
    properties: {
        monthId: {
            type: "integer",
            minimum: 1,
            maximum: 12,
        },
        year: {
            type: "integer",
        },
    },
    required: [
        "monthId",
        "year",
    ],
    additionalProperties: false,
});

export { AddCalculationValidator, IAddCalculation };
