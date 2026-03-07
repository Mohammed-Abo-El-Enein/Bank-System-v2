export const DASHBOARD_ROLES = [
  "super_admin",
  "admin",
  "staff",
  "teller",
] as const;

export const CUSTOMER_ROLES = ["customer"] as const;

export function isDashboardRole(role?: string | null) {
  return DASHBOARD_ROLES.includes(
    (role ?? "") as (typeof DASHBOARD_ROLES)[number],
  );
}

export function isCustomerRole(role?: string | null) {
  return CUSTOMER_ROLES.includes(
    (role ?? "") as (typeof CUSTOMER_ROLES)[number],
  );
}

export function getDefaultRouteForRole(role?: string | null) {
  if (isCustomerRole(role)) {
    return "/client";
  }

  if (isDashboardRole(role)) {
    return "/dashboard";
  }

  return "/auth/login";
}