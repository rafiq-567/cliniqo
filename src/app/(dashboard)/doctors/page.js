"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch('/api/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Doctors Directory</h1>
                    <p className="text-sm text-slate-500">Manage hospital staff and schedules</p>
                </div>
                <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                    Total: {doctors.length} Doctors
                </span>
            </div>

            {/* Table wrapper card */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">Doctor</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Specialty</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Phone</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Experience</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Rating</th>
                            <th className="p-4 text-center font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {doctors.map((d) => (
                            <tr key={d._id} className="hover:bg-slate-50 transition-colors">
                                {/* Combined First + Last Name & Nested Email */}
                                <td className="p-4 font-medium text-slate-900">
                                    <div>Dr. {d.first_name} {d.last_name}</div>
                                    <div className="text-xs text-slate-400 font-normal">
                                        {d.contact_info?.email || "No email listed"}
                                    </div>
                                </td>

                                {/* Specialty */}
                                <td className="p-4 text-slate-600">
                                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold">
                                        {d.specialty}
                                    </span>
                                </td>

                                {/* Nested Phone */}
                                <td className="p-4 text-slate-600">
                                    {d.contact_info?.phone || "N/A"}
                                </td>

                                {/* Years of Experience */}
                                <td className="p-4 text-slate-600">
                                    {d.years_of_experience} Years
                                </td>

                                {/* Rating Metric */}
                                <td className="p-4 text-slate-600 font-medium">
                                    ⭐ {d.rating || "N/A"}
                                </td>

                                {/* Link to dynamic profile page */}
                                <td className="p-4 text-center">
                                    <Link
                                        href={`/doctors/${d._id}`}
                                        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1.5 px-3 rounded-md transition-colors inline-block"
                                    >
                                        View Profile
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {/* Fallback empty state */}
                        {doctors.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-slate-400">
                                    No doctors found in the database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}