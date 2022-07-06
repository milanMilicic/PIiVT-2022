import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export interface IAddCategoryDto {
    name: string;
    hourlyPrice: number;
} 

export default interface IAddCategory extends IServiceData {
    name: string;
    hourly_price: number;
}


const AddCategoryValidator = ajv.compile({
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
        "name",
        "hourlyPrice",
    ],
    additionalProperties: false,
});

export { AddCategoryValidator };