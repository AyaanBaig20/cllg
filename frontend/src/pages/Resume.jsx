import React, { useState } from "react";
import {
  Plus,
  Trash2,
  User,
  FileText,
  GraduationCap,
  FolderKanban,
  Briefcase,
  Sparkles,
  Link,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Resume = () => {
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
      i === index ? { ...item, points: [...item.points, ""] } : item
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
        : item
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
        : item
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
        {number}
      </span>
      <Icon className="h-5 w-5 text-blue-600" />
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-100">
        {/* HEADER */}
        <div className="bg-blue-600 px-8 py-8 text-white">
          <div className="flex items-center gap-3">
            <Sparkles className="h-7 w-7" />
            <h1 className="text-3xl font-bold">Resume Builder</h1>
          </div>
          <p className="mt-2 text-blue-100">
            Fill in each section below to put together a clean, professional resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* PERSONAL INFO */}
          <div className="mb-10">
            <SectionHeading icon={User} number="1" title="Personal Information" />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />

              <input
                className={inputClass}
                placeholder="Job title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                />
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mb-10">
            <SectionHeading icon={FileText} number="2" title="Professional Summary" />

            <textarea
              rows="5"
              className={inputClass}
              placeholder="Write a short summary of your experience and strengths..."
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </div>

          {/* EDUCATION */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <SectionHeading icon={GraduationCap} number="3" title="Education" />

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
                        updateNestedField("education", index, "degree", e.target.value)
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        updateNestedField(
                          "education",
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Graduation year"
                      value={edu.year}
                      onChange={(e) =>
                        updateNestedField("education", index, "year", e.target.value)
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

          {/* PROJECTS */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
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
                      updateNestedField("projects", index, "title", e.target.value)
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
                  <div key={pointIndex} className="mb-2 flex items-center gap-2">
                    <input
                      className={`${inputClass} flex-1`}
                      placeholder={`Bullet ${pointIndex + 1}`}
                      value={point}
                      onChange={(e) =>
                        updatePoint("projects", index, pointIndex, e.target.value)
                      }
                    />
                    {project.points.length > 1 && (
                      <button
                        type="button"
                        className={removeBtnClass}
                        onClick={() => removePoint("projects", index, pointIndex)}
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

          {/* EXPERIENCE */}
          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
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
                        updateNestedField("experience", index, "role", e.target.value)
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateNestedField("experience", index, "company", e.target.value)
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
                          e.target.value
                        )
                      }
                    />

                    <input
                      className={inputClass}
                      placeholder="End date"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateNestedField("experience", index, "endDate", e.target.value)
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
                  <div key={pointIndex} className="mb-2 flex items-center gap-2">
                    <input
                      className={`${inputClass} flex-1`}
                      placeholder={`Responsibility ${pointIndex + 1}`}
                      value={point}
                      onChange={(e) =>
                        updatePoint("experience", index, pointIndex, e.target.value)
                      }
                    />
                    {exp.points.length > 1 && (
                      <button
                        type="button"
                        className={removeBtnClass}
                        onClick={() => removePoint("experience", index, pointIndex)}
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

          {/* SIMPLE LISTS */}
          {[
            { field: "skills", label: "Skills", number: "6" },
            { field: "certifications", label: "Certifications", number: "7" },
            { field: "achievements", label: "Achievements", number: "8" },
            { field: "languages", label: "Languages", number: "9" },
            { field: "interests", label: "Interests", number: "10" },
          ].map(({ field, label, number }) => (
            <div key={field} className="mb-10">
              <div className="mb-4 flex items-center justify-between">
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
          ))}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Generate resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resume;