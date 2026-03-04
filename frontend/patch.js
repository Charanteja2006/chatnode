const fs = require('fs');

function patch(file) {
  let s = fs.readFileSync(file, 'utf-8');
  s = s.replace(/from-cyan-500\/20 to-indigo-500\/20/g, 'from-[#C4FF00]/20 to-[#A0D000]/20');
  s = s.replace(/from-cyan-600 to-indigo-600/g, 'from-[#C4FF00] to-[#A0D000]');
  s = s.replace(/text-cyan-400/g, 'text-[#C4FF00]');
  s = s.replace(/shadow-cyan-900\/10/g, 'shadow-[#C4FF00]/10');
  s = s.replace(/shadow-\[0_0_15px_rgba\(34,211,238,0\.2\)\]/g, 'shadow-[0_0_15px_rgba(196,255,0,0.2)]');
  s = s.replace(/from-indigo-900\/20 via-transparent to-cyan-900\/10/g, 'from-black/80 via-transparent to-[#C4FF00]/5');
  s = s.replace(/from-cyan-400 to-indigo-400/g, 'from-[#C4FF00] to-[rgb(196,255,0)]');
  s = s.replace(/rgba\(34,211,238,0\.1\)/g, 'rgba(196,255,0,0.05)');
  s = s.replace(/rgba\(34,211,238,0\.2\)/g, 'rgba(196,255,0,0.15)');
  s = s.replace(/bg-gradient-to-r from-cyan-600 to-indigo-600 text-\[14px\] text-white border border-white\/10/g, 'bg-[#C4FF00] text-[14px] text-black border border-[#C4FF00]/10');
  s = s.replace(/text-blue-400/g, 'text-[#C4FF00]');
  s = s.replace(/bg-white\/5 border border-white\/10 text-white backdrop-blur-md text-\[14px\]/g, 'bg-[#1C1C1C] border border-[#333] text-white backdrop-blur-md text-[14px]');
  fs.writeFileSync(file, s);
}

patch('src/pages/SignUpPage.jsx');
patch('src/components/ChatContainer.jsx');
