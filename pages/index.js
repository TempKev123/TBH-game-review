import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Welcome to TBH Game Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/games" className="bg-blue-500 text-white p-4 rounded-md text-center">
          View Games
        </Link>
        <Link href="/publishers" className="bg-green-500 text-white p-4 rounded-md text-center">
          View Publishers
        </Link>
        <Link href="/developers" className="bg-purple-500 text-white p-4 rounded-md text-center">
          View Developers
        </Link>
      </div>
    </div>
  );
}
