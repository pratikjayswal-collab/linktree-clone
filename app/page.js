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
  <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-1 md:grid-cols-2">
    <div className="flex mt-32 md:mt-16 justify-center flex-col mx-6 md:ml-[7vw] gap-4">
      <p className="text-[#d2e823] font-extrabold text-4xl md:text-7xl">Everything you are. In one, simple link in bio.</p>
      <p className="text-[#d2e823] text-lg md:text-xl my-2 md:my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
      <div className="input flex flex-col sm:flex-row gap-3 sm:gap-2">
        <input value={text} onChange={(e) => {setText(e.target.value)}} className="text-lg md:text-xl focus:outline-green-800 placeholder:text-gray-500 font-medium rounded-lg p-3 pr-8" type="text" placeholder="Enter Your Handle"/>
        <button onClick={() => {createTree()}} className="bg-[#e9c0e9] rounded-full p-4 sm:p-8 sm:py-5 text-lg md:text-xl">Claim your Bittree</button>
      </div>
    </div>
    <div className="flex justify-center md:justify-end flex-col mx-auto md:mr-[3vw] mt-6 md:mt-[5vw]">
      <img className="w-full md:w-auto" src="/home.png" alt="homepage image" />
    </div>
  </section>
  
  <section className="bg-[#e9c0e9] min-h-[100vh] grid grid-cols-1 md:grid-cols-2">
    <div className="flex justify-center md:justify-end order-2 md:order-1 p-4 md:p-16 flex-col mx-auto md:ml-[3vw] mt-6 md:mt-[5vw]">
      <img className="w-full md:w-auto" src="/home2.png" alt="homepage image" />
    </div>

    <div className="flex mt-8 md:mt-16 items-center justify-center flex-col mx-6 md:mr-[7vw] gap-4 order-1 md:order-2">
      <p className="text-[#502274] font-extrabold text-4xl md:text-7xl">Create and customize your Linktree in minutes</p>
      <p className="text-[#502274] text-lg md:text-xl my-2 md:my-4">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
      <div className="input">
        <button onClick={() => {createTree()}} className="bg-[#502274] font-semibold text-white rounded-full p-4 sm:p-8 sm:py-5 text-lg md:text-xl">Claim your Bittree</button>
      </div>
    </div>

  </section>

  <section className="footer min-h-[70vh] md:min-h-screen flex flex-col items-center">
    <div className='text-[#e9c0e9] font-extrabold px-4 md:px-[25vw] text-3xl md:text-5xl text-center pt-16 md:pt-32'>
      Jumpstart your corner of the internet today
    </div>

    <div className="input flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6 md:mt-10 px-4">
      <input value={text} onChange={(e) => {setText(e.target.value)}} className="text-lg md:text-xl focus:outline-green-800 placeholder:text-gray-500 font-medium rounded-lg p-3 pr-8" type="text" placeholder="Enter Your Handle"/>
      <button onClick={() => {createTree()}} className="bg-yellow-300 rounded-full p-4 sm:p-8 sm:py-5 text-lg md:text-xl">Claim your Bittree</button>
    </div>

    <div className="box mt-10 md:mt-20 w-[80vw] md:w-[60vw] h-[30vw] md:h-[18vw] bg-[#e9c0e9] text-[#420f75] text-[15vw] md:text-[11vw] font-semibold flex justify-center items-center rounded-3xl">
      BitTree
      <img className="size-20 md:size-36" src="/tree2.svg" alt="" />
    </div>
  </section>
</main>
  );
}
