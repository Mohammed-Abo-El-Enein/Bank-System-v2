"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasRole(["super_admin"])) {
    return (
      <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
        Access Denied
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          User Management
        </h2>

        <Link
          href="/dashboard/users/add"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          + Add User
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-2">
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Role</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-2">
                <td className="py-3">{user.name}</td>
                <td className="py-3">{user.email}</td>
                <td className="py-3">{user.role}</td>
                <td className="py-3">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}