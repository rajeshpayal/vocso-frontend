"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/">Auth0 Email App</Link>
        </div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          {user && <Link href="/profile">Profile</Link>}
          {!user ? (
            <Link href="/api/auth/login">Login</Link>
          ) : (
            <Link href="/api/auth/logout">Logout</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
