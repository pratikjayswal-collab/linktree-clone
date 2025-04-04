"use client"
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function GenerateContent() {
  const searchParams = useSearchParams()  
  const router = useRouter()
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [handle, setHandle] = useState(searchParams.get('handle') )
  const [pic, setPic] = useState("")
  const [desc, setDesc] = useState("")

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) =>{
        if(index == i){
          return {link, linktext}
        }else{
          return item
        }
      })
    })
  }
  
  const addLink = () => {
    setLinks(links.concat([{link: "", linktext: ""}]))
  }
  
  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "links": links,
      "handle": handle, 
      "pic": pic,
      "desc": desc
    });

    console.log(raw);
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    const r = await fetch("/api/add", requestOptions)
    const result = await r.json()

    if(result.success){
      toast.success(result.message)
      setHandle("")
      setLinks([])
      setPic("")
      setDesc("")
      router.push(`/${handle}`)
    }else{
      toast.error(result.message)
    }
  }

  return (
    <div className='min-h-screen pt-[8vh] bg-[#225ac0] lg:grid lg:grid-cols-2 flex flex-col px-5  '>
      {/* Form column - responsive adjustments */}
      <div className="col1 lg:mt-36 mt-8 flex justify-start items-center flex-col px-4 lg:px-0">
        <div className='flex flex-col gap-5 my-8 text-gray-900 w-full max-w-xl'>
          <h1 className='font-bold text-3xl lg:text-4xl text-center lg:text-left'>Create your Bittree</h1>
          <div className="item">
            <h2 className='font-medium text-lg lg:text-xl'>Step 1 : Claim your Handle</h2>
            <div className='mx-0 lg:mx-4'>
              <input 
                value={handle} 
                onChange={(e) => {setHandle(e.target.value)}} 
                className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400 w-full lg:w-auto' 
                type="text" 
                placeholder='Choose Handle' 
              />
            </div>
          </div>

          <div className="item">
            <h2 className='font-medium text-lg lg:text-xl'>Step 2 : Add Links</h2>

            {links && links.map((item, index) => {
              return (
                <div key={index} className='mx-0 my-1 lg:mx-4 flex md:flex-col lg:flex-row'>
                  <input 
                    value={item.linktext} 
                    onChange={(e) => {handleChange(index, item.link, e.target.value)}} 
                    className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400 w-full' 
                    type="text" 
                    placeholder='Enter link text' 
                  />
                  <input 
                    value={item.link} 
                    onChange={(e) => {handleChange(index, e.target.value, item.linktext)}} 
                    className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400 w-full' 
                    type="text" 
                    placeholder='Enter link' 
                  />
                </div>
              )
            })}
            
            <button 
              onClick={() => {addLink()}} 
              className='mx-2 px-5 py-2 rounded-3xl font-semibold bg-[#261e89] hover:bg-blue-950 text-white'
            >
              + Add Link
            </button>
          </div>

          <div className="item flex flex-col items-center lg:items-start md:items-start sm:items-start">
            <h2 className='font-medium text-lg lg:text-xl'>Step 3 : Add Picture and Description</h2>
            <div className='mx-0 lg:mx-4 flex flex-col items-center lg:items-start sm:items-start'>
              <input 
                value={pic} 
                onChange={(e) => {setPic(e.target.value)}} 
                className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400 w-full' 
                type="text" 
                placeholder='Enter link of your Picture' 
              />
              <input 
                value={desc} 
                onChange={(e) => {setDesc(e.target.value)}} 
                className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400 w-full' 
                type="text" 
                placeholder='Enter description' 
              />
              <button 
                disabled={pic == "" || handle == "" || links[0].linktext == "" || desc == ""} 
                onClick={() => {submitLinks()}} 
                className='mx-2 px-5 py-2 w-fit rounded-3xl font-semibold disabled:bg-[#636091] bg-[#261e89] hover:bg-blue-950 text-white'
              >
                Create Bittree
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image column - hide on smaller screens */}
      <div className="col2 hidden lg:block w-full h-screen ml-0 lg:ml-24 bg-[#225ac0]">
        <img className='h-full' src="/generate.png" alt="Generate your links" />
      </div>
      
      {/* Toast container - fixed position for all screen sizes */}
      <ToastContainer position="bottom-center" />
    </div>
  )
}

const Generate = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#225ac0] flex justify-center items-center">Loading...</div>}>
      <GenerateContent />
    </Suspense>
  )
}

export default Generate