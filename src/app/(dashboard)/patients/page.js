"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function PatientsPage() {
    const [patients, setPatients] = useState([])

    useEffect(() => {
        fetch('/api/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
    }, [])

    // Helper function to turn a DOB string into a clean Age number
    const calculateAge = (dobString) => {
        if (!dobString) return "N/A";
        const birthDate = new Date(dobString);
        const difference = Date.now() - birthDate.getTime();
        const ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Patients Directory</h1>
                <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                    Total: {patients.length} Patients
                </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="w-full text-sm border-collapse bg-white">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">Name</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Age</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Gender</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Phone</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Blood Group</th>
                            <th className="p-4 text-center font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {patients.map(p => (
                            <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                                {/* Name & Email Stacked */}
                                <td className="p-4 font-medium text-slate-900">
                                    <div>{p.name}</div>
                                    <div className="text-xs text-slate-400 font-normal">{p.email}</div>
                                </td>

                                {/* Age Column */}
                                <td className="p-4 text-slate-600">
                                    {calculateAge(p.dob?.$date || p.dob)} Yrs
                                </td>

                                {/* Styled Gender Badge */}
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${p.gender === 'male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                                        }`}>
                                        {p.gender}
                                    </span>
                                </td>

                                <td className="p-4 text-slate-600">{p.phone}</td>

                                <td className="p-4">
                                    <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded font-semibold text-xs">
                                        {p.bloodGroup || 'N/A'}
                                    </span>
                                </td>

                                {/* View Details Button */}
                                <td className="p-4 text-center">
                                    <Link
                                        href={`/patients/${p._id}`}
                                        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-1.5 px-3 rounded transition-colors inline-block"
                                    >
                                        View Profile
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}