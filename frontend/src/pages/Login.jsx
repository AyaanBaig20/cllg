import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setloading } from "../redux/features/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { failureToast, successToast } from "../utilis/toast";

export default function Login() {
  let navigate = useNavigate();
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
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      failureToast(error.response?.data?.message || error.message);
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-[#E7DCD3] bg-white p-9 shadow-[0_1px_0_#E7DCD3]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E4DF]">
            <UserPlus className="text-[#7A0C0C]" size={26} />
          </div>

          <h1 className="font-serif text-3xl text-[#1C1210]">
            Welcome back
          </h1>

          <p className="mt-2 text-[#5C4B45]">
            Sign in to keep building your resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1C1210]">
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full rounded-xl border border-[#E7DCD3] bg-[#FBF7F2] px-4 py-3 text-[#1C1210] placeholder-[#A8968F] transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7A0C0C]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1C1210]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-[#E7DCD3] bg-[#FBF7F2] px-4 py-3 text-[#1C1210] placeholder-[#A8968F] transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7A0C0C]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-[#7A0C0C] py-3 font-semibold text-white transition hover:bg-[#5C0909]"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-[#5C4B45]">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="cursor-pointer font-semibold text-[#7A0C0C] hover:text-[#5C0909]">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}