import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 relative z-10 w-full">
      <div className="size-24 bg-[#C4FF00]/10 rounded-3xl flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_30px_rgba(196,255,0,0.15)] backdrop-blur-sm animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
        <MessageCircleIcon className="size-12 text-[#C4FF00]" />
      </div>
      <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C4FF00] to-white tracking-tight mb-3">Your Space to the World</h3>
      <p className="text-white/60 text-lg max-w-md font-medium">
        Choose a contact from the sidebar to start a new chat or continue an existing conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;