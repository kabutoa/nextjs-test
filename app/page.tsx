import { prisma } from "@/prisma/prsima";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>PC Page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
