import { connectDB } from "@/lib/mongodb";
import LabTest from "../../../../models/LabTest";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const labTests = await LabTest.find({});
        return NextResponse.json(labTests)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Fetch Data' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const labTest = await LabTest.create(body);
        return NextResponse.json(labTest, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Create Test' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        const updated = await LabTest.findByIdAndUpdate(id, updateData,{ new: true })
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Update' }, { status: 500 })
    }
}

