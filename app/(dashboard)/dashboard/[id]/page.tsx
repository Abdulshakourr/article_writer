import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Editor from '../../_components/editor'

export default async function Markdown({ params }: { params: { id: string } }) {
    console.log("[Params]", params)

    const session = await auth.api.getSession({
        headers: headers()
    })

    if (!session || !session.user) {
        return redirect("/sign-in")
    }

    const articles = await db.article.findUnique({
        where: {
            id: params.id,
            userId: session.user.id
        }

    })
    console.log("[Articles]", articles)
    const mrk = articles?.content || ``
    return (
        <div className='mt-4'>
            {articles && <Editor article={articles} />}
        </div>
    )
}
