import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx';
import { useChatStore } from '../store/useChatStore.js';
import NoConversationalPlaceholder from '../components/NoConversationalPlaceholder.jsx';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx';
import ChatsList from '../components/ChatsList.jsx';
import ContactList from '../components/ContactList.jsx';
import ChatContainer from '../components/ChatContainer.jsx';


function ChatPage({ myName }) {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className='relative w-full h-full max-w-[1600px] shadow-2xl shadow-cyan-900/10 md:rounded-3xl overflow-hidden'>

      <BorderAnimatedContainer>
        <div className='w-full h-full flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl'>
          {/* Side bar */}
          <div className='w-80 bg-black/20 border-r border-white/10 flex flex-col relative z-10'>
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className='flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar'>
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}

            </div>
          </div>

          {/* Right side */}
          <div className='flex-1 flex flex-col relative z-0 overflow-hidden bg-transparent' >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0,transparent_100%)] pointer-events-none" />
            {selectedUser ? <ChatContainer /> : <NoConversationalPlaceholder />}
          </div>
        </div>

      </BorderAnimatedContainer>

    </div>
  )
}

export default ChatPage
