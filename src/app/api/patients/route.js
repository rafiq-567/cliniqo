import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Patient from "../../../../models/Patient";

export async function GET() {
    try {
        await connectDB();
        const patients = await Patient.find({});
        return NextResponse.json(patients)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const patient = await Patient.create(body);
        return NextResponse.json(patient, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        const updated = await Patient.findByIdAndUpdate(id, updateData, { new: true })
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Update' }, { status: 500 })
    }
}