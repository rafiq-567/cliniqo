"use client"

import { useEffect, useState } from "react"

export default function StaffsPage() {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        fetch('/api/staffs').then(res => res.json()).then(data => setStaff(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Hospital Staff Directory</h1>
            <p className="text-sm text-slate-500 mb-6">Manage nursing, administration, and support units</p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">Name</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Role Duty</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Department</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {staff.map((s) => (
                            <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-900">
                                    <div>{s.name}</div>
                                    <div className="text-xs text-slate-400 font-normal">{s.email}</div>
                                </td>
                                <td className="p-4 text-slate-700 font-medium capitalize">{s.role || "Staff"}</td>
                                <td className="p-4 text-slate-500">{s.department || "General Operations"}</td>
                                <td className="p-4 text-slate-600 font-mono">{s.phone || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}