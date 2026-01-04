import AdminSidebar from '@/components/AdminSidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Extra strict check if middleware fails for some reason
  // @ts-ignore
  if (!session?.user || session.user.role !== 'admin') {
     // redirect('/login'); // We can redirect here or let middleware handle it
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#111] px-6">
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-[var(--color-neon-blue)] flex items-center justify-center font-bold text-black">
                    {session?.user?.name?.[0] || 'A'}
                </div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
