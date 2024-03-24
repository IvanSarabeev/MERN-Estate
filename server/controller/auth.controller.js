import User from './../model/user.model.js';
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
   const { username, email, password } = req.body;

   // Hashing password to 12 rounds
   const hashedPassword = bcryptjs.hashSync(password, 12);

   const newUser = new User({username, email, password:hashedPassword});

   try {
    
       await newUser.save();
       res.status(201).json("User created successfully!");
   } catch (error) {
        res.status(500).json(error.message);
   }
};