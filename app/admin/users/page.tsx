import dbConnect from '@/lib/db';
import User from '@/models/User';
import { toggleUserRole } from '@/app/lib/actions';
import { Users, Shield, ShieldOff } from 'lucide-react';
import Button from '@/components/Button';

export const dynamic = 'force-dynamic';

async function getUsers() {
  await dbConnect();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(users));
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Users ({users.length})</h1>
      </div>

       <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
         <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-400">
                 <thead className="bg-[#0a0a0a] text-xs uppercase text-gray-400">
                     <tr>
                         <th className="px-6 py-4">Name</th>
                         <th className="px-6 py-4">Email</th>
                         <th className="px-6 py-4">Role</th>
                         <th className="px-6 py-4">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-white/10">
                     {users.map((user: any) => (
                         <tr key={user._id} className="hover:bg-white/5">
                             <td className="px-6 py-4 font-medium text-white flex items-center">
                                 <div className="h-8 w-8 rounded-full bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)] flex items-center justify-center font-bold mr-3">
                                     {user.name?.[0]?.toUpperCase()}
                                 </div>
                                 {user.name}
                             </td>
                             <td className="px-6 py-4">{user.email}</td>
                             <td className="px-6 py-4">
                                 <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                     user.role === 'admin' 
                                     ? 'bg-purple-400/10 text-purple-400 ring-purple-400/20' 
                                     : 'bg-gray-400/10 text-gray-400 ring-gray-400/20'
                                 }`}>
                                     {user.role}
                                 </span>
                             </td>
                             <td className="px-6 py-4">
                                 <form action={async () => {
                                     'use server';
                                     await toggleUserRole(user._id, user.role);
                                 }}>
                                     {user.role === 'admin' ? (
                                         <button type="submit" className="text-gray-500 hover:text-white flex items-center text-xs">
                                             <ShieldOff className="h-4 w-4 mr-1" /> Remove Admin
                                         </button>
                                     ) : (
                                          <button type="submit" className="text-[var(--color-neon-blue)] hover:text-[#00d0db] flex items-center text-xs">
                                             <Shield className="h-4 w-4 mr-1" /> Make Admin
                                          </button>
                                     )}
                                 </form>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
       </div>
    </div>
  );
}
