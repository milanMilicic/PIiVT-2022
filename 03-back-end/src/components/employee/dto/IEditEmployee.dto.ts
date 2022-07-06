import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export interface IEditEmployeeDto {
    name?: string;
    isActive?: boolean;
    employment?: number;
} 

export default interface IEditEmployee extends IServiceData {
    name?: string;
    is_active?: number;
    employment?: number;
}


const EditEmployeeValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 32,
        },
        isActive: {
            type: "boolean", 
        },
        employment: {
            type: "integer",
            minimum: 10,
            maximum: 100, 
        },
    },
    required: [

    ],
    additionalProperties: false,
});

export { EditEmployeeValidator };