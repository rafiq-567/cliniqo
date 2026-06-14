import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Appointment from "../../../../models/Appointment";

export async function GET() {
    try {
        await connectDB();
        const appointments = await Appointment.find({});
        return NextResponse.json(appointments)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Fetch Data' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const appointment = await Appointment.create(body);
        return NextResponse.json(appointment, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Data' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        const updated = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Update Data' }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const body = await req.json();
        await Appointment.findByIdAndDelete(body.id)
        return NextResponse.json({message: 'Deleted Successfully'})
    } catch (error){
        console.log(error)
        return NextResponse.json({error: 'Failed to Delete Appointment'}, { status: 500 })
    }
}