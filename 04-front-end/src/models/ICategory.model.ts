import IEmployee from "./IEmployee.model"

export default interface ICategory {
    categoryId: number,
    name: string,
    hourlyPrice: number
    employees?: IEmployee[]
}