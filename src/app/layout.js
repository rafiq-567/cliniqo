"use client"; // Required to track the current active URL path

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to check which page is open

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono-", subsets: ["latin"] });

const navLinks = [
  // 💡 Adjust "/" to "/dashboard" if your dashboard file is inside a dashboard folder
  { href: "/", label: "Dashboard" }, 
  { href: "/patients", label: "Patients" },
  { href: "/doctors", label: "Doctors" },
  { href: "/appointments", label: "Appointments" },
  { href: "/medicalRecords", label: "Medical Records" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/labTests", label: "Lab Tests" },
  { href: "/beds", label: "Beds" },
  { href: "/invoices", label: "Invoices" },
  { href: "/departments", label: "Departments" },
  { href: "/staffs", label: "Staff" },
  { href: "/notifications", label: "Notifications" },
];

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current URL path

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="h-full flex overflow-hidden bg-gray-50 text-slate-900">

        {/* Sidebar Panel */}
        <aside className="w-60 h-full bg-gray-900 text-white flex flex-col shrink-0 border-r border-gray-800">
          <div className="p-5 text-xl font-bold tracking-wide border-b border-gray-800 text-blue-400">
            Cliniqo
          </div>
          
          {/* Scrollable Nav list if you add even more items later */}
          <nav className="flex-1 flex flex-col p-3 gap-1 overflow-y-auto no-scrollbar">
            {navLinks.map((link) => {
              // Check if this specific link matches the active browser path
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white" // Highlithed styles for active page
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Independent Main Content Canvas */}
        <main className="flex-1 h-full overflow-y-auto p-8">
          {children}
        </main>

      </body>
    </html>
  );
}