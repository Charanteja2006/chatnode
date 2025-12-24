import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function SignUpPage() {
  const {authUser,isLoggedIn,login} = useAuthStore();

  return (
    <div>
      Signup
    </div>
  )
}

export default SignUpPage
