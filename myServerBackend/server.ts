import express from 'express';
import databaseConnection from "./database/connection";
import router from './routes';

const app = express();
const port = 3000;

databaseConnection.connect()
    .then(() => {
        console.log(`⚡️[database]: Database connected successfully!`);
        app.listen(3000, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }))
            addListeners();
        });
    })
    .catch(() => {
        console.log(`⚡️[database]: Failed to connect to Database`);
        console.error(`⚡️[server]: Not Starting Server since database connection failed!`)
    });

const addListeners = () => {
    app.get('/', (req, res) => {
        res.send('Well done!');
    });
    
    app.use("/api", router);
}
