import userQueries from "../database/queries/User.query";
import auth from "../util/auth";
import crypt from "../util/crypt";

class UserController {
    register = (req: any, res: any) => {
        const { name, email, password } = req.body.user;
        const user = userQueries.getUserByEmail(email);
        user
            .then((user: any) => {
                if (user==null) {
                    userQueries.createUser(name, email, password)
                        .then(() => {
                            res.status(200).send({ message: "User Registered Sucessfully" });
                        })
                        .catch((err) => {
                            res.status(500).send({ message: "Something went wrong", error: err });
                        })
                } else {
                    res.status(400).send({ message: `User: ${email} already exists` })
                }
            })
            .catch((err: any) => {
                res.status(500).send({ message: "Something went wrong", error: err });
            })
    }

    login = (req: any, res: any) => {
        const { email, password } = req.body.user;
        const user = userQueries.getUserByEmail(email);
        user
            .then((user: any) => {
                if (user) {
                    const passCheck = crypt.compare(password, user.password);
                    if (passCheck) {
                        const tokenObj = { id: user._id, name: user.name, email: user.email };
                        const token = auth.createToken(tokenObj);
                        res.status(200).send({ message: "Login Successful", user: tokenObj, token })
                    } else {
                        res.status(401).send({ message: "Incorrect Password" })
                    }
                } else {
                    res.status(404).send({ message: `User: ${email} does not exist` })
                }
            })
            .catch((err: any) => {
                res.status(500).send({ message: "Something went wrong", error: err })
            })
    }

    getAllUsers = (req: any, res: any) => {
        const users = userQueries.getAllUsers();
        users
            .then((users: any) => {
                res.status(200).send({ users })
            })
            .catch((err: any) => {
                res.status(500).send({ message: "Something went wrong", error: err })
            })
    }

    getUserById = (req: any, res: any) => {
        const user = userQueries.getUserById(req.query.id);
        user
            .then((user: any) => {
                res.status(200).send({ user })
            })
            .catch((err: any) => {
                res.status(500).send({ message: "Something went wrong", error: err })
            })
    }

    getUserByEmail = (req: any, res: any) => {
        const users = userQueries.getUserByEmail(req.query.email);
        users
            .then((user: any) => {
                res.status(200).send({ user })
            })
            .catch((err: any) => {
                res.status(500).send({ message: "Something went wrong", error: err })
            })
    }
}

export default new UserController();