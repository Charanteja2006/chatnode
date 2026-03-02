import { Routes, Route, Navigate } from 'react-router';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import PageLoader from './components/PageLoader.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />

  return (
    <div className="h-screen w-full bg-[#050505] relative flex items-center justify-center p-0 md:p-4 overflow-hidden font-sans text-slate-200">

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Abstract Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-[40%] left-[60%] size-[300px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;