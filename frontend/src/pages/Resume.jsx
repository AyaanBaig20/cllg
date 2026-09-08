import React, { useState } from "react";
import {  Plus,  Trash2,  User,  FileText,  GraduationCap,  FolderKanban,  Briefcase,  Sparkles,  Link,  Mail,  Phone,  MapPin,  ChevronLeft,  ChevronRight,  Check,} from "lucide-react";
import axios from "axios";
import { failureToast, successToast } from "../utilis/toast";

const Resume = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    summary: "",

    education: [
      {
        degree: "",
        institution: "",
        year: "",
      },
    ],

    projects: [
      {
        title: "",
        points: [""],
      },
    ],

    experience: [
      {
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        points: [""],
      },
    ],

    skills: [""],
    certifications: [""],
    achievements: [""],
    languages: [""],
    interests: [""],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addArrayItem = (field, template) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateNestedField = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index] = { ...updated[index], [field]: value };

    setFormData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const addPoint = (section, index) => {
    const updated = formData[section].map((item, i) =>
      i === index ? { ...item, points: [...item.points, ""] } : item,
    );

    setFormData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const removePoint = (section, itemIndex, pointIndex) => {
    const updated = formData[section].map((item, i) =>
      i === itemIndex
        ? { ...item, points: item.points.filter((_, p) => p !== pointIndex) }
        : item,
    );

    setFormData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const updatePoint = (section, itemIndex, pointIndex, value) => {
    const updated = formData[section].map((item, i) =>
      i === itemIndex
        ? {
            ...item,
            points: item.points.map((p, pi) => (pi === pointIndex ? value : p)),
          }
        : item,
    );

    setFormData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const updateSimpleArray = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const addSimpleArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeSimpleArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const inputClass =
    "w-full rounded-lg border border-blue-200 bg-white p-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const sectionCardClass =
    "mb-4 rounded-lg border border-blue-100 bg-blue-50/40 p-4";

  const addBtnClass =
    "inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700";

  const removeBtnClass =
    "inline-flex items-center gap-1 rounded-md border border-blue-200 px-2.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100";

  const SectionHeading = ({ icon: Icon, number, title }) => (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
        {number}
      </span>
      <Icon className="h-5 w-5 text-blue-600" />
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
    </div>
  );

  // ---- Step definitions ----
  // Every step is a small, focused piece of the overall form.
  const steps = [
    { key: "personal", label: "Personal", icon: User },
    { key: "summary", label: "Summary", icon: FileText },
    { key: "education", label: "Education", icon: GraduationCap },
    { key: "projects", label: "Projects", icon: FolderKanban },
    { key: "experience", label: "Experience", icon: Briefcase },
    { key: "skills", label: "Skills", icon: Sparkles },
    { key: "certifications", label: "Certifications", icon: Sparkles },
    { key: "achievements", label: "Achievements", icon: Sparkles },
    { key: "languages", label: "Languages", icon: Sparkles },
    { key: "interests", label: "Interests", icon: Sparkles },
  ];

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/resume/create",
        formData,
        {
          responseType: "blob",
          withCredentials: true,
        },
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${formData.fullName || "resume"}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      successToast("Resume Generate");
    } catch (error) {
      console.error(error);

      failureToast(
        error.response?.data?.message || "Failed to generate resume",
      );
    }
  };

  // Pressing Enter inside a step shouldn't submit the whole form early.
  const handleFormKeyDown = (e) => {
    if (e.key === "Enter" && !isLastStep) {
      e.preventDefault();
      goNext();
    }
  };

  const simpleListMeta = {
    skills: { label: "Skills", number: "6" },
    certifications: { label: "Certifications", number: "7" },
    achievements: { label: "Achievements", number: "8" },
    languages: { label: "Languages", number: "9" },
    interests: { label: "Interests", number: "10" },
  };

  const renderSimpleList = (field) => {
    const { label, number } = simpleListMeta[field];
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {number}
            </span>
            <h2 className="text-xl font-semibold text-slate-900">{label}</h2>
          </div>

          <button
            type="button"
            className={addBtnClass}
            onClick={() => addSimpleArrayItem(field)}
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {formData[field].map((item, index) => (
          <div key={index} className="mb-2 flex items-center gap-2">
            <input
              className={`${inputClass} flex-1`}
              placeholder={`Enter ${label.toLowerCase()}`}
              value={item}
              onChange={(e) => updateSimpleArray(field, index, e.target.value)}
            />
            {formData[field].length > 1 && (
              <button
                type="button"
                className={removeBtnClass}
                onClick={() => removeSimpleArrayItem(field, index)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (steps[step].key) {
      case "personal":
        return (
          <div>
            <SectionHeading
              icon={User}
              number="1"
              title="Personal Information"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                className={inputClass}
                placeholder="Job title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Link className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="GitHub URL"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Link className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="LinkedIn URL"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case "summary":
        return (
          <div>
            <SectionHeading
              icon={FileText}
              number="2"
              title="Professional Summary"
            />

            <textarea
              rows="8"
              className={inputClass}
              placeholder="Write a short summary of your experience and strengths..."
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </div>
        );

      case "education":
        return (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <SectionHeading
                icon={GraduationCap}
                number="3"
                title="Education"
              />

              <button
                type="button"
                className={addBtnClass}
                onClick={() =>
                  addArrayItem("education", {
                    degree: "",
                    institution: "",
                    year: "",
                  })
                }
              >
                <Plus className="h-4 w-4" />
                Add education
              </button>
            </div>

            {formData.education.map((edu, index) => (
              <div key={index} className={sectionCardClass}>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="grid flex-1 gap-3 md:grid-cols-3">
                    <input
                      className={inputClass}
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateNestedField(
                          "education",
                          index,
                          "degree",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Institution"
                      value={edu.institution}
                      required
                      onChange={(e) =>
                        updateNestedField(
                          "education",
                          index,
                          "institution",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Graduation year"
                      required
                      value={edu.year}
                      onChange={(e) =>
                        updateNestedField(
                          "education",
                          index,
                          "year",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      className={removeBtnClass}
                      onClick={() => removeArrayItem("education", index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <SectionHeading icon={FolderKanban} number="4" title="Projects" />

              <button
                type="button"
                className={addBtnClass}
                onClick={() =>
                  addArrayItem("projects", {
                    title: "",
                    points: [""],
                  })
                }
              >
                <Plus className="h-4 w-4" />
                Add project
              </button>
            </div>

            {formData.projects.map((project, index) => (
              <div key={index} className={sectionCardClass}>
                <div className="mb-3 flex items-start gap-3">
                  <input
                    className={`${inputClass} flex-1`}
                    placeholder="Project title"
                    value={project.title}
                    onChange={(e) =>
                      updateNestedField(
                        "projects",
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                  />

                  {formData.projects.length > 1 && (
                    <button
                      type="button"
                      className={removeBtnClass}
                      onClick={() => removeArrayItem("projects", index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {project.points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="mb-2 flex items-center gap-2"
                  >
                    <input
                      className={`${inputClass} flex-1`}
                      placeholder={`Bullet ${pointIndex + 1}`}
                      value={point}
                      onChange={(e) =>
                        updatePoint(
                          "projects",
                          index,
                          pointIndex,
                          e.target.value,
                        )
                      }
                    />
                    {project.points.length > 1 && (
                      <button
                        type="button"
                        className={removeBtnClass}
                        onClick={() =>
                          removePoint("projects", index, pointIndex)
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-blue-300 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  onClick={() => addPoint("projects", index)}
                >
                  <Plus className="h-4 w-4" />
                  Add bullet
                </button>
              </div>
            ))}
          </div>
        );

      case "experience":
        return (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <SectionHeading icon={Briefcase} number="5" title="Experience" />

              <button
                type="button"
                className={addBtnClass}
                onClick={() =>
                  addArrayItem("experience", {
                    role: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    points: [""],
                  })
                }
              >
                <Plus className="h-4 w-4" />
                Add experience
              </button>
            </div>

            {formData.experience.map((exp, index) => (
              <div key={index} className={sectionCardClass}>
                <div className="mb-3 flex items-start gap-3">
                  <div className="grid flex-1 gap-3 md:grid-cols-2">
                    <input
                      className={inputClass}
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        updateNestedField(
                          "experience",
                          index,
                          "role",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateNestedField(
                          "experience",
                          index,
                          "company",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Start date"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateNestedField(
                          "experience",
                          index,
                          "startDate",
                          e.target.value,
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="End date"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateNestedField(
                          "experience",
                          index,
                          "endDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      className={removeBtnClass}
                      onClick={() => removeArrayItem("experience", index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {exp.points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="mb-2 flex items-center gap-2"
                  >
                    <input
                      className={`${inputClass} flex-1`}
                      placeholder={`Responsibility ${pointIndex + 1}`}
                      value={point}
                      onChange={(e) =>
                        updatePoint(
                          "experience",
                          index,
                          pointIndex,
                          e.target.value,
                        )
                      }
                    />
                    {exp.points.length > 1 && (
                      <button
                        type="button"
                        className={removeBtnClass}
                        onClick={() =>
                          removePoint("experience", index, pointIndex)
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-blue-300 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  onClick={() => addPoint("experience", index)}
                >
                  <Plus className="h-4 w-4" />
                  Add responsibility
                </button>
              </div>
            ))}
          </div>
        );

      case "skills":
      case "certifications":
      case "achievements":
      case "languages":
      case "interests":
        return renderSimpleList(steps[step].key);

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] p-4 md:p-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg shadow-[#7A0C0C]/10">
        {/* HEADER */}
        <div className="bg-[#7A0C0C] px-8 py-8 text-white">
          <div className="flex items-center gap-3">
            <Sparkles className="h-7 w-7" />
            <h1 className="text-3xl font-bold">Resume Builder</h1>
          </div>
          <p className="mt-2 text-[#F2B5A8]">
            Fill in each step below to put together a clean, professional
            resume.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="border-b border-[#E7DCD3] bg-[#FBF7F2]/60 px-8 py-4">
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-[#7A0C0C]">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span>{steps[step].label}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#F2D9D2]">
            <div
              className="h-full rounded-full bg-[#7A0C0C] transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="p-8">
          {renderStepContent()}

          {/* NAVIGATION */}
          <div className="mt-10 flex items-center justify-between border-t border-[#E7DCD3] pt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={isFirstStep}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isFirstStep
                  ? "cursor-not-allowed border border-slate-200 text-slate-300"
                  : "border border-[#E7A99C] text-[#7A0C0C] hover:bg-[#F7E4DF]"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            {isLastStep ? (
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#7A0C0C] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5C0909]"
              >
                <Check className="h-4 w-4" />
                Generate resume
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#7A0C0C] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5C0909]"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;