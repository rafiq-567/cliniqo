"use client"

import { useEffect, useState } from "react"

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        fetch('/api/departments').then(res => res.json()).then(data => setDepartments(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Hospital Departments</h1>
            <p className="text-sm text-slate-500 mb-6">Overview of clinical modules and operations</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <div key={dept._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-bold text-slate-800">{dept.name}</h2>
                                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">Bldg {dept.block || "A"}</span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4"><strong className="text-slate-700">Head:</strong> Dr. {dept.head_doctor}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
                            <span>👥 {dept.staff_count} Staff Members</span>
                            <span>🛏️ {dept.total_beds} Beds Assigned</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}