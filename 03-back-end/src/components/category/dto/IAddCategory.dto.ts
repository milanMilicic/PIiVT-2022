import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export default interface IAddCategory extends IServiceData {
    name: string;
    hourlyPrice: number;
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