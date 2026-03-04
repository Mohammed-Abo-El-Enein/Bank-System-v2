// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, loading, hasRole } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         router.push("/auth/login");
//       } else if (!hasRole(["customer"])) {
//         router.push("/access-denied");
//       }
//     }
//   }, [user, loading]);


//   if (loading) return null;

//   return <>{children}</>;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } 
      else if (!hasRole(["customer"])) {
        // لو مش customer رجعه على الداشبورد
        router.push("/dashboard");
      }
    }
  }, [user, loading]);

  if (loading) return null;

  return <>{children}</>;
}