import express from 'express';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log("Fetched all users:", users); // 打印获取的用户列表
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error); // 捕获并记录错误
        res.status(500).json({ msg: "Failed to fetch users", error: error.message });
    }
});

// Register/Create or Authenticate User
router.post('/', async (req, res) => {
    try {
        console.log("Request body received:", req.body); // 打印请求体

        if (req.query.action === 'register') {  // Register user
            console.log("Registering new user...");
            const newUser = new User(req.body);
            await newUser.save();
            console.log("User registered successfully:", newUser);
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } else {  // Authenticate user
            console.log("Authenticating user...");
            const user = await User.findOne(req.body);
            console.log("User found:", user);
            if (!user) {
                console.log("Authentication failed: User not found or invalid credentials");
                return res.status(401).json({ code: 401, msg: 'Authentication failed' });
            } else {
                console.log("Authentication successful for user:", user.username);
                return res.status(200).json({
                    code: 200,
                    msg: "Authentication Successful",
                    token: 'TEMPORARY_TOKEN',
                });
            }
        }
    } catch (error) {
        console.error("Error during user operation:", error); // 捕获并记录错误
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        console.log("Updating user with ID:", req.params.id, "Data:", req.body);
        const result = await User.updateOne(
            { _id: req.params.id },
            req.body
        );
        if (result.matchedCount) {
            console.log("User updated successfully:", result);
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            console.log("Unable to update user with ID:", req.params.id);
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (error) {
        console.error("Error updating user:", error); // 捕获并记录错误
        res.status(500).json({ msg: "Failed to update user", error: error.message });
    }
});

export default router;
