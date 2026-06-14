import { connectDB } from "@/lib/mongodb";
import Notification from "../../../../../models/Notification";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    try {
        await connectDB();
        const { id } = await params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return NextResponse.json({ message: 'Notification not Found' }, { status: 404 })
        }

        return NextResponse.json(notification)
    } catch (error) {
        console.log("GET single notification error:", error)
        return NextResponse.json({ message: 'Failed to Fetch Notification' }, { status: 500 })
    }

}

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const updatedNotification = await Notification.findByIdAndUpdate(id, body, { new: true });
        if (!updatedNotification) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }

        return NextResponse.json(updatedNotification);
    } catch (error) {
        console.error("PUT Notification Error:", error);
        return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedNotification = await Notification.findByIdAndDelete(id);

        if (!deletedNotification) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error("DELETE Notification Error:", error);
        return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
    }
}