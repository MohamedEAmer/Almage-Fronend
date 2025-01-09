import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name ||!email ||!password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        
        res.status(201).json({ message: "User created successfully" , token , user:{name: user.name}});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ||!password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token, user:{name: user.name}});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
    
}


export const userCredits = async (req, res) => {
    try {
        const {userId} = req.body
        const user = await userModel.findById(userId);
        res.json({ credits: user.creditBalance , user:{name: user.name}});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}