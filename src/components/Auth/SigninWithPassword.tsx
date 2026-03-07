"use client";

import { useAuth } from "@/context/AuthContext";
import { getDefaultRouteForRole } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

type SignInState = {
  email: string;
  password: string;
};

export default function SigninWithPassword() {
  const { login } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<SignInState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(data.email, data.password);
      router.replace(getDefaultRouteForRole(user.role));
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-dark dark:text-white"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-dark dark:text-white"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-danger/20 bg-danger/[0.08] px-4 py-3 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}