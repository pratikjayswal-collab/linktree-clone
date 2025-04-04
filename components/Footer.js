"use client"
import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()
    const showFoot = ["/", "/generate"].includes(pathname)
    return (
        <>
            {showFoot && (<div className='bg-[#201359] text-[#e9c0e9] text-sm md:text-xl px-[8vw] md:px-[20vw] pb-6 pt-4'>

                We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging. Linktree Pty Ltd (ABN 68 608 721 562), 1-9 Sackville st, Collingwood VIC 3066
            </div>
            )}
        </>
    )
}

export default Footer
