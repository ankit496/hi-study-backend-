const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    correctOption: {
        type: String,
        enum: ['option1', 'option2', 'option3', 'option4'],
        required: true
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports=Quiz
