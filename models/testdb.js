const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})
module.exports = mongoose.model("TRW-API", testSchema);