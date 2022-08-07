import bcrypt from "bcrypt";

class Bcrypt {
    saltRounds = 10;
    encrypt = (str: string) => {
        return bcrypt.hashSync(str, this.saltRounds)
    }

    compare = (str: string, hash: string) => {
        return bcrypt.compareSync(str, hash);
    }
}

export default new Bcrypt();