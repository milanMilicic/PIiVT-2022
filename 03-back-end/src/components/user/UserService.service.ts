import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import UserModel from "./UserModel.model";
import IAddUser from './dto/IAddUser.dto';
import IEditUser from "./dto/IEditUser.dto";

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

    public async addUser(data: IAddUser): Promise<UserModel>{
        return this.baseAdd(data, DefaultUserAdapterOptions);
    }

    public async editUser(userId: number, data: IEditUser): Promise<UserModel>{
        return this.baseEdit(userId, data, DefaultUserAdapterOptions);
    }

    public async getByUsername(username: string): Promise<UserModel|null>{
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAndValue("username", username, {showPasswordHash: true})
            .then(result => {
                if(result.length === 0){
                    return resolve(null);
                }

                resolve(result[0]);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

}

export { DefaultUserAdapterOptions };