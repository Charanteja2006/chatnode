import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/contacts');
            set({ allContacts: res.data.contacts });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data.chatPartners });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data.messages });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
            status: "sent",
        };

        // immediate UI update
        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

            // Check current state again so we don't overwrite a WebSocket "read" update
            set({
                messages: get().messages.map(msg => {
                    if (msg._id === tempId) {
                        // Inherit 'read' status if it was updated optimistically via socket while we were waiting
                        const finalStatus = msg.status === "read" ? "read" : res.data.newMessage.status;
                        return { ...res.data.newMessage, image: msg.image, status: finalStatus };
                    }
                    return msg;
                })
            });
        } catch (error) {
            // rollback UI update
            const currentMessages = get().messages;
            set({ messages: currentMessages.filter(msg => msg._id !== tempId) });
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

            if (!isMessageSentFromSelectedUser) return;

            const currentMessages = get().messages;
            set({ messages: [...currentMessages, newMessage] });

            if (isSoundEnabled) {
                const notificationSound = new Audio('/sounds/frontend_public_sounds_notification.mp3');
                notificationSound.currentTime = 0;
                notificationSound.play().catch((err) => console.log("Error playing sound:", err));
            }

            // Immediately mark it as read since it arrived in an active chat
            if (socket.connected) {
                socket.emit("markMessagesAsRead", { chatId: selectedUser._id });
            }
        });

        socket.on("messagesStatusUpdate", ({ receiverId, status }) => {
            const currentMessages = get().messages;
            const updatedMessages = currentMessages.map((msg) =>
                (msg.receiverId === receiverId && msg.status !== status) ? { ...msg, status } : msg
            );
            set({ messages: updatedMessages });
        });
    },

    markMessagesAsRead: (chatId) => {
        const socket = useAuthStore.getState().socket;
        if (socket?.connected) {
            socket.emit("markMessagesAsRead", { chatId });
        }
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.off("newMessage");
            socket.off("messagesStatusUpdate");
        }
    },

}));