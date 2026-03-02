import { useState, useRef } from 'react';
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const mouseClickSound = new Audio('/sounds/frontend_public_sounds_mouse-click.mp3');

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [SelectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='p-6 border-b border-white/10 bg-black/10 backdrop-blur-md relative z-20 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          {/* Avatar */}
          <div className='avatar online'>
            <button className='size-14 rounded-full overflow-hidden relative group ring-2 ring-cyan-500/30 hover:ring-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
              onClick={() => fileInputRef.current.click()}
            >
              <img src={SelectedImg || authUser.profilePic || '/avatar.png'}
                alt="User image"
                className='size-full object-cover'
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-semibold tracking-wide">Change</span>
              </div>
            </button>
            <input type="file"
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              className='hidden'
            />
          </div>

          {/* Username & Online Text */}
          <div>
            <h3 className='text-white font-semibold text-base max-w-[180px] truncate tracking-wide'>
              {authUser.fullName}
            </h3>

            <div className='flex items-center gap-1.5 mt-0.5'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'></span>
              <p className='text-emerald-400/90 text-xs font-medium tracking-wider uppercase'>Online</p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 items-center">
          {/* LOGOUT BTN */}
          <button
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-300"
            onClick={logout}
            title="Logout"
          >
            <LogOutIcon className="size-4" />
          </button>

          {/* SOUND TOGGLE BTN */}
          <button
            className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 ${isSoundEnabled
              ? "text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
              : "text-white/40 hover:bg-white/10 hover:text-white/70"
              }`}
            onClick={() => {
              // play click sound before toggling
              const currentSrc = mouseClickSound ? mouseClickSound : new Audio('/sounds/frontend_public_sounds_mouse-click.mp3');
              if (currentSrc.currentTime !== undefined) {
                currentSrc.currentTime = 0; // reset to start
                currentSrc.play().catch((error) => console.log("Audio play failed:", error));
              }
              toggleSound();
            }}
            title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-4" />
            ) : (
              <VolumeOffIcon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
