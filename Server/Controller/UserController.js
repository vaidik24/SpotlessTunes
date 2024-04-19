const mongoose = require('mongoose');
const {User} = require("../Model/UserModel");

const createUser = async (req, res) => {
        console.log("Inside create user function")

        try{
            const user_name = req.body.me;
            console.log(user_name);
            let user = await User.findOne({name: user_name});
            if(!user){
                user = new User({name: user_name});
            }
            user.last_logged_on = new Date();
            await user.save();
            console.log(user);
        }catch(err){
            console.log("error creating user", err);
        }

}


module.exports = createUser;