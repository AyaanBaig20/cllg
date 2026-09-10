import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Users, 
  FileText, 
  Trash2, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Award,
  Code
} from "lucide-react";
import { successToast } from "../utilis/toast";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/resume/get-all-user",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setUsers(res.data.allUser);
          if (res.data.allUser.length > 0) {
            setSelectedUser(res.data.allUser[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/auth/delete",
        {
          data: { id },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        successToast(res.data.message);

        setUsers((prev) => {
          const updated = prev.filter((user) => user._id !== id);
          if (selectedUser?._id === id) {
            setSelectedUser(updated[0] || null);
          }
          return updated;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalUsers = users.length;

  const totalResumes = users.reduce(
    (sum, user) => sum + (user.resumeCreated || 0),
    0
  );

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Normalize single resume or array of resumes
  const userResume = selectedUser?.resumes 
    ? (Array.isArray(selectedUser.resumes) ? selectedUser.resumes[0] : selectedUser.resumes)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg text-white shadow-md shadow-red-600/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-900">Admin Dashboard</h1>
            <span className="text-xs text-red-600 font-medium">User & Resume Management</span>
          </div>
        </div>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users or emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100/80 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6 max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar: Users List */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            <span>All Users ({filteredUsers.length})</span>
          </div>

          <div className="space-y-2.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => {
                const isSelected = selectedUser?._id === u._id;
                return (
                  <div
                    key={u._id}
                    onClick={() => setSelectedUser(u)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? "bg-white border-red-600 shadow-md ring-1 ring-red-500/20"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900 capitalize truncate pr-2">
                        {u.name}
                      </span>
                      <button
                        title="Delete User"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete user ${u.name}?`)) {
                            handleDelete(u._id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 truncate mb-3">{u.email}</p>

                    <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <FileText size={14} className="text-red-600" />
                        {u.resumeCreated || 0} Resumes
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-red-50 text-red-600 border border-red-100 uppercase">
                        {u.role || "User"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-xs text-slate-400 py-10 bg-white rounded-xl border border-slate-200">
                No users found.
              </div>
            )}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
          
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-red-50 p-3 rounded-xl text-red-600 border border-red-100">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-red-50 p-3 rounded-xl text-red-600 border border-red-100">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Total Resumes Created</p>
                <p className="text-2xl font-bold text-slate-900">{totalResumes}</p>
              </div>
            </div>
          </div>

          {/* User Resume Viewer */}
          {selectedUser ? (
            <div className="space-y-4">
              {userResume ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
                  
                  {/* Header: Candidate Info */}
                  <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {userResume.fullName || selectedUser.name}
                        </h2>
                        {userResume.jobTitle && (
                          <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full border border-red-200 font-semibold capitalize">
                            {userResume.jobTitle}
                          </span>
                        )}
                      </div>
                      {userResume.summary && (
                        <p className="text-sm text-slate-600 mt-2.5 max-w-2xl leading-relaxed">
                          {userResume.summary}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-slate-600 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 min-w-[200px]">
                      {userResume.email && (
                        <span className="flex items-center gap-2">
                          <Mail size={14} className="text-red-600 shrink-0" /> {userResume.email}
                        </span>
                      )}
                      {userResume.phone && (
                        <span className="flex items-center gap-2">
                          <Phone size={14} className="text-red-600 shrink-0" /> {userResume.phone}
                        </span>
                      )}
                      {userResume.location && (
                        <span className="flex items-center gap-2">
                          <MapPin size={14} className="text-red-600 shrink-0" /> {userResume.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  {(userResume.linkedinUrl || userResume.githubUrl) && (
                    <div className="flex gap-3">
                      {userResume.linkedinUrl && (
                        <a
                          href={userResume.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                        >
                          LinkedIn <ExternalLink size={12} />
                        </a>
                      )}
                      {userResume.githubUrl && (
                        <a
                          href={userResume.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-1.5 rounded-lg border border-red-200 transition-colors"
                        >
                          GitHub <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Skills & Achievements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Code size={15} className="text-red-600" /> Skills & Languages
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {userResume.skills?.map((skill, idx) => (
                          skill && (
                            <span key={idx} className="bg-white text-slate-700 font-medium text-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                              {skill}
                            </span>
                          )
                        ))}
                        {userResume.languages?.map((lang, idx) => (
                          lang && (
                            <span key={idx} className="bg-red-50 text-red-700 font-medium border border-red-200 text-xs px-2.5 py-1 rounded-md">
                              {lang}
                            </span>
                          )
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Award size={15} className="text-red-600" /> Achievements & Certifications
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {userResume.achievements?.map((ach, idx) => (
                          ach && (
                            <span key={idx} className="bg-white text-slate-700 font-medium text-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                              {ach}
                            </span>
                          )
                        ))}
                        {userResume.certifications?.map((cert, idx) => (
                          cert && (
                            <span key={idx} className="bg-white text-slate-700 font-medium text-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                              {cert}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Structural Lists: Education, Experience & Projects */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Education */}
                    <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                      <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <GraduationCap size={15} className="text-red-600" /> Education
                      </h4>
                      {Array.isArray(userResume.education) && userResume.education.length > 0 ? (
                        userResume.education.map((edu, i) => (
                          <div key={i} className="text-xs space-y-0.5 mb-2 pb-2 border-b border-slate-200/60 last:border-none">
                            <p className="font-semibold text-slate-900">{edu.degree || edu.institution || "Degree Detail"}</p>
                            {edu.year && <p className="text-[11px] text-slate-500">{edu.year}</p>}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">No education entries.</p>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                      <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <Briefcase size={15} className="text-red-600" /> Experience
                      </h4>
                      {Array.isArray(userResume.experience) && userResume.experience.length > 0 ? (
                        userResume.experience.map((exp, i) => (
                          <div key={i} className="text-xs space-y-0.5 mb-2 pb-2 border-b border-slate-200/60 last:border-none">
                            <p className="font-semibold text-slate-900">{exp.role || exp.company || "Work Detail"}</p>
                            {exp.duration && <p className="text-[11px] text-slate-500">{exp.duration}</p>}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">No experience entries.</p>
                      )}
                    </div>

                    {/* Projects */}
                    <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                      <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <FolderGit2 size={15} className="text-red-600" /> Projects
                      </h4>
                      {Array.isArray(userResume.projects) && userResume.projects.length > 0 ? (
                        userResume.projects.map((proj, i) => (
                          <div key={i} className="text-xs space-y-0.5 mb-2 pb-2 border-b border-slate-200/60 last:border-none">
                            <p className="font-semibold text-slate-900">{proj.title || "Project Detail"}</p>
                            {proj.techStack && <p className="text-[11px] text-slate-500">{proj.techStack}</p>}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400">No projects added.</p>
                      )}
                    </div>
                  </div>

                  {/* Resume Footer Meta */}
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-4 border-t border-slate-100 font-mono">
                    <span>Resume ID: {userResume._id}</span>
                    <span>Created: {new Date(userResume.createdAt).toLocaleDateString()}</span>
                  </div>

                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-sm shadow-sm">
                  User <span className="text-slate-900 font-semibold">{selectedUser.name}</span> has not created a resume yet.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-sm shadow-sm">
              Select a user from the left list to view their resume details.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Admin;