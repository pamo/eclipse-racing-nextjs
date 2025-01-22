"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  siteTitle: string;
  logo?: string;
}

export function Navigation({ siteTitle, logo }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-bold text-eclipse-yellow-light flex"
        >
          {logo && (
            <Image
              src={logo}
              alt={siteTitle}
              width={40}
              height={40}
              className="mr-2"
            />
          )}
          <span className="text-xl font-bold text-eclipse-yellow-light">
            {siteTitle}
          </span>
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              href="/about"
              className="hover:text-eclipse-yellow-light transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/team"
              className="hover:text-eclipse-yellow-light transition-colors"
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              href="/sponsors"
              className="hover:text-eclipse-yellow-light transition-colors"
            >
              Sponsors
            </Link>
          </li>
          <li>
            <Link
              href="/join"
              className="hover:text-eclipse-yellow-light transition-colors"
            >
              Join
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-eclipse-yellow-light transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? "max-h-64" : "max-h-0"
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <ul className="py-2 space-y-2">
          <li>
            <Link
              href="/about"
              className="block py-2 hover:text-eclipse-yellow-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/team"
              className="block py-2 hover:text-eclipse-yellow-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              href="/sponsors"
              className="block py-2 hover:text-eclipse-yellow-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sponsors
            </Link>
          </li>
          <li>
            <Link
              href="/join"
              className="block py-2 hover:text-eclipse-yellow-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Join
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 hover:text-eclipse-yellow-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
