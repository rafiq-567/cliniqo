import { connectDB } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import MedicalRecord from "../../../../models/MedicalRecord";

export async function GET() {
    try {
        await connectDB();
        const medicalRecords = await MedicalRecord.find({});
        return NextResponse.json(medicalRecords)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Fetch Data' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const medicalRecord = await MedicalRecord.create(body);
        return NextResponse.json(medicalRecord, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Create Record' }, { status: 500 })
    }
}

