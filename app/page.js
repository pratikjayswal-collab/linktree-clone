"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")
  const createTree = () => {
    
    router.push(`/generate?handle=${text}`)
  }
  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex mt-16 justify-center flex-col ml-[7vw] gap-4">
          <p className="text-[#d2e823] font-extrabold text-7xl">Everything you are. In one, simple link in bio.</p>
          <p className="text-[#d2e823] text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">

            <input value={text} onChange={(e) => {setText(e.target.value)}} className="text-xl focus:outline-green-800 placeholder:text-gray-500 font-medium rounded-lg p-3 pr-8" type="text" placeholder="Enter Your Handle"/>
            <button onClick={() => {createTree()}} className="bg-[#e9c0e9] rounded-full p-8 py-5 text-xl">Claim your Bittree</button>
          </div>
        </div>
        <div className="flex justify-end flex-col mr-[3vw] mt-[5vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-[#e9c0e9] min-h-[100vh]">

      </section>
    </main>
  );
}
