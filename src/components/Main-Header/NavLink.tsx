"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import classes from "./NavLink.module.css";
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};
export default function NavLink({ href, children }: NavLinkProps) {
  const ActivePath = usePathname();
  // usePathname is a hook that returns the current pathname of the URL for example if the URL is https://example.com/food then the usePathname will return /food
  return (
    <Link
      href={href}
      className={ActivePath.startsWith(href) ? classes.active : undefined}
    >
      {children}
    </Link>
  );
}
