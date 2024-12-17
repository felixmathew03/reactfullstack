import mongoose from "mongoose";
export default async function connection() {
    const db= await mongoose.connect("mongodb+srv://xepake8350:RWPPxei4lNCPsDpQ@cluster0.ab2mv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("database connected");
    return db
}