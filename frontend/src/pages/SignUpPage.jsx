import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  }

  return (
    <div className='w-full flex items-center justify-center p-4 bg-transparent min-h-screen py-12'>
      <div className='relative w-full max-w-6xl min-h-[600px] h-fit md:h-[80%vh] shadow-2xl shadow-cyan-900/10 rounded-3xl overflow-hidden'>
        <BorderAnimatedContainer>
          <div className='w-full h-full flex flex-col md:flex-row bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl'>
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-white/10 relative z-10'>
              <div className='w-full max-w-md'>
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Create Account</h2>
                  <p className="text-white/60 text-lg">Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative group">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative group">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative group">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn mt-4" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-6">
                  <p className="text-white/50 text-sm mb-4">Already have an account?</p>
                  <Link to="/login" className="auth-link">
                    Login
                  </Link>
                </div>

              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-12 bg-gradient-to-bl from-indigo-900/20 via-transparent to-cyan-900/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0,transparent_70%)] opacity-50 pointer-events-none" />
              <div className="relative z-10 w-full max-w-lg">
                <img
                  src="/signup.png"
                  alt="Start Your Journey"
                  className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform duration-700"
                />
                <div className="mt-10 text-center">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400 tracking-tight">Start Your Journey Today</h3>

                  <div className="mt-6 flex justify-center gap-4 flex-wrap">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  )
}

export default SignUpPage
