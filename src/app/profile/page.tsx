"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth() as any;
  const router = useRouter();

  // حماية الصفحة
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  // توليد لون ثابت حسب أول حرف
  const getColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="px-4 pb-8 pt-10 text-center">

          {/* Avatar بحرف */}
          <div
            className={`mx-auto h-32 w-32 rounded-full text-white flex items-center justify-center text-4xl font-bold shadow-lg ${getColor(
              user.name
            )}`}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* معلومات المستخدم */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-dark dark:text-white">
              {user.name}
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}