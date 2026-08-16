import React from "react";
import { FileText, Download, Sparkles, ArrowRight } from "lucide-react";
import {Link} from "react-router-dom"
const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-50" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-12">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              Build Professional Resumes Instantly
            </div>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Create a Job-Winning
              <span className="block text-blue-600">
                Resume in Minutes
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-lg text-slate-600">
              Build beautiful ATS-friendly resumes with our easy-to-use
              resume builder. Add your details, choose a professional
              layout, and download your resume as PDF instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={"/home"}>
                <button className="cursor-pointer flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
                Create Resume
                <ArrowRight size={18} />
              </button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  10K+
                </h3>
                <p className="text-slate-500">
                  Resumes Generated
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  ATS
                </h3>
                <p className="text-slate-500">
                  Friendly Design
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  PDF
                </h3>
                <p className="text-slate-500">
                  Instant Download
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Mohd Ayaan Baig
                  </h3>

                  <p className="text-sm text-slate-500">
                    Full Stack MERN Developer
                  </p>
                </div>

                <FileText className="text-blue-600" />
              </div>

              <div className="space-y-3">
                <div className="h-3 rounded bg-slate-200" />
                <div className="h-3 w-5/6 rounded bg-slate-200" />
                <div className="h-3 w-4/6 rounded bg-slate-200" />
              </div>

              <div className="mt-6">
                <div className="mb-2 h-4 w-32 rounded bg-blue-200" />

                <div className="space-y-2">
                  <div className="h-3 rounded bg-slate-200" />
                  <div className="h-3 w-11/12 rounded bg-slate-200" />
                  <div className="h-3 w-8/12 rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 h-4 w-24 rounded bg-blue-200" />

                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs">
                    React
                  </span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs">
                    Node.js
                  </span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs">
                    MongoDB
                  </span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs">
                    Express
                  </span>
                </div>
              </div>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-medium text-white">
                <Download size={18} />
                Download PDF
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

