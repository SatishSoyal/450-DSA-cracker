const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProgressSchema = new Schema({
    username: { type: String, required: true, ref: 'user' }, 
    topicName: { type: String, required: true },
    completedQuestions: [{ type: String }], 
    bookmarkedQuestions: [{ type: String }], 
    notes: { type: Map, of: String }, 
    completionPercentage: { type: Number, default: 0 }
});

const UserProgressModel = mongoose.model('userprogress', UserProgressSchema);
module.exports = UserProgressModel;
