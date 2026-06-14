import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Staff from "../../../../models/Staff";

export async function GET() {
    try {
        await connectDB();
        const staffs = await Staff.find({});
        return NextResponse.json(staffs)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Fetch Staffs' }, { status: 500 })
    }

}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const staff = await Staff.create(body);
        return NextResponse.json(staff, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Staffs' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const {id, ...updateData} = body;

        const updated = await Staff.findByIdAndUpdate(id, updateData, { new: true })
        if (!updated) {
            return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
        }
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Data' }, { status: 500 })
    }

}
