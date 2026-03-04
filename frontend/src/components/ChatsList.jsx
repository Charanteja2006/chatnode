import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-white/5 border border-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 hover:border-[#C4FF00]/30 hover:shadow-[0_0_15px_rgba(196,255,0,0.15)] transition-all duration-300 backdrop-blur-sm group"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-4">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full ring-2 ring-transparent group-hover:ring-[#C4FF00]/30 transition-all duration-300">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="object-cover" />
              </div>
            </div>
            <h4 className="text-white font-medium truncate tracking-wide group-hover:text-[#C4FF00]">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;