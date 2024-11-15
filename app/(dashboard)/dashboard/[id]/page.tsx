import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Editor from "../../_components/editor";

export default async function Markdown({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) {
    return redirect("/sign-in");
  }

  const article = await db.article.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  // Transform the database article to match ArticleProps
  const formattedArticle = article
    ? {
        id: article.id,
        title: article.title,
        content: article.content ?? "", // Handle null content
        createdAt: article.createdAt.toISOString(), // Convert Date to string
      }
    : null;

  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <Editor article={formattedArticle} />
      </Suspense>
    </div>
  );
}

