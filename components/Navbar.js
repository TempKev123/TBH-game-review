// File: components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold cursor-pointer">TBH Game Reviews</span>
        </Link>
        <div className="space-x-4">
          <Link href="/games" className="hover:underline">
            Games
          </Link>
          <Link href="/publishers" className="hover:underline">
            Publishers
          </Link>
          <Link href="/developers" className="hover:underline">
            Developers
          </Link>
        </div>
      </div>
    </nav>
  );
}
