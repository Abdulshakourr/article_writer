import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function DELETE( { params }: { params: { id: string } }) {
    const { id } = params
    console.log("[Delete]", id)
    const session = await auth.api.getSession({
        headers: headers()
    })

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }


    await db.article.delete({
        where: { id, userId: session.user.id }
    })
    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 })
}

