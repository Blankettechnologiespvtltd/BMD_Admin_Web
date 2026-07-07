import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; 


 function LogoutPage({ isCollapsed = false }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

const handleLogoutClick = (e) => {
  e.preventDefault();
  setIsLoggingOut(true);

  setTimeout(() => {
  
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    
    window.location.replace("/");
  }, 800);
};
  return (
    <div className="p-4 border-t border-slate-100 flex justify-center items-center">
      <button
        onClick={handleLogoutClick}
        disabled={isLoggingOut}
        className={`flex items-center rounded-xl transition-all duration-300 font-semibold
          ${isLoggingOut ? 'bg-red-50 text-red-500 scale-90' : 'text-slate-500 hover:text-red-600 hover:bg-red-50'}
          ${isCollapsed 
            ? 'w-10 h-10 justify-center p-0' 
            : 'w-full gap-3 px-4 py-3 text-sm md:justify-start justify-center md:w-full'
          }`}
        title="Logout"
      >

        <div className={`flex items-center justify-center transition-all ${isCollapsed ? 'w-full h-full' : ''}`}>
          <LogOut className={`w-4 h-4 min-w-[11px] ${isLoggingOut ? 'animate-spin' : ''}`} />
        </div>
        
       
        <span className={`truncate text-xs md:text-sm transition-all duration-200
          ${isCollapsed ? 'hidden' : 'inline-block'} 
          ${isLoggingOut ? 'text-[11px] text-red-400' : ''}`}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </span>
      </button>
    </div>
  );
}
export default LogoutPage;