import Message from '../models/Message.js';
import User from '../models/User.js';

export const getAllContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");

        return res.status(200).json({
            message: "Contacts fetched successfully",
            contacts: filteredUsers
        });

    } catch(errot){
        console.error("Error in getAllContacts:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}