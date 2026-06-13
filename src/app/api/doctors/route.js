import { connectDB } from "@/lib/mongodb";
import Doctor from "../../../../models/Doctor";

export async function GET() {
    await connectDB();
    const doctors = await Doctor.find({})
}