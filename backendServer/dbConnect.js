import mongoose from "mongoose";

export async function DBConnect(url) {
    return await mongoose.connect(url).then(()=> console.log("DataBase connected"));
}