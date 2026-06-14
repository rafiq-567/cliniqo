"use client"

import { useEffect, useState } from "react"

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        fetch('/api/invoices').then(res => res.json()).then(data => setInvoices(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Billing & Invoices</h1>
            <p className="text-sm text-slate-500 mb-6">Patient accounting records and clearance logs</p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">Invoice ID</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Patient</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Issue Date</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Total Amount</th>
                            <th className="p-4 text-center font-semibold text-slate-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {invoices.map((inv) => (
                            <tr key={inv._id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono text-xs font-semibold text-slate-500">#{inv._id?.substring(0,8).toUpperCase()}</td>
                                <td className="p-4 font-medium text-slate-900">{inv.patient_name}</td>
                                <td className="p-4 text-slate-500">{inv.date_issued}</td>
                                <td className="p-4 text-slate-900 font-bold">${inv.total_amount?.toLocaleString() || "0.00"}</td>
                                <td className="p-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                        inv.status === 'paid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                        {inv.status}
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