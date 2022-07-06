import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import UserModel from "./UserModel.model";

export interface UserAdapterOptions extends IAdapterOptions {
    showPasswordHash: boolean;
}

const DefaultUserAdapterOptions: UserAdapterOptions = {
    showPasswordHash: false,
}

export default class UserService extends BaseService<UserModel, UserAdapterOptions>{
    tableName(): string {
        return "user"
    }
    protected async adaptToModel(data: any, options: UserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel> {
        const user: UserModel = new UserModel();

        user.userId = +data?.user_id;
        user.username = data?.username;
        user.passwordHash = data?.password_hash;

        if(!options.showPasswordHash){
            user.passwordHash = null;
        }


        return user;
    }

}

export { DefaultUserAdapterOptions };