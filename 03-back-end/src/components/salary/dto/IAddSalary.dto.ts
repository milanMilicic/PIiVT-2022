import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export default interface IAddSalaryDto {
    workHours: number;

}

interface IAddSalary extends IServiceData {
    employee_id: number;
    month_id: number;
    year: number;
    work_hours: number;
    gross_worth: number;
    net_worth: number;
    health_care: number;
    social_care: number;
    pio: number;
    tax: number;

}


const AddSalaryValidator = ajv.compile({
    type: "object",
    properties: {
        workHours: {
            type: "integer",
            minimum: 8,
            maximum: 250,
        },
    },
    required: [
        "workHours",
    ],
    additionalProperties: false,
});

export { AddSalaryValidator, IAddSalary };
