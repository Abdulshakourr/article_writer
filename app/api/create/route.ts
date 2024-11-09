import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const formdata = await req.json()
        const session = await auth.api.getSession({
            headers: headers()
        })
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = session.user
        console.log("[Session]", session)

        const article = await db.article.create({
            data: {
                title: formdata.title,
                userId: user.id
            }
        })



        console.log("[Data]", formdata)

        return NextResponse.json({ message: "Article created successfully", article });
    } catch (error) {
        console.log("[Error]", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }



}