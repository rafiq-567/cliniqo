import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Prescription from "../../../../models/Prescription";

export async function GET() {
    try {
        await connectDB();
        const prescriptions = await Prescription.find({});
        return NextResponse.json(prescriptions)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Fetch Prescriptions' }, { status: 500 })
    }

}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const prescription = await Prescription.create(body);
        return NextResponse.json(prescription, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Prescription' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const {id, ...updateData} = body;

        const updated = await Prescription.findByIdAndUpdate(id, updateData, { new: true })
        if (!updated) {
            return NextResponse.json({ error: 'Prescription not Found' }, { status: 404 });
        }
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Data' }, { status: 500 })
    }

}
