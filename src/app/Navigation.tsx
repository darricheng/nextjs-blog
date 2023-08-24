"use client";

import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export default function Navigation() {
  return (
    <Navbar className="mb-8">
      <NavbarContent>
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/blog">Blog</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/blog/add">Add</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
