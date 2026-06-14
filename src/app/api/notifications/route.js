import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Notification from "../../../../models/Notification";

export async function GET() {
    try {
        await connectDB();
        const notifications = await Notification.find({});
        return NextResponse.json(notifications)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Fetch Notifications' }, { status: 500 })
    }

}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const notification = await Notification.create(body);
        return NextResponse.json(notification, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Notification' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const {id, ...updateData} = body;

        const updated = await Notification.findByIdAndUpdate(id, updateData, { new: true })
        if (!updated) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Data' }, { status: 500 })
    }

}

export async function DELETE(req) {
    try {
        await connectDB();
        const body = await req.json();
        await Notification.findByIdAndDelete(body.id)
        return NextResponse.json({ message: 'Deleted Successfully' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Delete Data' }, { status: 500 })
    }
}