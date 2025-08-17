import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "trash ap title dena bhul gyi"
    },
    topic :{
        type: String
    },
    url: {
        type: String,
        default: "trash ap title dena bhul gyi"
    }
});

export default mongoose.model('Question', questionSchema);
