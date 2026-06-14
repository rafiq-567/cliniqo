import { connectDB } from "@/lib/mongodb";
import Bed from "../../../../models/Bed";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const bed = await Bed.find({});
        return NextResponse.json(bed)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Fetch Data' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const bed = await Bed.create(body);
        return NextResponse.json(bed, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed to Create Data' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const { id, ...updateData } = body;
        const updated = await Bed.findByIdAndUpdate(id, updateData, { new: true })
        return NextResponse.json(updated)
    } catch (error){
        console.log(error)
        return NextResponse.json({message: 'Failed to Update Data'}, {status: 500})
    }
}