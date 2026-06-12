import clientPromise from "@/lib/mongodb";

export async function GET(){
    const client = await clientPromise
    const db = client.db("cliniqo");
    const collection = db.collection("userCollection");

    const data = await collection.find({}).toArray();
    return Response.json(data)
}