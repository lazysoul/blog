import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen bg-white p-6 pt-18">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              All
            </Link>
          </li>
          <li>
            <Link href="/posts?categories=tools" className="text-gray-700 hover:text-gray-900">
              Tools
            </Link>
          </li>
          <li>
            <Link href="/posts?categories=flutter" className="text-gray-700 hover:text-gray-900">
              Flutter
            </Link>
          </li>
          {/* 추가 메뉴 항목들 */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
