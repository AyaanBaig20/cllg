import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/features/user";
import { FileText, LogOut, ShieldCheck, Sparkles, Download } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-[#FBF7F2] font-sans text-[#1C1210]">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-[#E7DCD3] bg-[#FBF7F2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-[1.6rem] tracking-tight text-[#7A0C0C]">
            Resume<span className="text-[#1C1210]">Builder</span>
          </span>

          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <Link to="/admin">
                <button className="cursor-pointer rounded-full border border-[#1C1210]/15 px-4 py-2 text-sm font-medium text-[#1C1210] transition hover:border-[#7A0C0C] hover:text-[#7A0C0C]">
                  Admin panel
                </button>
              </Link>
            )}
            {!user&& (
              <Link to="/login">
                <button className="cursor-pointer rounded-full border border-[#1C1210]/15 px-4 py-2 text-sm font-medium text-[#1C1210] transition hover:border-[#7A0C0C] hover:text-[#7A0C0C]">
                  Login
                </button>
              </Link>
            )}
{ user && (
            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-[#7A0C0C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5C0909]"
            >
              <LogOut size={16} />
              Log out
            </button>)}

          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C0505]/95 via-[#3A0A0A]/85 to-[#7A0C0C]/70" />

        <div className="relative mx-auto flex max-w-6xl flex-col px-6 py-24 md:py-32">
          {user &&(<p className="mb-5 text-sm font-medium text-[#F2B5A8]">
           
            Welcome {user?.name || "welcome back"}
          </p>)}

          <h1 className="max-w-2xl font-serif text-5xl leading-[1.1] text-[#FBF7F2] md:text-6xl">
            A resume that reads the room before the recruiter does.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-[#E7C9C1]">
            Build an ATS-ready resume with formatting that survives every
            parser, then export it as a polished PDF in minutes.
          </p>

          <Link
            to="/resume"
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-[#FBF7F2] px-7 py-3.5 font-medium text-[#7A0C0C] transition hover:bg-white"
          >
            Start a new resume
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="border-t-2 border-[#7A0C0C] pt-6">
            <ShieldCheck className="mb-4 text-[#7A0C0C]" size={28} />
            <h3 className="mb-2 font-serif text-xl">Built to pass the scan</h3>
            <p className="text-[#5C4B45]">
              Every template is structured so applicant tracking systems read
              your experience the way you wrote it.
            </p>
          </div>

          <div className="border-t-2 border-[#7A0C0C] pt-6">
            <Sparkles className="mb-4 text-[#7A0C0C]" size={28} />
            <h3 className="mb-2 font-serif text-xl">Guided, not generic</h3>
            <p className="text-[#5C4B45]">
              Section prompts and phrasing suggestions help you describe your
              work without sounding like everyone else.
            </p>
          </div>

          <div className="border-t-2 border-[#7A0C0C] pt-6">
            <Download className="mb-4 text-[#7A0C0C]" size={28} />
            <h3 className="mb-2 font-serif text-xl">One click to PDF</h3>
            <p className="text-[#5C4B45]">
              Download a print-ready PDF the moment you're done editing, with
              layout that holds up on any device.
            </p>
          </div>
        </div>
      </section>

      {/* CTA / empty state */}
      <section className="mx-auto max-w-6xl px-6 pb-17">
        <div className="rounded-2xl border border-[#E7DCD3] bg-white p-14 text-center">
          <FileText size={48} className="mx-auto mb-5 text-[#7A0C0C]/40" />

          <h3 className="mb-2 font-serif text-2xl text-[#1C1210]">
            Create your resume
          </h3>

          <p className="mx-auto mb-7 max-w-md text-[#5C4B45]">
            Pick a template, fill in your experience, and export when you're
            ready. It takes most people under ten minutes.
          </p>

          <Link
            to="/resume"
            className="inline-block rounded-full bg-[#7A0C0C] px-7 py-3 font-medium text-white transition hover:bg-[#5C0909]"
          >
            Create your resume
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;