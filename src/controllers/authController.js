import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const registerUser = async (req, res) => {
  try {
    const {_id, password} = req.body;

    const existingUser = await User.findOne({_id});
    if (existingUser) {
      return res.status(409).json({message: 'Looks like you already have an account with that email address'});
    }

    const newUser = await User.create({
      _id,
      password,
      role: 'user'
    });

    res.status(201).json({
      message: 'User registered',
      user: {_id: newUser._id, role: newUser.role}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
};


export const loginUser = async (req, res) => {
  try {
    const {_id, password} = req.body;

    const user = await User.findOne({_id});
    if (!user) {
      return res.status(401).json({message: 'Please create an account'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      {_id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );

    res.status(200).json({token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};