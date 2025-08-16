import { Schema, model } from "mongoose";
import { setUser } from "../service/auth.js";
import { createHmac, randomBytes } from "node:crypto";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;

    next();
});

userSchema.statics.matchPassword = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("Incorrect email or password");

    const hashedAttempt = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    if (hashedAttempt !== user.password) {
        throw new Error("Incorrect email or password");
    }
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.salt;
    const token = setUser(userObject);
    if (!token) throw new Error("Incorrect email or password");
    return token;
};

const User = model("user", userSchema);

export default User;
