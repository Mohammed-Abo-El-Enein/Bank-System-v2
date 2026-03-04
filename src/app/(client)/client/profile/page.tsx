"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
      <h1 className="text-2xl font-semibold text-dark dark:text-white mb-6">
        My Profile
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-2">Full Name</p>
          <p className="font-medium text-dark dark:text-white">
            {user?.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-2">Email</p>
          <p className="font-medium text-dark dark:text-white">
            {user?.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-2">Role</p>
          <p className="font-medium text-primary">
            {user?.role}
          </p>
        </div>
      </div>
    </div>
  );
}