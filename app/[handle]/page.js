import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    const { handle } = await params
    const client = await clientPromise
    const db = client.db("bittree")
    const collection = db.collection("links")

    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }

    return <div className="flex min-h-screen bg-purple-400 justify-center items-start">
        {item && <div className="photo flex flex-col justify-center items-center my-10 gap-4">
            <img className="h-28 w-28 rounded-full" src= {item.pic} alt="" />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className="decs w-80 text-center">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link key={index} href = {item.link} > <div className="min-w-96 text-center py-4 shadow-2xl px-2 my-3 bg-purple-100">
                         {item.linktext} 
                    </div></Link>
            })}
            </div>
        </div>
        }
    </div>
  }