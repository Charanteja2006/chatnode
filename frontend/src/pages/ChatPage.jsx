import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function ChatPage({myName}) {
  const {authUser,isLoggedIn,login} = useAuthStore();

  return (
    <div>
      Chat
    </div>
  )
}

export default ChatPage
