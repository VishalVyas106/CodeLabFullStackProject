
// middleware/auth.js
import jwt from 'jsonwebtoken';
// import  User  from '../models/User';
import{ User }from '../models/User.js';


export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select('-password');
        
        if (!user) throw new Error();
        
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};