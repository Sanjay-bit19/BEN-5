const  express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async(req,res)=>{
    const{name , email ,password} = req.body;

    const existing = await User.findOne({email});
    if(existing){
        return res.status(409).json({error: 'Email already registered'});
    }

    const passwordHash = await bcrypt.hash(password,10);
    const user = await User.create({name , email , passwordHash});

    const token = jwt.sign({userId: user._id}, process.env.JET_SECRET,{
        expiresIn: '7d',
    });

    res.status(201).json({
        token,
        user:{id:user._id, name: user.name, email:user.email},
    });

    
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error:'Invalid email or password'});
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
        return res.status(401).json({error: 'Invalid email or password '});
    }

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{
        expiresIn: '7d',
    });

    res.json({
        token,
        user:{id: user._id, name: user.name, email:user.email},
    });
});

router.get('/me', requireAuth, async(req,res)=>{
    const user = await User.findById(req.userId).select('-passwordHash');
    res.json(user);
})

module.exports = router;