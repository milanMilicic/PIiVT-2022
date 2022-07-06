import { IServices } from "./IApplicationResources.interface";

export default class BaseController {
    private serviceInstances: IServices;

    constructor(services: IServices){
        this.serviceInstances = services;
    }

    protected get services(): IServices{
        return this.serviceInstances;
    }

}