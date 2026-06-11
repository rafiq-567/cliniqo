import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className="flex justify-between items-center">
    <div className="relative w-24 h-16">
      <Image
        src="/cliniqo-logo.png"
            alt="Cliniqo Logo"
            fill
            className="object-contain"
            priority
         />
    </div>

    <div className="flex space-x-4">
      <Link href="/">
        <h1>Home</h1>
      </Link>
      <Link href="/shop">
        <h1>Shop</h1>
        
      </Link>
      <Link href="/about">
        <h1>About Us</h1>
      </Link>
    </div>

    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Join Us
      </button>
    </div>


    </div>
  )
}
