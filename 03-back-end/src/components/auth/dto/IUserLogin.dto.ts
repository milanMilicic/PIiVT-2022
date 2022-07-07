import Ajv from "ajv";

const ajv = new Ajv();


export interface IUserLoginDto {
    username: string;
    password: string;
}

const UserLoginValidator = ajv.compile({
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
        "username",
        "password",
    ],
    additionalProperties: false,
});

export { UserLoginValidator };