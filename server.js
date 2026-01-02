const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://ghanasaireddykodumuru_db_user:fHjhsz46sX2EHy4F@cluster0.rr1ucfu.mongodb.net/?appName=Cluster0');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password 
        });
        await newUser.save();
        res.status(201).send("User Registered!");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    
    if (user) {
        res.send("Login Successful!");
    } else {
        res.status(401).send("Invalid Credentials");
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));