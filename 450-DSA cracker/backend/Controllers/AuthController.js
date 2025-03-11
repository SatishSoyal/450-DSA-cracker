const bcrypt = require('bcrypt');
const UserModel = require('../Models/User')

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new UserModel({ username, password: hashedPassword });
        await userModel.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(403).json({ message: 'Auth failed: user not found', success: false });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({ message: 'Auth failed: incorrect password', success: false });
        }

        
        res.status(200).json({
            message: 'Login successful',
            success: true,
            data: {
                username: user.username,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login,
};
