"use client";

import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { PRODUCT_CATEGORIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const navRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="h-full flex items-center gap-4" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <NavItem
          key={category.value}
          category={category}
          isOpen={activeIndex === index}
          isAnyOpen={activeIndex !== null}
          onOpen={() => {
            if (activeIndex === index) {
              setActiveIndex(null);
            } else {
              setActiveIndex(index);
            }
          }}
          onClose={() => {
            setActiveIndex(null);
          }}
        />
      ))}
    </div>
  );
};

export default NavItems;
