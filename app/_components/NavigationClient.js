"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavigationClient({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const { image } = session?.user?.image ?? {};

  return (
    <>
      <nav className="z-10 max-w-8xl px-0 sm:px-2 md:px-8 flex h-16 items-center justify-between">
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-16 text-xl">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  className="h-8 rounded-full"
                  referrerPolicy="no-referrer"
                  width={32}
                  height={32}
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-gray-500 hover:text-accent-400 active:bg-primary-300 rounded transform transition-transform duration-300 touch-manipulation md:touch-none"
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu (overlay + sliding panel) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`fixed inset-y-0 left-0 backdrop-blur-2xl w-64 p-6 shadow-xl transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Menu</div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-accent-400 p-2"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="space-y-4 text-lg">
            <li>
              <Link
                href="/cabins"
                className="block active:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Cabins
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block active:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="block active:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Guest area
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
    </>
  );
}
