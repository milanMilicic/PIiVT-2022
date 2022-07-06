import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export default interface IAddEmployeeDto {
    name: string;
    employment: number;
    jmbg: string;
}
interface IAddEmployee extends IServiceData {
    name: string;
    employment: number;
    jmbg: string;
    category_id: number;
}


const AddEmployeeValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 32,
        },
        employment: {
            type: "integer",
            minimum: 10,
            maximum: 100, 
        },
        jmbg: {
            type: "string",
            minLength: 13,
            maxLength: 13,
        },
    },
    required: [
        "name",
        "employment",
        "jmbg",
    ],
    additionalProperties: false,
});

export { AddEmployeeValidator, IAddEmployee };