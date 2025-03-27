"use client"
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const Generate = () => {


  const searchParams = useSearchParams()  
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [handle, setHandle] = useState(searchParams.get('handle') )
  const [pic, setPic] = useState("")
  const [desc, setDesc] = useState("")

  const handleChange = (index, link , linktext) => {
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
      "desc":desc
    });

    console.log(raw);
    
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    const r = await fetch("http://localhost:3000/api/add", requestOptions)
    const result = await r.json()

    if(result.success){
      toast.success(result.message)
      setHandle("")
      setLinks([])
      setPic("")
    }else{
      toast.error(result.message)
      
    }

    
  }
  

  return (
    <div className='min-h-screen bg-[#225ac0] grid grid-cols-2'>
      <div className="col1 flex justify-center items-center flex-col">
        <div className='flex flex-col gap-5 my-8 text-gray-900'>
          <h1 className='font-bold text-4xl'>Create your Bittree</h1>
          <div className="item">
            <h2 className='font-medium text-xl'>Step 1 : Claim your Handle</h2>
            <div className='mx-4'>
              <input value={handle} onChange={(e) => {setHandle(e.target.value)}} className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400' type="text" placeholder='Choose Handle' />
            </div>
          </div>

          <div className="item">
            <h2 className='font-medium text-xl'>Step 2 : Add Links</h2>

          {links && links.map((item, index) => {
            return <div key={index} className='mx-4'>
            <input value={item.linktext} onChange={(e) => {handleChange(index , item.link , e.target.value)}} className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400' type="text" placeholder='Enter link text' />
            <input value={item.link} onChange={(e) => {handleChange(index, e.target.value, item.linktext)}} className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400' type="text" placeholder='Enter link' />
          </div>
          })}
            
              <button onClick={() => {addLink()}} className='mx-2 px-5 py-2 rounded-3xl font-semibold bg-[#261e89] hover:bg-blue-950 text-white'>+ Add Link</button>
          </div>

          <div className="item">
            <h2 className='font-medium text-xl'>Step 3 : Add Picture and Discription</h2>
            <div className='mx-4 flex flex-col'>
            <input value={pic} onChange={(e) => {setPic(e.target.value)}} className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400' type="text" placeholder='Enter link of your Picture' />
            <input value={desc} onChange={(e) => {setDesc(e.target.value)}} className='px-4 py-3 m-2 focus:outline-blue-600 rounded-full font-medium placeholder:text-gray-400' type="text" placeholder='Enter description' />
            <button disabled={pic == "" || handle == "" || links[0].linktext == "" || desc == ""} onClick={() => {submitLinks()}} className='mx-2 px-5 py-2 w-fit rounded-3xl font-semibold disabled:bg-[#636091] bg-[#261e89] hover:bg-blue-950 text-white'>Create Bittree</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen bg-[#225ac0]">
        <img className='h-full ' src="/generate.png" alt="Generate your links" />
      <ToastContainer />
      </div>
    </div>
  )
}

export default Generate
