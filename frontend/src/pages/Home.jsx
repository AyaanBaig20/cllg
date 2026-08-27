import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setDarkmode } from "../redux/features/user";
import { FileText, LogOut, Moon, Sun } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const darkmode = useSelector((state) => state.user.darkmode);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const handleMode = () => {
    dispatch(setDarkmode());
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ResumeBuilder
          </h1>

          <div className="flex items-center gap-4">

            {/* Dark / Light Mode */}
            <button
              onClick={handleMode}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              {darkmode ? <Sun size={18} /> : <Moon size={18} />}

              {darkmode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">

          <h1 className="mb-3 text-4xl font-bold">
            Welcome {user?.name || "User"}
          </h1>

          <p className="text-lg text-blue-100">
            Create ATS-friendly resumes and download them instantly as PDF.
          </p>

          <Link
            to="/resume"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
          >
            + Create Resume
          </Link>
        </div>

        {/* Empty State */}
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

          <FileText
            size={60}
            className="mx-auto mb-4 text-slate-300 dark:text-slate-600"
          />

          <h3 className="mb-2 text-xl font-semibold text-slate-700 dark:text-white">
            Start Building Your Resume
          </h3>

          <p className="mb-5 text-slate-500 dark:text-slate-400">
            Create a professional resume in just a few minutes.
          </p>

          <Link
            to="/resume"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            Create Resume
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;