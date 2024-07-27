const mongoose = require('mongoose');

const courseOverviewSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: [String]},
    overview: { type: [String]}
});

module.exports = mongoose.model('CourseOverview', courseOverviewSchema);