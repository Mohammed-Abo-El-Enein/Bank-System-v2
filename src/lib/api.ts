"use client";

const FALLBACK_API_URL = "http://127.0.0.1:8000/api";

function normalizeEndpoint(endpoint: string) {
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
}

function resolveApiBaseUrl() {
  const envBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!envBaseUrl) {
    return FALLBACK_API_URL;
  }

  const normalizedBaseUrl = envBaseUrl.replace(/\/+$/, "");

  return normalizedBaseUrl.endsWith("/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
}

function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = new Headers(options.headers);
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  headers.set("Accept", "application/json");

  if (!isFormData && options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(
    `${resolveApiBaseUrl()}${normalizeEndpoint(endpoint)}`,
    {
      ...options,
      headers,
    },
  );

  if (response.status === 401) {
    clearSession();

    if (typeof window !== "undefined") {
      window.location.replace("/auth/login");
    }

    throw new Error("Session expired. Please sign in again.");
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Server returned non-JSON response:", text);
    throw new Error("Unexpected server response.");
  }

  const data = (await response.json()) as {
    message?: string;
    error?: string;
  } & T;

  if (!response.ok) {
    throw new Error(data.message || data.error || "API request failed.");
  }

  return data;
}