import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Cliniqo",
  description: "Hospital Management System",
};

const navLinks = [
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
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex">

        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col">
          <div className="p-4 text-xl font-bold border-b border-gray-700">
            Cliniqo
          </div>
          <nav className="flex flex-col p-2 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded hover:bg-gray-700 text-sm text-gray-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}