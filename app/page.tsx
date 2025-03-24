// import { prisma } from "@/prisma/prsima";
import { trpcClient } from "@/trpc/trpc-client";

export default async function Page() {
  // const users = await prisma.user.findMany();
  const users = await trpcClient.userList.query()
  const result = await trpcClient.hello.query()

  return (
    <div>
      <h1>PC Page</h1>
      <p>{result.msg}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
