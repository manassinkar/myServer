import { model, Schema } from "mongoose";

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    password: { type: String, required: true },
}, {
    strict: false
});

const User = model("User", user);

export default User;