import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Editor from "../../_components/editor";
import { notFound } from "next/navigation";

// Revalidate the page every 60 seconds
export const revalidate = 60;

interface ArticleData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

async function getArticle(id: string): Promise<ArticleData | null> {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session || !session.user) {
      redirect("/");
    }

    const article = await db.article.findUnique({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!article) {
      return null;
    }

    return {
      id: article.id,
      title: article.title,
      content: article.content || "",
      createdAt: article.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Editor article={article} />
    </>
  )
}
