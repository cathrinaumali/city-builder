"use client"

import Image from "next/image";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="row-start-1 w-full flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Image
            src="/file.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="font-semibold">City Builder</span>
        </div>
        <button
          className="sm:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex absolute sm:relative top-[60px] left-0 right-0 sm:top-auto bg-white sm:bg-transparent border-b sm:border-0 flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-0`}>
          <a href="/" className="hover:text-gray-600">Home</a>
          <a href="/buildings" className="hover:text-gray-600">Buildings</a>
          <a href="/resources" className="hover:text-gray-600">Resources</a>
        </nav>
      </header>   
    )
}