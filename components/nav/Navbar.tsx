import React from "react";
import Link from "next/link";
import { Icons } from "../Icons";
import NavItems from "./NavItems";
import Container from "../Container";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  const user = null;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-white h-16 border-b border-gray-200">
      <nav className="relative bg-white h-full flex items-center">
        <Container>
          <div className="flex items-center">
            {/* Mobile Nav */}

            <div className="ml-4 lg:ml-0">
              <Link href="/">
                <Icons.logo className="h-10 w-10" />
              </Link>
            </div>

            <div className="hidden lg:block lg:ml-8 lg:self-stretch z-50">
              <NavItems />
            </div>

            <div className="ml-auto">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-6">
                {!user && (
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Sign in
                  </Link>
                )}

                {!user && (
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                )}

                {user ? (
                  <div>User Account</div>
                ) : (
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Create account
                  </Link>
                )}

                {user && (
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                )}

                {!user && (
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                )}

                <div className="ml-4 lg:ml-6 flow-root">Cart</div>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
