import React, { useState } from "react";
import {settemplete} from "../redux/features/user"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Simple ATS-friendly resume",
  },
  {
    id: "slate-sidebar",
    name: "Slate Sidebar",
    description: "Modern two-column layout",
  },
  {
    id: "editorial-serif",
    name: "Editorial Serif",
    description: "Elegant professional design",
  },
];

const Template = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [selected, setSelected] = useState("");
    function onNext() {
        dispatch(settemplete(selected))
        navigate("/resume")
    }
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
          Choose Your Resume Template
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelected(template.id)}
              className={`cursor-pointer rounded-xl border bg-white p-5 shadow transition-all hover:shadow-lg ${
                selected === template.id
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-slate-200"
              }`}
            >
              {/* Preview */}
              <div className="mb-4 h-64 overflow-hidden rounded-lg border bg-white p-3">
                {template.id === "classic" && (
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-700"></div>
                    <div className="h-2 w-full bg-slate-200"></div>
                    <div className="h-2 w-5/6 bg-slate-200"></div>
                    <div className="mt-4 h-3 w-20 bg-slate-500"></div>
                    <div className="h-2 w-full bg-slate-200"></div>
                    <div className="h-2 w-4/5 bg-slate-200"></div>
                  </div>
                )}

                {template.id === "slate-sidebar" && (
                  <div className="flex h-full">
                    <div className="w-1/3 bg-slate-800 p-2">
                      <div className="mb-3 h-3 w-full bg-slate-600"></div>
                      <div className="h-2 w-4/5 bg-slate-600"></div>
                    </div>
                    <div className="flex-1 p-2">
                      <div className="mb-3 h-3 w-24 bg-teal-600"></div>
                      <div className="h-2 w-full bg-slate-200"></div>
                      <div className="mt-2 h-2 w-5/6 bg-slate-200"></div>
                    </div>
                  </div>
                )}

                {template.id === "editorial-serif" && (
                  <div className="space-y-3">
                    <div className="h-4 w-40 bg-blue-900"></div>
                    <div className="border-b-2 border-yellow-600"></div>
                    <div className="h-3 w-24 bg-blue-800"></div>
                    <div className="h-2 w-full bg-amber-100"></div>
                    <div className="h-2 w-4/5 bg-amber-100"></div>
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                {template.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {template.description}
              </p>

              {selected === template.id && (
                <div className="mt-3 rounded-md bg-blue-100 p-2 text-center text-sm font-medium text-blue-700">
                  Selected ✓
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            disabled={!selected}
            onClick={() => onNext(selected)}
            className={`rounded-lg px-6 py-3 font-semibold text-white ${
              selected
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-400"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;