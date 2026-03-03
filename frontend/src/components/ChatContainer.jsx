import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { Check, CheckCheck } from "lucide-react";


function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages, markMessagesAsRead } = useChatStore();
  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    markMessagesAsRead(selectedUser._id);

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages, markMessagesAsRead]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);


  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ChatHeader />
      <div ref={scrollRef} className="flex-1 px-6 overflow-y-auto py-8 custom-scrollbar">
        {messages.length > 0 && !isMessagesLoading ?
          (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map(msg => (
                <div key={msg._id}
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div className={
                    `chat-bubble relative shadow-lg ${msg.senderId === authUser._id
                      ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border border-white/10"
                      : "bg-white/5 border border-white/10 text-white backdrop-blur-md"
                    }`
                  }>

                    {msg.image && (
                      <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover border border-white/10 shadow-sm mb-2" />
                    )}
                    {msg.text && <p className="mt-2 text-[15px]">{msg.text}</p>}
                    <p className="text-[10px] mt-1 opacity-70 flex items-center justify-end gap-1">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {msg.senderId === authUser._id && (
                        <span className="ml-1 flex items-center">
                          {msg.status === "read" ? (
                            <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                          ) : msg.status === "delivered" ? (
                            <CheckCheck className="w-3.5 h-3.5" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          )
          : isMessagesLoading ? <MessagesLoadingSkeleton /> :
            (<NoChatHistoryPlaceholder name={selectedUser.fullName} />)
        }
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
