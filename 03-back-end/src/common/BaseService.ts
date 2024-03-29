import * as mysql2 from "mysql2/promise";
import IAdapterOptions from "./IAdapterOptions.interface";
import IModel from "./IModel.interface";
import IServiceData from "./IServiceData.interface";

export default abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    private database: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.database = databaseConnection;
    }

    protected get db(): mysql2.Connection{
        return this.database;
    }

    abstract tableName(): string;

    protected abstract adaptToModel(data: any, options: AdapterOptions): Promise<ReturnModel>;


    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName};`;
            
            this.db.execute(sql)
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const items: ReturnModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    items.push(await this.adaptToModel(row, options));
                }

                resolve(items);
            })
            .catch(error => {
                reject(error);
            });

        });
    }


    public getById(id: number, options: AdapterOptions): Promise<ReturnModel|null>{
        const tableName = this.tableName();

        return new Promise<ReturnModel>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;

            this.db.execute(sql, [ id ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve(null);
                }

                if(Array.isArray(rows) && rows.length === 0){
                    return resolve(null);
                }

                resolve(await this.adaptToModel(rows[0], options));
            })
            .catch(error => {
                reject(error);
            });
        });
    }

                    
    protected async getAllByFieldNameAndValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;

            this.db.execute(sql, [ value ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const items: ReturnModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    items.push(await this.adaptToModel(row, options));
                }

                resolve(items);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

                    
    public async getAllByFieldNamesAndValues(fieldName1: string, fieldName2: string, value1: any, value2: any, options: AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>((resolve, reject) => {
            const sql = `SELECT * FROM ${tableName} WHERE ${fieldName1} = ? AND ${fieldName2} = ?;`;

            this.db.execute(sql, [ value1, value2 ])
            .then(async ([rows]) => {

                if(rows === undefined){
                    return resolve([]);
                }

                const items: ReturnModel[] = [];

                for(let row of rows as mysql2.RowDataPacket[]){
                    items.push(await this.adaptToModel(row, options));
                }

                resolve(items);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    
    protected async baseAdd(data: IServiceData, options: AdapterOptions): Promise<ReturnModel> {
        const tableName = this.tableName();

        return new Promise((resolve, reject) => {
            const properties = Object.getOwnPropertyNames(data); 
            const sqlPairs = properties.map(property => "`" + property + "` = ?").join(", ");
            const values = properties.map(property => data[property]);  

            const sql: string = "INSERT `" + tableName + "` SET " + sqlPairs + ";";

            this.db.execute(sql, values)
            .then(async result => {
                const info: any = result;

                const newItemId = +(info[0]?.insertId);

                const newItem: ReturnModel|null = await this.getById(newItemId, options);

                if(newItem === null){
                    reject({ message: 'Could not add a new item into the ' + tableName + ' table!', });
                    return;
                }

                resolve(newItem);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    protected async baseEdit(id: number, data: IServiceData, options: AdapterOptions): Promise<ReturnModel> {
        const tableName = this.tableName();

        return new Promise((resolve, reject) => {
            const properties = Object.getOwnPropertyNames(data);

            if(properties.length === 0){       // ako smo slali prazan objekat kada editujemo nesto u bazi
                return reject({message: "There is nothing to change!", })
            }

            const sqlPairs = properties.map(property => "`" + property + "` = ?").join(", ");
            const values = properties.map(property => data[property]);
            values.push(id); // id ubacujemo na kraj niza da bi bio isoriscen kod poslednjeg upitnika u sql upitu, za WHERE klauzulu 

            const sql: string = "UPDATE `" + tableName + "` SET " + sqlPairs + " WHERE `" + tableName + "_id` = ?;";

            this.db.execute(sql, values)
            .then(async result => {
                const info: any = result;

                if(info[0]?.affectedRows === 0){
                    return reject({message: "Could not change any items in the " + tableName + " table!", })
                }

                const item: ReturnModel|null = await this.getById(id, options);

                if(item === null){
                    reject({ message: 'Could not find this item in the ' + tableName + ' table!', });
                    return;
                }

                resolve(item);
            })
            .catch(error => {
                reject(error);
            });

        });
    }


}