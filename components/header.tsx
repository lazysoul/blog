import Link from "next/link";
import Container from "../components/container";

export default function Header() {
  return (
    <header className="py-6">
      <Container>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                <Link href="/" className="hover:text-blue-600">
                  lazysoul
                  <span className="text-gray-500 text-lg ml-2">게으른영혼</span>
                </Link>
              </div>
              <p className="text-gray-600 text-sm mt-1 italic">
                Laziness is not just sloth, means to gain wisdom and insight in life.
              </p>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/posts" className="hover:text-blue-600 transition-colors">Posts</Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
