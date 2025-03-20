import { prisma } from "@/prisma/prsima";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });
  if (!post) {
    notFound();
  }
  return (
    <div>
      <h1>Post Detail</h1>
      <h1>{post.title}</h1>
      <p>by {post.author?.name}</p>
      <div>{post.content || "No content available."}</div>
    </div>
  );
}
