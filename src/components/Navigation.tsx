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
            className={`${onClick ? 'block py-2' : ''} transition-colors hover:text-eclipse-yellow-light`}
            onClick={onClick}
          >
            {page.title}
          </Link>
        </li>
      ));

  return (
    <nav className="container mx-auto px-4">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex text-xl font-bold text-eclipse-yellow-light">
          {logo ? (
            <Image src={logo} alt={siteTitle} width={100} height={48} className="m-2" />
          ) : (
            <span className="text-xl font-bold text-eclipse-yellow-light">{siteTitle}</span>
          )}
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="mb-1.5 h-0.5 w-6 bg-white"></div>
          <div className="mb-1.5 h-0.5 w-6 bg-white"></div>
          <div className="h-0.5 w-6 bg-white"></div>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-8 md:flex">{renderNavLinks()}</ul>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden transition-all duration-300 ease-in-out md:hidden`}
      >
        <ul className="space-y-2 py-2">{renderNavLinks(() => setIsMenuOpen(false))}</ul>
      </div>
    </nav>
  );
}
