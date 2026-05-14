import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: { select: { articles: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const roleLabels: Record<string, { label: string; style: string }> = {
    admin: { label: "Admin", style: "bg-red-50 text-red-700" },
    editor: { label: "Éditeur", style: "bg-blue-50 text-blue-700" },
    author: { label: "Auteur", style: "bg-green-50 text-green-700" },
    reader: { label: "Lecteur", style: "bg-gray-50 text-gray-600" },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
        <p className="text-gray-500 text-sm mt-1">
          {users.length} utilisateur{users.length !== 1 ? "s" : ""} enregistré{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Utilisateur</th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Rôle</th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Articles</th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Inscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => {
                const role = roleLabels[user.role] || roleLabels.reader;
                return (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm text-gray-900">{user.name}</div>
                      <div className="text-[0.75rem] text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[0.72rem] font-medium px-2.5 py-1 rounded-full ${role.style}`}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user._count.articles}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
