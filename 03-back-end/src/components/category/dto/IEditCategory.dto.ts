import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export interface IEditCategoryDto {
    name?: string;
    hourlyPrice?: number;
} 

export default interface IEditCategory extends IServiceData {
    name?: string;
    hourly_price?: number;
}


const EditCategoryValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 32,
        },
        hourlyPrice: {
            type: "integer",
            minimum: 300, 
        }
    },
    required: [

    ],
    additionalProperties: false,
});

export { EditCategoryValidator };