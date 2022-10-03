import { configureStore } from "@reduxjs/toolkit";

export interface IAuthStoreData {
    role: "user" | "visitor";  //mozda mi ne treba "visitor"
    identity: string;
    id: number;
    authToken: string;
    refreshToken: string;
}

let InitialAuthStoreData: IAuthStoreData = {
    role: "visitor",   // ako ne radi ovako onda zameni za "user"
    identity: "",
    id: 0,
    authToken: "",
    refreshToken: "",
};

(() => {
    if(!localStorage.getItem("app-auth-store-data")){
        return;
    }

    const storeData = JSON.parse(localStorage.getItem("app-auth-store-data") ?? "{}");

    if(typeof storeData !== "object"){
        return;
    }

    InitialAuthStoreData = { ...InitialAuthStoreData, ...storeData};
})();

type TUpdateRole = { type: "update", key: "role", value: "user" | "visitor" };
type TUpdateId = { type: "update", key: "id", value: number };
type TUpdateStrings = { type: "update", key: "identity" | "authToken" | "refreshToken", value: string };


type TAuthStoreAction = TUpdateRole | TUpdateId | TUpdateStrings;

function AuthStoreReducer(oldState: IAuthStoreData = InitialAuthStoreData, action: TAuthStoreAction): IAuthStoreData {
    switch(action.type){
        case "update":
            return {
            ...oldState, 
            [action.key]: action.value,
            };
        
        default:
            return {...oldState};
    }
}

const AuthStore = configureStore({ reducer: AuthStoreReducer });

AuthStore.subscribe(() => {
    localStorage.setItem('app-auth-store-data', JSON.stringify(AuthStore.getState()));
});

export type TAuthStoreDispatch = typeof AuthStore.dispatch;
export default AuthStore;