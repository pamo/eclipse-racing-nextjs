'use client';
import { Page } from '@/types/page';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NavigationProps {
  siteTitle: string;
  pages: Page[];
  logo?: string;
}

export function Navigation({ siteTitle, logo, pages }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderNavLinks = (onClick?: () => void) =>
    pages
      .filter((page) => page.slug !== 'not-found')
      .map((page) => (
        <li key={page.slug}>
          <Link
            href={`/${page.slug}`}
            className={`${onClick ? 'block py-2' : ''} hover:text-eclipse-yellow-light transition-colors`}
            onClick={onClick}
          >
            {page.title}
          </Link>
        </li>
      ));

  return (
    <nav className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-eclipse-yellow-light flex">
          {logo ? <Image src={logo} alt={siteTitle} width={100} height={48} className="m-2" /> :  <span className="text-xl font-bold text-eclipse-yellow-light">{siteTitle}</span>}
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
        <ul className="hidden md:flex space-x-8">{renderNavLinks()}</ul>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? 'max-h-64' : 'max-h-0'
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <ul className="py-2 space-y-2">{renderNavLinks(() => setIsMenuOpen(false))}</ul>
      </div>
    </nav>
  );
}
