import Link from "next/link";
import React from "react";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import classes from "./MainHeader.module.css";
// import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
export default function MainHeader() {
  // const ActivePath = usePathname();
  // usePathname is a hook that returns the current pathname of the URL for example if the URL is https://example.com/food then the usePathname will return /food
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            {/* <Link
              href="/meals"
              className={
                ActivePath.startsWith("/meals") ? classes.active : undefined
              }
            >
              Browse Meals
            </Link> */}
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            {/* <Link
              href="/community"
              className={
                ActivePath === "/community" ? classes.active : undefined
              }
            >
              Foodies Community
            </Link> */}
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
