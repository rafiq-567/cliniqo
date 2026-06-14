"use client"

import { useEffect, useState } from "react"

export default function BedsPage() {
    const [beds, setBeds] = useState([])

    useEffect(() => {
        fetch('/api/beds').then(res => res.json()).then(data => setBeds(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Bed Management</h1>
            <p className="text-sm text-slate-500 mb-6">Real-time room occupancy and Ward capacities</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {beds.map((bed) => (
                    <div key={bed._id} className={`p-4 rounded-xl border transition-all ${
                        bed.is_occupied ? 'bg-red-50/50 border-red-200' : 'bg-green-50/50 border-green-200'
                    }`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg text-slate-800">Bed {bed.bed_number}</span>
                            <span className={`h-2.5 w-2.5 rounded-full ${bed.is_occupied ? 'bg-red-500' : 'bg-green-500'}`} />
                        </div>
                        <p className="text-xs text-slate-500 font-medium">{bed.ward_type} Ward</p>
                        <p className="text-xs text-slate-400 mt-1">Floor: {bed.floor || "1st Floor"}</p>
                        <p className="text-sm font-medium text-slate-700 mt-3 truncate">
                            {bed.is_occupied ? `👤 ${bed.patient_name}` : "✨ Available"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}