import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KanbanSquare,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  let user = null;

  try {
    const storedUser = localStorage.getItem('user');

    if (storedUser && storedUser !== 'undefined') {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() || 'M';

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-800/80
        bg-slate-950/95
        text-white
        shadow-lg
        backdrop-blur-md
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          h-16
          flex
          items-center
          justify-between
        "
      >

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="group flex items-center gap-2.5"
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
              shadow-lg
              shadow-indigo-600/20
              group-hover:bg-indigo-500
              group-hover:scale-105
              transition-all
              duration-200
            "
          >
            <KanbanSquare className="w-5 h-5 text-white" />
          </div>

          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-tight">
              TaskFlow
            </span>

            <span className="ml-1 text-indigo-400 font-bold">
              Pro
            </span>
          </div>
        </Link>

        {/* ================= NAVIGATION ================= */}

        <div className="flex items-center gap-2 sm:gap-4">

          {token ? (
            <>
              {/* Boards */}

              <Link
                to="/"
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-300
                  hover:bg-slate-800
                  hover:text-white
                  transition
                "
              >
                <LayoutDashboard className="w-4 h-4" />

                Boards
              </Link>

              {/* ================= USER ================= */}

              <div className="flex items-center gap-2">

                {/* Avatar */}

                <div
                  className="
                    hidden
                    sm:flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-500/20
                    border
                    border-indigo-400/30
                    text-xs
                    font-bold
                    text-indigo-300
                  "
                >
                  {userInitial}
                </div>

                {/* Name */}

                <span
                  className="
                    max-w-[100px]
                    sm:max-w-[140px]
                    truncate
                    rounded-lg
                    border
                    border-slate-700
                    bg-slate-900
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-slate-300
                  "
                >
                  {user?.name || 'Member'}
                </span>

              </div>

              {/* ================= LOGOUT ================= */}

              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-red-400
                  hover:bg-red-500
                  hover:text-white
                  hover:border-red-500
                  transition
                  cursor-pointer
                "
              >
                <LogOut className="w-3.5 h-3.5" />

                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <>
              {/* ================= LOGIN ================= */}

              <Link
                to="/login"
                className="
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-300
                  hover:bg-slate-800
                  hover:text-white
                  transition
                "
              >
                Login
              </Link>

              {/* ================= SIGN UP ================= */}

              <Link
                to="/register"
                className="
                  rounded-lg
                  bg-indigo-600
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-indigo-600/20
                  hover:bg-indigo-500
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                "
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;