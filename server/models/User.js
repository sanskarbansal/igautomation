const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, unique: true, lowercase: true, trim: true, sparse: true },
    name: { type: String, default: null },
    phone: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
