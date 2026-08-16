import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/user";
import { FilePlus, FileText, User, LogOut } from "lucide-react";

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">ResumeBuilder</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
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
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h1 className="mb-3 text-4xl font-bold">Welcome {user.name}</h1>

          <p className="text-lg text-blue-100">
            Create ATS-friendly resumes and download them instantly as PDF.
          </p>

          <Link
            to="/resume"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-slate-100"
          >
            + Create Resume
          </Link>
        </div>

        {/* Empty State */}
        <div className="rounded-2xl border border-dashed bg-white p-12 text-center">
          <FileText size={60} className="mx-auto mb-4 text-slate-300" />

          <h3 className="mb-2 text-xl font-semibold text-slate-700">
            Start Building Your Resume
          </h3>

          <p className="mb-5 text-slate-500">
            Create a professional resume in just a few minutes.
          </p>

          <Link
            to="/resume"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Create Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
