"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export async function getArticles() {
    const session = await auth.api.getSession({
        headers: headers()
    })

    if (!session?.user?.id) {
        return redirect("/sign-in")
    }

    const articles = await db.article.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    console.log("[Articles_servers]", articles)

    return articles
}