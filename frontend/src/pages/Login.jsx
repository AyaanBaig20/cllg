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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-indigo-600" size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>

          <p className="text-slate-500 mt-2">
            Start building your professional resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="john123"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-slate-500 mt-6">
          Dont have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700">
              Signup
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
