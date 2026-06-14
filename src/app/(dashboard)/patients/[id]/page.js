"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"

export default function PatientProfilePage({ params }) {
    // In newer Next.js versions, we unwrap params using React.use()
    const { id } = use(params) 
    
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetching data from your dynamic API route using the ID
        fetch(`/api/patients/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Patient not found")
                return res.json()
            })
            .then(data => {
                setPatient(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="p-6 text-center text-slate-500">Loading profile...</div>
    if (!patient) return <div className="p-6 text-center text-red-500">Patient profile not found.</div>

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm border border-slate-200 rounded-xl mt-6">
            {/* Back Button */}
            <Link href="/patients" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
                ← Back to Directory
            </Link>

            {/* Header section */}
            <div className="border-b border-slate-100 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-slate-800">{patient.name}</h1>
                <p className="text-slate-500 text-sm">{patient.email} • {patient.phone}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="bg-slate-50 p-4 rounded-lg">
                    <h2 className="font-semibold text-slate-700 mb-2 border-b pb-1">Medical Details</h2>
                    <p className="text-sm text-slate-600"><strong className="text-slate-800">Gender:</strong> <span className="capitalize">{patient.gender}</span></p>
                    <p className="text-sm text-slate-600 mt-1"><strong className="text-slate-800">Blood Group:</strong> {patient.bloodGroup || 'N/A'}</p>
                </div>

                {/* Address Info */}
                <div className="bg-slate-50 p-4 rounded-lg">
                    <h2 className="font-semibold text-slate-700 mb-2 border-b pb-1">Home Address</h2>
                    {patient.address ? (
                        <p className="text-sm text-slate-600">
                            {patient.address.street},<br />
                            {patient.address.city}, {patient.address.state} - {patient.address.zip}
                        </p>
                    ) : (
                        <p className="text-sm text-slate-400">No address listed.</p>
                    )}
                </div>

                {/* Emergency Contact */}
                <div className="bg-slate-50 p-4 rounded-lg md:col-span-2">
                    <h2 className="font-semibold text-slate-700 mb-2 border-b pb-1">Emergency Contact</h2>
                    {patient.emergencyContact ? (
                        <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
                            <p><strong className="text-slate-800">Name:</strong> {patient.emergencyContact.name}</p>
                            <p><strong className="text-slate-800">Relationship:</strong> <span className="capitalize">{patient.emergencyContact.relation}</span></p>
                            <p><strong className="text-slate-800">Phone:</strong> {patient.emergencyContact.phone}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400">No emergency contact information provided.</p>
                    )}
                </div>
            </div>
        </div>
    )
}