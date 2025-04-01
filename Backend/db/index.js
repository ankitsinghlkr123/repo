const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbconnect=require('./dbconnect');
const User = require("./usermodel"); // Adjust path as needed

const PORT = process.env.PORT || 5000;
const app = express();
dbconnect();
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for parsing JSON

// Login endpoint
app.post("/login", (req, res) => {
    console.log("Request Body:", req.body);

    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
                .then((passwordCheck) => {
                    if (!passwordCheck) {
                        return res.status(400).send({ message: "Passwords do not match" });
                    }

                    const token = jwt.sign(
                        { userId: user._id, userEmail: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                .catch((error) => res.status(400).send({ message: "Error comparing passwords", error }));
        })
        .catch((error) => res.status(404).send({ message: "Email not found", error }));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
