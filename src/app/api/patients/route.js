import { connectDB } from "@/lib/mongodb";
import Patient from "../../../../models/Patient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const patients = await Patient.find({});
        return NextResponse.json(patients)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Fetch Patients' }, { status: 500 })
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
        return NextResponse.json({ error: 'Failed to Create Patient' })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const patient = await Patient.findByIdAndUpdate(id, updateData, { new: true })
        if (!updated) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
        }
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Data' })
    }

}

export async function DELETE(req) {
    try {
        await connectDB();
        const body = await req.json();
        await Patient.findByIdAndDelete(body.id)
        return NextResponse.json({ message: 'Deleted Successfully' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Delete Data' }, { status: 500 })
    }
}