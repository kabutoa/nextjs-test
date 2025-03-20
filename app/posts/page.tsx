import { prisma } from "@/prisma/prsima";

export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return (
    <div>
      <h1>Post Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm text-gray-600 ml-2">
              by {post.author?.name}
            </span>
            <span className="text-sm text-gray-600 ml-2">
              {post.createdAt.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
