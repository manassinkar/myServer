import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import config from "../config.json";

class Auth {
    createToken = (object: any): string => {
        return jsonwebtoken.sign(object, config.secretKey)
    }

    verifyToken = (token: string): string | JwtPayload => {
        return jsonwebtoken.verify(token, config.secretKey);
    }
}

export default new Auth();