"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import Container from "./Container";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const pathsToMinimize = ["/verify-email", "/sign-up", "/sign-in"];

  return (
    <footer className="bg-white flex-grow-0 border-t border-gray-200">
      <Container>
        <>
          {!pathsToMinimize.includes(pathname) && (
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto" />
              </div>
            </div>
          )}

          {!pathsToMinimize.includes(pathname) && (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-zinc-50 bg-gradient-to-br bg-opacity-90 overflow-hidden rounded-lg"
                />

                <div className="relative mx-auto max-w-sm text-center">
                  <h3 className="font-semibold text-gray-900">
                    Become a seller
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    If you&apos;d like to sell high-quality digital products,
                    you can do so in minutes.{" "}
                    <Link
                      href="/sign-in?as=seller"
                      className="whitespace-nowrap font-medium text-black hover:text-zinc-900"
                    >
                      Get started &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>

        <div className="md:flex md:items-center md:justify-between py-10">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>

          <div className="flex items-center justify-center mt-4 md:mt-0">
            <div className="flex items-center space-x-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms
              </Link>

              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
