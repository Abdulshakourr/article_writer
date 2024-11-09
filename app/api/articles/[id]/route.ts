import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth.api.getSession({
            headers: headers()
        });
        
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { content } = await req.json();

        const article = await db.article.update({
            where: {
                id: params.id,
                userId: session.user.id, // Ensure user can only update their own articles
            },
            data: {
                content
            }
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error("[ARTICLE_UPDATE]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 