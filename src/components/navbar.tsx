/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Disclosure } from "@headlessui/react"
import Container from "@/components/container"

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const menuItems = [
    { label: "Página Inicial", href: "/" },
    { label: "Mapa", href: "/mapa" },
    { label: "Estilos Arquitetônicos", href: "/estilos-arquitetonicos" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" }
  ];

  return (
    <div className={`w-full bg-white dark:bg-gray-800 sticky top-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white/80 backdrop-blur-md' : ''}`}>
      <div className="border-b border-black">
        <Container>
          <Disclosure>
            {({ open }) => (
              <>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo */}
                  <Link href="/" className="text-2xl font-[Abril_FatFace] tracking-wider hover:underline hover:underline-offset-8">
                    Prédios de Salvador
                  </Link>

                  {/* Desktop Navigation Links */}
                  <div className="hidden md:flex items-center space-x-6">
                    {menuItems.map((item, index) => (
                      <Link
                        key={`${item.label}${index}`}
                        href={item.href}
                        className={`text-gray-700 hover:text-gray-900 hover:underline hover:underline-offset-8 hover:from-neutral-900
                          ${pathname === item.href ? 'underline underline-offset-8' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Menu Button */}
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-black focus:outline-none md:hidden">
                    <svg
                      className="h-8 w-8 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    </svg>
                  </Disclosure.Button>
                </div>

                {/* Mobile Menu */}
                <Disclosure.Panel>
                  <div className="py-4 space-y-2">
                    {menuItems.map((item, index) => (
                      <Link
                        key={`mobile-${item.label}${index}`}
                        href={item.href}
                        className={`block px-4 py-2 text-gray-700 hover:underline hover:underline-offset-8 rounded-md
                          ${pathname === item.href ? 'underline underline-offset-8' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </Container>
      </div>
    </div>
  );
}