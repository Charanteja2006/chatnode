import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-white/5 border border-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 backdrop-blur-sm group"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-4">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full ring-2 ring-transparent group-hover:ring-cyan-500/30 transition-all duration-300">
                <img src={contact.profilePic || "/avatar.png"} className="object-cover" />
              </div>
            </div>
            <h4 className="text-white font-medium tracking-wide group-hover:text-cyan-50">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;