const User = require("../Model/UserModel");
const Bug = require('../Model/BugReportModel');
const bugReportController = async(req, res) => {
    try{
        const {name, description} = req.body;
        console.log(name)
        console.log(description)

        let user = await User.findOne({name});
        console.log("User: ", user)
        if(!user){
            user = new User({name});
            await user.save();

        }
        const userId = user._id;
        console.log("userId: ", userId);
        console.log(userId);
        const bug = new Bug({
            userId ,
            description
        })

        await bug.save();
        res.status(201).json({ message: 'Bug report submitted successfully' });
    }catch (error) {
        console.error('Error reporting bug:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = bugReportController;