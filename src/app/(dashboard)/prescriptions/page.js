"use client"

import { useEffect, useState } from "react"

export default function PrescriptionsPage() {
    const [prescriptions, setPrescriptions] = useState([])

    useEffect(() => {
        fetch('/api/prescriptions').then(res => res.json()).then(data => setPrescriptions(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Prescriptions</h1>
            <p className="text-sm text-slate-500 mb-6">Pharmacy dispatches and medication records</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prescriptions.map((p) => (
                    <div key={p._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between border-b pb-3 mb-3">
                            <div>
                                <h3 className="font-bold text-slate-800">{p.patient_name}</h3>
                                <p className="text-xs text-slate-400">By: Dr. {p.doctor_name}</p>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{p.date}</span>
                        </div>
                        <div className="space-y-2">
                            {p.medications?.map((m, i) => (
                                <div key={i} className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded">
                                    <span className="font-medium text-slate-800">{m.name} <span className="text-xs text-slate-400 font-normal">({m.strength})</span></span>
                                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">{m.dosage} • {m.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}