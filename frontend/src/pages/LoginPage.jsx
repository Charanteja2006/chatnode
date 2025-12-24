import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function LoginPage() {
  const {authUser,isLoggedIn,login} = useAuthStore();

  return (
    <div>
      Login
    </div>
  )
}

export default LoginPage
