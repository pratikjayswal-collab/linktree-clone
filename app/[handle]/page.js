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
            <span className="font-bold text-gray-700 text-xl">@{item.handle}</span>
            <span className="decs w-80 text-center">{item.desc}</span>
            <div className="links">
            {item.links.map((item, index) => {
                    return <Link target="_blank" rel="noopener noreferrer" key={index} href = {item.link} > <div className="min-w-[60vw] md:min-w-[40vw] text-center py-4 px-2 my-3 bg-purple-100 rounded-2xl hover:bg-purple-200 border-b-[1.1vh] hover:border-b-[0.7vh] border-gray-800 shadow-gray-500 hover:shadow-xl shadow-2xl">
                         {item.linktext} 
                    </div></Link>
            })}
            </div>
        </div>
        }
    </div>
  }