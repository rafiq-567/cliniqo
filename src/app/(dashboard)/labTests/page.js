"use client"

import { useEffect, useState } from "react"

export default function LabTestsPage() {
    const [tests, setTests] = useState([])

    useEffect(() => {
        fetch('/api/labTests').then(res => res.json()).then(data => setTests(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Laboratory Reports</h1>
            <p className="text-sm text-slate-500 mb-6">Pathology, diagnostic tests, and scan outcomes</p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">Patient</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Test Type</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Lab Tech</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Result Metric</th>
                            <th className="p-4 text-center font-semibold text-slate-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tests.map((t) => (
                            <tr key={t._id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-900">{t.patient_name}</td>
                                <td className="p-4 text-slate-700 font-medium">{t.test_name}</td>
                                <td className="p-4 text-slate-500">{t.technician_name || "Main Lab"}</td>
                                <td className="p-4 text-slate-600 font-mono text-xs">{t.result_value || "Pending Analysis"}</td>
                                <td className="p-4 text-center">
                                    <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                                        t.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                    }`}>
                                        {t.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}