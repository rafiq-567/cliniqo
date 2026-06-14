"use client"

import { useEffect, useState } from "react"

export default function PatientsPage() {
    const [patients, setPatients] = useState([])

    useEffect(() => {
        fetch('/api/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-center mb-6 text-2xl font-semibold">Patients Table</h1>
            
            {/* Added border-collapse to clean up borders */}
            <table className="w-full text-sm border-collapse border border-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        {/* Added text-left and padding (p-3) */}
                        <th className="border border-slate-200 p-3 text-left font-semibold text-slate-700">Name</th>
                        <th className="border border-slate-200 p-3 text-left font-semibold text-slate-700">Phone</th>
                        <th className="border border-slate-200 p-3 text-left font-semibold text-slate-700">Gender</th>
                        <th className="border border-slate-200 p-3 text-left font-semibold text-slate-700">Blood Group</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(p => (
                        <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                            {/* Added identical padding (p-3) so it aligns perfectly with the headers */}
                            <td className="border border-slate-200 p-3 text-slate-600">{p.name}</td>
                            <td className="border border-slate-200 p-3 text-slate-600">{p.phone}</td>
                            <td className="border border-slate-200 p-3 text-slate-600">{p.gender}</td>
                            <td className="border border-slate-200 p-3 text-slate-600">{p.bloodGroup}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}