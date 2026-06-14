"use client"

import { useEffect, useState } from "react"

export default function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                    <p className="text-sm text-slate-500">Control system access, roles, and account permissions</p>
                </div>
                <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                    Total: {users.length} Accounts
                </span>
            </div>

            {/* Table wrapper card */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left font-semibold text-slate-700">User Profile</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Username</th>
                            <th className="p-4 text-left font-semibold text-slate-700">System Role</th>
                            <th className="p-4 text-left font-semibold text-slate-700">Last Login</th>
                            <th className="p-4 text-center font-semibold text-slate-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                {/* Name and Email stacked */}
                                <td className="p-4 font-medium text-slate-900">
                                    <div>{u.name}</div>
                                    <div className="text-xs text-slate-400 font-normal">{u.email}</div>
                                </td>

                                {/* Username */}
                                <td className="p-4 text-slate-600 font-mono text-xs">
                                    @{u.username || "n/a"}
                                </td>

                                {/* Role Badges tailored for Hospital roles */}
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                                        u.role === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                        u.role === 'doctor' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                        u.role === 'receptionist' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                                        'bg-slate-100 text-slate-700'
                                    }`}>
                                        {u.role || 'User'}
                                    </span>
                                </td>

                                {/* Last Seen Telemetry */}
                                <td className="p-4 text-slate-500">
                                    {u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never logged in"}
                                </td>

                                {/* Account Access State Toggle display */}
                                <td className="p-4 text-center">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        u.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${u.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {u.is_active ? 'Active' : 'Suspended'}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {/* Fallback layout if database lacks collections */}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-400">
                                    No application users registered.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}