import Message from '../models/Message.js';
import User from '../models/User.js';
import cloudinary from '../lib/cloudinary.js';

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
};


export const getMessagesByUserId = async (req, res) => {
    try{
        const myId = req.user._id;
        const {id:userToChatId} = req.params;
        
        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        });

        res.status(200).json({
            message: "Messages fetched successfully",
            messages
        })

    } catch(error){
        console.log("Error in getMessagesByUserId:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const sendMessage = async (req, res) => {
    try{
        const {text,image} = req.body;
        const  {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message sent successfully",
            newMessage
        });
    } catch(error){
        console.error("Error in sendMessage:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getChatPartners = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;    

        const messages = await Message.find({
            $or:[{ senderId: loggedInUserId },{ receiverId:loggedInUserId }],
        });

        const chatPartnerIds = [...new Set(messages.map(msg => msg.senderId.toString() === loggedInUserId.toString() 
            ? msg.receiverId.toString() 
            : msg.senderId.toString()
            )),
        ];        

        const chatPartners = await User.find({_id: {$in:chatPartnerIds}}).select("-password");

        res.status(200).json({
            message: "Chat partners fetched successfully",
            chatPartners
        });
    } catch(error){
        console.error("Error in getChatPartners:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};