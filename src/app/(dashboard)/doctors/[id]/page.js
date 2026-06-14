"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"

export default function DoctorProfilePage({ params }) {
    // 1. Always unwrap your URL params at the very top of your component function
    const { id } = use(params)

    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 2. Fixed the broken promise chain and handling of 'res'
        fetch(`/api/doctors/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Doctor not found")
                return res.json()
            })
            .then(data => {
                setDoctor(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="p-6 text-center text-slate-500">Loading profile...</div>
    // 3. Fixed copy-paste variable typo from 'patient' to 'doctor'
    if (!doctor) return <div className="p-6 text-center text-red-500">Doctor profile not found.</div>

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Back to main list directory button */}
            <Link href="/doctors" className="text-sm text-blue-600 hover:underline mb-6 inline-block font-medium">
                ← Back to Doctors Directory
            </Link>

            {/* Main Doctor Badge Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-slate-900">Dr. {doctor.first_name} {doctor.last_name}</h1>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            doctor.is_active ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500"
                        }`}>
                            {doctor.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <p className="text-lg font-medium text-blue-600 mt-1">{doctor.specialty}</p>
                    <p className="text-sm text-slate-500 mt-2">⭐ {doctor.rating} Rating • {doctor.years_of_experience} Years Experience</p>
                </div>

                {/* Contact Sub-Card */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 w-full md:w-auto">
                    <p className="font-semibold text-slate-700 mb-1">Contact Details</p>
                    <p>📧 {doctor.contact_info?.email}</p>
                    <p className="mt-1">📞 {doctor.contact_info?.phone}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Availability Section */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Weekly Schedule</h2>
                    <div className="text-sm">
                        <p className="text-slate-500 mb-2">Available Days:</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {doctor.availability?.days?.map((day) => (
                                <span key={day} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                                    {day}
                                </span>
                            ))}
                        </div>
                        <p className="text-slate-500">Working Hours:</p>
                        <p className="text-slate-800 font-medium mt-0.5">
                            ⏰ {doctor.availability?.hours?.start} - {doctor.availability?.hours?.end}
                        </p>
                    </div>
                </div>

                {/* Education Section */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Education & Credentials</h2>
                    <div className="relative border-l-2 border-slate-100 pl-4 space-y-4 text-sm">
                        {doctor.education?.map((edu, idx) => (
                            <div key={idx} className="relative">
                                {/* Small absolute indicator dot */}
                                <div className="absolute -left-[21px] top-1.5 bg-blue-500 h-2 w-2 rounded-full ring-4 ring-white" />
                                <p className="font-semibold text-slate-800">{edu.degree} — {edu.institution}</p>
                                <p className="text-xs text-slate-400">Graduated {edu.year_graduated}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}