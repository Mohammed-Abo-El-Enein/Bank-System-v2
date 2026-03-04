"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DASHBOARD_NAV, NavSection } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } =
    useSidebarContext();
  const { user } = useAuth();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // ✅ فلترة العناصر حسب role
  const NAV_DATA: NavSection[] = useMemo(() => {
    return DASHBOARD_NAV.map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!item.roles) return true;
        return item.roles.includes(user?.role ?? "");
      }),
    }));
  }, [user?.role]);

 const toggleExpanded = (title: string) => {
  setExpandedItems((prev) =>
    prev.includes(title)
      ? prev.filter((item) => item !== title) 
      : [...prev, title] 
  );
};

  // ✅ فتح الـ submenu تلقائيًا حسب الـ route
  useEffect(() => {
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        if (!item.items || item.items.length === 0)
          return false;

        return item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              setExpandedItems([item.title]);
            }
            return true;
          }
          return false;
        });
      });
    });
  }, [pathname, NAV_DATA, expandedItems]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark",
          isMobile
            ? "fixed inset-y-0 z-50"
            : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0"
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          {/* Logo */}
          <div className="relative pr-4.5">
            <Link
              href="/dashboard"
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2"
              >
                <span className="sr-only">
                  Close Menu
                </span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {section.label}
                </h2>

                <nav>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {/* Submenu */}
                        {item.items &&
                        item.items.length > 0 ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(
                                (sub) =>
                                  sub.url === pathname
                              )}
                              onClick={() =>
                                toggleExpanded(
                                  item.title
                                )
                              }
                              className="flex items-center gap-3 py-3"
                            >
                              <item.icon className="size-6 shrink-0" />
                              <span>
                                {item.title}
                              </span>

                              <ChevronUp
                                className={cn(
                                  "ml-auto rotate-180 transition-transform duration-200",
                                  expandedItems.includes(
                                    item.title
                                  ) && "rotate-0"
                                )}
                              />
                            </MenuItem>

                            {expandedItems.includes(
                              item.title
                            ) && (
                              <ul className="ml-9 space-y-1.5 pb-[15px] pt-2">
                                {item.items.map(
                                  (subItem) => (
                                    <li
                                      key={
                                        subItem.title
                                      }
                                    >
                                      <MenuItem
                                        as="link"
                                        href={
                                          subItem.url
                                        }
                                        isActive={
                                          pathname ===
                                          subItem.url
                                        }
                                      >
                                        <span>
                                          {
                                            subItem.title
                                          }
                                        </span>
                                      </MenuItem>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </div>
                        ) : (
                          /* Single Link */
                          <MenuItem
                            as="link"
                            href={item.url ?? "#"}
                            isActive={
                              pathname === item.url
                            }
                            className="flex items-center gap-3 py-3"
                          >
                            <item.icon className="size-6 shrink-0" />
                            <span>
                              {item.title}
                            </span>
                          </MenuItem>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}