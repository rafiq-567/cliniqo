import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Department from "../../../../models/Department";

export async function GET() {
    try {
        await connectDB();
        const departments = await Department.find({});
        return NextResponse.json(departments)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Fetch Departments' }, { status: 500 })
    }

}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const department = await Department.create(body);
        return NextResponse.json(department, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Department' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const {id, ...updateData} = body;

        const updated = await Department.findByIdAndUpdate(id, updateData, { new: true })
        if (!updated) {
            return NextResponse.json({ error: 'Department not found' }, { status: 404 });
        }
        return NextResponse.json(updated)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to Create Data' }, { status: 500 })
    }

}
