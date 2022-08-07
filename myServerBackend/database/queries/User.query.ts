import User from "../../models/User.model";
import crypt from "../../util/crypt";

class UserQueries {
    createUser = (name: string, email: string, password: string): Promise<any> => {
        return User.create({
            name, email, password: crypt.encrypt(password)
        });
    }

    getUserByEmail = (email: string): any => {
        return new Promise((resolve, reject) => {
            User.findOne({ email }, (err: any, user: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        });
    }

    getUserById = (id: string): any => {
        return new Promise((resolve, reject) => {
            User.findById(id, { password: 0 }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
        });
    }
    
    getAllUsers = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            User.find({}, { password: 0 }, (err, users) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
        });
    }
}

export default new UserQueries();