import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Notification from "../../../../../models/Notification";




export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params; 
        
        const data = await Notification.findById(id);
        
        if (!data) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        
        const updatedData = await Notification.findByIdAndUpdate(id, body, { new: true });
        
        if (!updatedData) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        
        return NextResponse.json(updatedData);
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        
        const deletedData = await Notification.findByIdAndDelete(id);
        
        if (!deletedData) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}