import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setloading } from "../redux/features/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {failureToast,successToast} from "../utilis/toast"

export default function Login() {
  let navigate = useNavigate()
  let dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setloading(true));

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        successToast("login successful");
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      }
    } catch (error) {
      failureToast(error.response?.data?.message || error.message);
    } finally {
      dispatch(setloading(false));
    }
  };

return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
    <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 transition-colors duration-300">

      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserPlus
            className="text-indigo-600 dark:text-indigo-400"
            size={28}
          />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome Back
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Start building your professional resume.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="john123"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-slate-500 dark:text-slate-400 mt-6">
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:text-indigo-700 dark:hover:text-indigo-300">
            Signup
          </span>
        </Link>
      </p>

    </div>
  </div>
);
}
