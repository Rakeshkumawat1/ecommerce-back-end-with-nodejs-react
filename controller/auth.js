const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signin = () =>{
    return function(req, res){
        User.findOne({email: req.body.email})
        .exec((error, user) => {
            if(error) return res.status(400).json({ error });
            if(user){
                if(user.authenticate(req.body.password)){
                    const token = jwt.sign({_id: user._id , role: user.role}, process.env.JWT_SECRET, {expiresIn:'1h'});
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user:{
                            _id, firstName, lastName, email, role, fullName
                        } 
                    });
                }else{
                    return res.status(400).json({
                        message: 'Invalid password'
                    }); 
                }
            } else{
                return res.status(400).json({message:' Something went wrong'});
            }
        })

    }
    
    
};

exports.signup = () =>{
    return function(req, res){
        User.findOne({email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const{
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const _user = new User({ 
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        _user.save().then(data =>{
            // console.log(data);
            if(data){
                return res.status(201).json({
                    message: 'User created successfully'
                });
            }else{
               return res.status(400).json({message:'Somthing went wrong'});
            }
        }).catch(err => res.json(err));

    });
    }
}

