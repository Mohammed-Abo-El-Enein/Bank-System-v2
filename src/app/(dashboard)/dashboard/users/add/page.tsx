"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();

 const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  role: "admin",
  status: "active",
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated. Please login again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      let data;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(
          `Server returned non-JSON response (Status ${res.status})`
        );
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess("User created successfully ✅");

      setTimeout(() => {
        router.push("/dashboard/users");
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>

      <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-3 bg-white dark:bg-dark-3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-3 bg-white dark:bg-dark-3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            </div>
                      <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-3 bg-white dark:bg-dark-3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-3 bg-white dark:bg-dark-3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="teller">Teller</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-3 bg-white dark:bg-dark-3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-light-6 text-red px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-light-6 text-green px-4 py-2 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}