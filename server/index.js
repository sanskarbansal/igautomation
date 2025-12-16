const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/automation-tool";

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// mount routes
app.use("/api", routes);

// root
app.get("/", (req, res) => {
    res.json({ message: "Automation Tool API" });
});

// 404 + centralized error handler
const { handler: errorHandler, notFound } = require("./middleware/errorHandler");

app.use(notFound);
app.use(errorHandler);

// connect to MongoDB then start server
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });

module.exports = app;
