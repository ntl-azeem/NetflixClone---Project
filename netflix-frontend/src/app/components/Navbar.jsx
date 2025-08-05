'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link href="/" className="navbar-brand">Netflix Clone</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <Link href="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link href="/signup" className="nav-link">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link href="/forgot-password" className="nav-link">Forgot Password</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link href="/favorites" className="nav-link">Favorites</Link>
              </li>
              <li className="nav-item">
                <Link href="/watch-later" className="nav-link">Watch Later</Link>
              </li>
              <li className="nav-item">
                <Link href="/profile" className="nav-link">Profile</Link> {/* ✅ New */}
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
