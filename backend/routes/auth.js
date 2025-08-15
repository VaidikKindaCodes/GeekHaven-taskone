import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/auth/signin");
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassword(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.redirect("/auth/signup");
    }
});

router.get("/logout", (req, res) => {
    return res.clearCookie("token").redirect("/");
});

export default router;
