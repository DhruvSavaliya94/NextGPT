"use client";
import { useState, useRef, useCallback } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Popover from "./popover"; 

export default function Navbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { user } = useUser();

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible(!isDropdownVisible);
  },[])

  const closeDropdown = useCallback(() => {
    setIsDropdownVisible(false);
  },[])

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={20}
            height={20}
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            NextGPT
          </span>
        </Link>
        <div className="relative flex items-center space-x-3 md:order-2">
          {user ? (
            <>
              <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
                aria-expanded={isDropdownVisible ? "true" : "false"}
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={user.hasImage ? user.imageUrl : "/user-avatar.png"}
                  alt="user photo"
                  width={32}
                  height={32}
                />
              </button>
              {isDropdownVisible && (
                <Popover
                  buttonRef={buttonRef}
                  isVisible={isDropdownVisible}
                  setIsVisible={closeDropdown}
                >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user.fullName}
                      </span>
                      <span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
                        {user.externalAccounts[0]?.emailAddress}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <SignOutButton>Sign out</SignOutButton>
                        </a>
                      </li>
                    </ul>
                </Popover>
              )}
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </nav>
  );
}
