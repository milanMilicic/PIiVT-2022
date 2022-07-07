import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();


export default interface IEditUser extends IServiceData {
    username?: string;
    password_hash?: string;
}

export interface IEditUserDto {
    username?: string;
    password?: string;
}


const EditUserValidator = ajv.compile({
    type: "object",
    properties: {
        username: {
            type: "string",
            pattern: "^[a-z0-9\-]{5,32}$",
            maxLength: 32,
        },
        password: {
            type: "string",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
        }
    },
    required: [

    ],
    additionalProperties: false,
});

export { EditUserValidator };