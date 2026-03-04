import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";


function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key == "Escape") setSelectedUser(null)
        }

        window.addEventListener("keydown", handleEscKey)

        return () => window.removeEventListener("keydown", handleEscKey)
    }, [setSelectedUser])

    return (
        <div className="flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/10 h-[84px] shrink-0 px-8 relative z-20 shadow-sm"
        >
            <div className="flex items-center space-x-4">
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="w-12 h-12 rounded-full ring-2 ring-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] overflow-hidden">
                        <img src={selectedUser.profilePic || '/avatar.png'} alt={selectedUser.fullName} className="object-cover w-full h-full" />
                    </div>
                </div>
                <div>
                    <h3 className="text-white font-semibold text-lg tracking-wide">{selectedUser.fullName}</h3>
                    <div className="flex items-center justify-between">
                        <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-[#C4FF00] shadow-[0_0_8px_rgba(196,255,0,0.8)]" : "bg-white/30"}`}></span>
                        <p className={`${isOnline ? "text-[#C4FF00]/90" : "text-white/40"} text-xs font-medium tracking-wider uppercase`}>
                            {isOnline ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setSelectedUser(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white text-white/50 transition-all duration-300 group"
            >
                <XIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

        </div>
    );
}

export default ChatHeader
