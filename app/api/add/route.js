import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    try {
        const body = await request.json()
        const client = await clientPromise
        const db = client.db("bittree")
        const collection = db.collection("links")

        const doc = await collection.findOne({handle: body.handle})

        if(doc){
            return Response.json({
                success: false, 
                error: true, 
                message: 'This Bittree already exists!', 
                result: null 
            })
        }

        const result = await collection.insertOne(body)

        return Response.json({
            success: true, 
            error: false, 
            message: 'Your Bittree has been generated!', 
            result: result 
        })
    } catch (error) {
        console.error("Database operation failed:", error);
        return Response.json({
            success: false,
            error: true,
            message: 'Failed to process your request. Please try again later.',
            errorDetail: error.message
        }, { status: 500 })
    }
}