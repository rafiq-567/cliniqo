import { connectDB } from "@/lib/mongodb";
import Invoice from "../../../../models/Invoice";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const invoices = await Invoice.find({});
        return NextResponse.json(invoices)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Fetch Invoices' }, { status: '500' })
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const invoice = await Invoice.create(body);
        return NextResponse.json(invoice, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to Create Invoice' }, { status: '500' })
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id, ...updateData } = body;
        const updated = await Invoice.findByIdAndUpdate(id, updateData, {new: true})
        return NextResponse.json(updated)
    } catch(error){
        console.log(error)
        return NextResponse.json({message: 'Failed to Update Data'}, {status: 500})
    }
}