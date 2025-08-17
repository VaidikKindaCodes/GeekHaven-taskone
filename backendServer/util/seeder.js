import { DBConnect } from "../dbConnect.js"
import category from "../models/category.js"
import question from "../models/question.js"

const seeder = async () => {
    await DBConnect("mongodb://127.0.0.1:27017/gh");
    try {
        const res = await fetch("https://test-data-gules.vercel.app/data.json")
        const data = await res.json()
        data.data.map(async(sl) => {
            const title = sl.title;
            const qusid = [];
            const cat= await category.create({title: title});
            sl.ques.map(async(q) => {
                const resu = await question.create({title : q.title , url:q.p1_link});
                await category.updateOne({_id : cat._id } , {$push : {questions: resu._id}});
            });
            cat.save();
        })
        console.log("done");
        return;

    } catch (error) {
        console("hewkjWSBD");
    }
}

seeder()