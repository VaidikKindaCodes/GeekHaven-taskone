import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    }
});

export default mongoose.model('Question', questionSchema);
