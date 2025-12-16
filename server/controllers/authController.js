const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

async function register(req, res) {
    const { email, password, name, phone } = req.body;
    if (!email || !password) {
        throw ApiError.badRequest("Email and password are required");
    }

    const existing = await User.findOne({ email });
    if (existing) {
        throw ApiError.conflict("User already exists");
    }

    // if username provided, ensure uniqueness
    if (req.body.username) {
        const existingUserName = await User.findOne({ username: req.body.username });
        if (existingUserName) {
            throw ApiError.conflict("Username already exists");
        }
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashed, username: req.body.username || null, name: name || null, phone: phone || null });
    await user.save();

    // Don't return password hash
    const userObj = user.toObject();
    delete userObj.password;

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ user: userObj, token });
}

async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        throw ApiError.badRequest("username and password are required");
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw ApiError.unauthorized("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw ApiError.unauthorized("Invalid credentials");
    }

    const userObj = user.toObject();
    delete userObj.password;

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ user: userObj, token });
}

module.exports = { register: asyncHandler(register), login: asyncHandler(login) };
