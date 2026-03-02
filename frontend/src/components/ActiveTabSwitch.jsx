import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex bg-black/20 p-1.5 m-4 rounded-xl border border-white/5 backdrop-blur-md">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "chats"
            ? "bg-white/10 text-white shadow-sm border border-white/5"
            : "text-white/40 hover:text-white/70 hover:bg-white/5"
          }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "contacts"
            ? "bg-white/10 text-white shadow-sm border border-white/5"
            : "text-white/40 hover:text-white/70 hover:bg-white/5"
          }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;