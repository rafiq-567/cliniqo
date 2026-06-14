"use client"

import { useEffect, useState } from "react"

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch('/api/notifications').then(res => res.json()).then(data => setNotifications(data))
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">System Notifications</h1>
                <button 
                    onClick={() => setNotifications([])} 
                    className="text-xs text-red-600 hover:bg-red-50 font-medium px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
                >
                    Dismiss All
                </button>
            </div>

            <div className="space-y-3">
                {notifications.map((n) => (
                    <div key={n._id} className={`p-4 rounded-xl border flex gap-3 items-start shadow-sm transition-all bg-white ${
                        n.priority === 'high' ? 'border-l-4 border-l-red-500 border-slate-200' : 'border-l-4 border-l-blue-500 border-slate-200'
                    }`}>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-semibold text-slate-800 text-sm">{n.title}</h3>
                                <span className="text-xs text-slate-400 font-mono">{n.time_ago || "Just Now"}</span>
                            </div>
                            <p className="text-sm text-slate-600">{n.message}</p>
                        </div>
                    </div>
                ))}
                {notifications.length === 0 && (
                    <div className="text-center p-12 border border-dashed rounded-xl bg-white text-slate-400">
                        🔔 All caught up! No unread notifications.
                    </div>
                )}
            </div>
        </div>
    )
}