"use client";

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://127.0.0.1:8000/api${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    }
  );

  // لو Unauthorized → رجع login
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  const contentType = response.headers.get("content-type");

  // لو الرد مش JSON (غالباً HTML error)
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Server returned non-JSON response:", text);
    throw new Error("Server Error");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
}