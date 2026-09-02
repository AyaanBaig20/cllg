import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, FileText, Trash2 } from "lucide-react";
import {successToast} from "../utilis/toast"

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/resume/get-all-user",
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          setUsers(res.data.allUser);
          console.log(res.data.allUser);
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

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

  const totalUsers = users.length;

  const totalResumes = users.reduce(
    (sum, user) => sum + (user.resumeCreated || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <Users className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h2 className="text-3xl font-bold">{totalUsers}</h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <FileText className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Resumes Generated</p>
                <h2 className="text-3xl font-bold">{totalResumes}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">Registered Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Resumes Created</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-t hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{user.name}</td>

                      <td className="px-6 py-4 text-gray-600">{user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">{user.resumeCreated || 0}</td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="cursor-pointer rounded-lg p-2 text-red-600 transition-all duration-150 hover:bg-red-50 hover:text-red-700 hover:scale-110 active:scale-75"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
