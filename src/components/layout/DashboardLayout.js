import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg-subtle">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}