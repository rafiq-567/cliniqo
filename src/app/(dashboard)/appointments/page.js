"use client"

import { useEffect, useState } from "react"

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch('/api/appointments').then(res => res.json()).then(data => setAppointments(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
                    <p className="text-sm text-slate-500">Manage patient bookings and visit statuses</p>
                </div>
                <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                    Total: {appointments.length} Scheduled
                </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">Patient</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Doctor</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Date & Time</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Reason</th>
                            <th className="p-4 text-center font-semibold text-slate-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {appointments.map((a) => (
                            <tr key={a._id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-900">{a.patient_name || "N/A"}</td>
                                <td className="p-4 text-slate-600">Dr. {a.doctor_name || "N/A"}</td>
                                <td className="p-4 text-slate-600">{a.date} at {a.time}</td>
                                <td className="p-4 text-slate-500">{a.reason || "General Checkup"}</td>
                                <td className="p-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                        a.status === 'confirmed' ? 'bg-green-50 text-green-700 border border-green-200' : 
                                        a.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'bg-red-50 text-red-700'
                                    }`}>
                                        {a.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {appointments.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-400">No appointments scheduled today.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}