import mongoose from "mongoose";
import config from "../config.json";

class DatabaseConnection {
    connect = () => {
        return mongoose.connect(config.databaseURL);
    }
}

export default new DatabaseConnection();