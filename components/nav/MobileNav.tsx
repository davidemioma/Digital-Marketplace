"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/payload-types";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/config";

type Props = {
  user: User | null;
};

const MobileNav = ({ user }: Props) => {
  const { signOut } = useAuth();

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  //Close model if user clicks on link
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  //Whenever pathname changes the sidebar modal closes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Remove scrollbar on the main page when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        type="button"
        className="lg:hidden inline-flex items-center justify-center p-2 text-gray-400 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );
  }

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 z-40 bg-black/25"
        onClick={() => setIsOpen(false)}
      />

      <div className="lg:hidden fixed inset-0 z-50 w-4/5 bg-white overflow-y-scroll pb-12 shadow-xl">
        <div className="w-full flex flex-col overflow-y-auto">
          <div className="px-4 pb-2 pt-5">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                <div className="border-b border-gray-200">
                  <p className="text-gray-900 whitespace-nowrap py-4 text-base font-medium">
                    {category.label}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-sm">
                      <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-lg group-hover:opacity-75">
                        <Image
                          fill
                          src={item.imageSrc}
                          alt="product category image"
                          className="object-cover object-center"
                        />
                      </div>

                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {user ? (
            <>
              <div className="space-y-6 px-4 py-6 border-t border-gray-200">
                <div className="flow-root">
                  <Link
                    href="/sell"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => closeOnCurrent("/sell")}
                  >
                    Seller Dashboard
                  </Link>
                </div>

                <button
                  className="-m-2 block p-2 font-medium text-gray-900"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6 px-4 py-6 border-t border-gray-200">
                <div className="flow-root">
                  <Link
                    href="/sign-in"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => closeOnCurrent("/sign-in")}
                  >
                    Sign in
                  </Link>
                </div>

                <div className="flow-root">
                  <Link
                    href="/sign-up"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => closeOnCurrent("/sign-up")}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
