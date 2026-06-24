"use client";

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

// Mock Data
const initialUsers = [
  { id: "U-1", name: "Alice Johnson", email: "alice@example.com", role: "Seeker", joinDate: "2026-05-10", status: "Active" },
  { id: "U-2", name: "Bob Smith", email: "bob@techflow.com", role: "Recruiter", joinDate: "2026-04-15", status: "Active" },
  { id: "U-3", name: "Charlie Davis", email: "charlie.d@gmail.com", role: "Seeker", joinDate: "2026-06-01", status: "Suspended" },
  { id: "U-4", name: "Diana Prince", email: "diana@amazon.com", role: "Recruiter", joinDate: "2026-03-22", status: "Active" },
  { id: "U-5", name: "Evan Wright", email: "evan.w@startup.io", role: "Seeker", joinDate: "2026-06-18", status: "Active" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleRole = (id: string, currentRole: string) => {
    const newRole = currentRole === "Seeker" ? "Recruiter" : "Seeker";
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    }
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Users</h1>
        <p className="text-gray-500 mt-2">View, filter, and manage platform user accounts and permissions.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer transition-colors appearance-none"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Seeker">Seekers</option>
            <option value="Recruiter">Recruiters</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">User Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Join Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Recruiter' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => toggleRole(user.id, user.role)}
                      className="text-xs font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors border border-indigo-100"
                    >
                      Make {user.role === 'Seeker' ? 'Recruiter' : 'Seeker'}
                    </button>
                    <button
                      onClick={() => toggleStatus(user.id, user.status)}
                      className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors border ${
                        user.status === 'Active' 
                          ? 'text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 border-red-100' 
                          : 'text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-100'
                      }`}
                    >
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
