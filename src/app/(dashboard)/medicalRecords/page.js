"use client"

import { useEffect, useState } from "react"

export default function MedicalRecordsPage() {
    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch('/api/medicalRecords').then(res => res.json()).then(data => setRecords(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Electronic Medical Records (EMR)</h1>
            <p className="text-sm text-slate-500 mb-6">Secure clinical charts and patient case files</p>

            <div className="space-y-4">
                {records.map((r) => (
                    <div key={r._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h2 className="text-base font-bold text-slate-800">{r.patient_name}</h2>
                                <p className="text-xs text-slate-400">Record ID: {r._id}</p>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">{r.date}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                            <div className="bg-slate-50 p-3 rounded-lg"><strong className="text-slate-700 block mb-1">Diagnosis:</strong> <span className="text-red-700 font-medium">{r.diagnosis}</span></div>
                            <div className="bg-slate-50 p-3 rounded-lg"><strong className="text-slate-700 block mb-1">Physician Notes:</strong> <span className="text-slate-600">{r.notes || "No added comments."}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}