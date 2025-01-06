import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: '200px', backgroundColor: '#f4f4f4', height: '100vh' }}>
      <nav>
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/signin">Sign In</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
