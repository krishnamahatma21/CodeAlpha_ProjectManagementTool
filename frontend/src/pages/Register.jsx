import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  KanbanSquare,
  User,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post(
        '/auth/register',
        formData
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify(res.data)
      );

      navigate('/');
    } catch (err) {
      alert(
        err.response?.data?.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        min-h-[calc(100vh-64px)]
        overflow-hidden
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -top-32
            -right-32
            h-80
            w-80
            rounded-full
            bg-indigo-200/40
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-80
            w-80
            rounded-full
            bg-purple-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-1/2
            left-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-100/20
            blur-3xl
          "
        />

      </div>

      {/* ================= REGISTER CARD ================= */}

      <div className="relative w-full max-w-md">

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200/80
            bg-white
            shadow-2xl
            shadow-slate-300/30
          "
        >

          {/* ================= BRAND HEADER ================= */}

          <div className="px-7 sm:px-9 pt-9 pb-7 text-center">

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-indigo-600
                text-white
                shadow-xl
                shadow-indigo-600/25
              "
            >
              <KanbanSquare className="w-8 h-8" />
            </div>

            <div className="mt-5">

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                Create Your Account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Start managing projects and collaborating with your team.
              </p>

            </div>

          </div>

          {/* ================= FORM ================= */}

          <div className="px-7 sm:px-9 pb-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full Name */}

              <div>

                <label
                  htmlFor="name"
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-600
                    mb-2
                  "
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-slate-400
                    "
                  />

                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      focus:bg-white
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition
                    "
                    placeholder="Alex Johnson"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-600
                    mb-2
                  "
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-slate-400
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      focus:bg-white
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition
                    "
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-600
                    mb-2
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      text-slate-400
                    "
                  />

                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="
                      w-full
                      pl-10
                      pr-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-900
                      placeholder:text-slate-400
                      focus:bg-white
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition
                    "
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* Create Account Button */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-indigo-600
                  hover:bg-indigo-500
                  disabled:bg-indigo-400
                  disabled:cursor-not-allowed
                  text-white
                  py-3
                  rounded-xl
                  text-sm
                  font-bold
                  shadow-lg
                  shadow-indigo-600/20
                  hover:shadow-indigo-600/30
                  hover:-translate-y-0.5
                  disabled:hover:translate-y-0
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                        animate-spin
                      "
                    />

                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      className="
                        w-4
                        h-4
                        group-hover:translate-x-0.5
                        transition-transform
                      "
                    />
                  </>
                )}

              </button>

            </form>

            {/* ================= SECURITY ================= */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                mt-6
                text-[11px]
                text-slate-400
              "
            >
              <ShieldCheck className="w-3.5 h-3.5" />

              Your account is securely authenticated
            </div>

            {/* ================= LOGIN ================= */}

            <div className="relative my-6">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>

              <div className="relative flex justify-center">

                <span
                  className="
                    bg-white
                    px-3
                    text-[10px]
                    uppercase
                    tracking-wider
                    font-semibold
                    text-slate-400
                  "
                >
                  Already registered?
                </span>

              </div>

            </div>

            <p className="text-center text-sm text-slate-500">

              Already have an account?{' '}

              <Link
                to="/login"
                className="
                  font-bold
                  text-indigo-600
                  hover:text-indigo-700
                  hover:underline
                  underline-offset-4
                  transition
                "
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

        {/* Footer */}

        <p className="text-center text-[11px] text-slate-400 mt-5">
          © 2026 TaskFlow Pro · Project Management Platform
        </p>

      </div>

    </div>
  );
};

export default Register;