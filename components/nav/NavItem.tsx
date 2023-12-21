"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config";

type Category = (typeof PRODUCT_CATEGORIES)[number];

type Props = {
  category: Category;
  isOpen: boolean;
  isAnyOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const NavItem = ({ category, isOpen, isAnyOpen, onOpen, onClose }: Props) => {
  return (
    <>
      <div className="relative">
        <Button variant={isOpen ? "secondary" : "ghost"} onClick={onOpen}>
          {category.label}

          <ChevronDown
            className={cn(
              "h-4 w-4 ml-1.5 text-muted-foreground transition-all",
              {
                "-rotate-180": isOpen,
              }
            )}
          />
        </Button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            !isAnyOpen && "animate-in fade-in-10 slide-in-from-top-5"
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />

          <div className="relative bg-white">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((feature) => (
                    <div
                      key={feature.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative bg-gray-100 aspect-video mb-6 rounded-lg overflow-hidden group-hover:opacity-75">
                        <Image
                          className="object-cover object-center"
                          src={feature.imageSrc}
                          fill
                          alt=""
                        />
                      </div>

                      <Link
                        href={feature.href}
                        className="text-gray-900 font-medium"
                      >
                        {feature.name}
                      </Link>

                      <p className="mt-1" aria-hidden="true">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItem;
