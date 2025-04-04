"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link'
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  const showNav = ["/", "/generate"].includes(pathname)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <>
      {showNav && (
        <nav className="bg-white w-[95vw] md:w-[88vw] flex justify-between fixed top-10 md:top-14 right-[2.5vw] md:right-[7vw] rounded-full p-2 md:p-3 px-4 md:px-7">
          <div className="logo flex gap-4 md:gap-14 items-center">
            <Link href={"/"}>
              <div className="w-20 md:w-24 font-semibold flex text-2xl md:text-4xl">
                BitTree
                <img className="rounded-full size-8 md:size-10 pt-1" src="/tree.svg" alt="" />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex ml-16 flex-row lg:gap-4 text-gray-500 text-lg font-semibold">
            <Link href={"/"}><li className="p-4 rounded-xl hover:bg-slate-200">Templates</li></Link>
            <Link href={"/"}><li className="p-4 rounded-xl hover:bg-slate-200">Marketplace</li></Link>
            <Link href={"/"}><li className="p-4 rounded-xl hover:bg-slate-200">Discover</li></Link>
            <Link href={"/"}><li className="p-4 rounded-xl hover:bg-slate-200">Pricing</li></Link>
            <Link href={"/"}><li className="p-4 rounded-xl hover:bg-slate-200">Learn</li></Link>
          </ul>



          <div className="ml-auto md:flex gap-2">
            {/* <button className="login bg-gray-200 hover:bg-gray-300 px-3 md:p-7 py-2 md:py-5 text-xs md:text-base font-bold rounded-lg">Log in</button>
            <button className="signup bg-gray-900 text-white px-3 md:p-8 py-2 md:py-5 text-xs md:text-xl rounded-full">Sign up free</button> */}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="block md:hidden ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      )}

      {/* Mobile menu (outside the main nav) */}
      {showNav && mobileMenuOpen && (
        <div className="fixed top-16 right-[2.5vw] w-[95vw] bg-white rounded-xl shadow-lg z-50 md:hidden">
          <ul className="flex flex-col text-gray-500 text-lg font-semibold">
            <Link href={"/"}><li className="p-4 hover:bg-slate-200 border-b">Templates</li></Link>
            <Link href={"/"}><li className="p-4 hover:bg-slate-200 border-b">Marketplace</li></Link>
            <Link href={"/"}><li className="p-4 hover:bg-slate-200 border-b">Discover</li></Link>
            <Link href={"/"}><li className="p-4 hover:bg-slate-200 border-b">Pricing</li></Link>
            <Link href={"/"}><li className="p-4 hover:bg-slate-200">Learn</li></Link>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
